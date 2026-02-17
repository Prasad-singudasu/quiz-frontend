import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../hooks/useDarkMode";

export default function TopicDetailsPage() {
  const navigate = useNavigate();
  const { darkMode, setDarkMode, theme } = useDarkMode();
  const topic = localStorage.getItem("learningTopic") || "Database Management";
  const [loading, setLoading] = useState(true);
  const [topicData, setTopicData] = useState(null);
  const [error, setError] = useState(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const toggleSpeech = () => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    } else {
      // Clean text: remove special characters, numbers, emojis
      const cleanText = topicData?.description
        .replace(/[0-9]+\./g, '') // Remove numbered lists
        .replace(/[*#_~`]/g, '') // Remove markdown symbols
        .replace(/[^a-zA-Z0-9\s,.!?-]/g, '') // Remove special chars/emojis
        .replace(/\s+/g, ' ') // Remove extra spaces
        .trim();
      
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 0.9;
      utterance.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setSpeaking(true);
    }
  };

  const saveNote = () => {
    const notes = JSON.parse(localStorage.getItem("savedNotes") || "[]");
    notes.push({ topic: topicData.topic, content: topicData.description, date: new Date().toISOString() });
    localStorage.setItem("savedNotes", JSON.stringify(notes));
    alert("✅ Note saved!");
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMsg = { role: "user", content: chatInput };
    setChatMessages([...chatMessages, userMsg]);
    setChatInput("");
    setChatLoading(true);
    
    try {
      const res = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: chatInput, topic: topicData?.topic || "" })
      });
      
      const data = await res.json();
      setChatMessages(prev => [...prev, { role: "ai", content: data.response }]);
    } catch (err) {
      setChatMessages(prev => [...prev, { role: "ai", content: "Sorry, I couldn't process that." }]);
    } finally {
      setChatLoading(false);
    }
  };

  useEffect(() => {
    // Call FastAPI backend
    const fetchTopicDetails = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout
        
        const response = await fetch('http://localhost:8000/api/generate-topic', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ topic: topic }),
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Failed to generate topic');
        }
        
        const data = await response.json();
        setTopicData(data);
        // Update localStorage with corrected topic
        localStorage.setItem('learningTopic', data.topic);
        localStorage.setItem('topicContext', data.description);
      } catch (err) {
        if (err.name === 'AbortError') {
          setError('Request timed out. Please try again.');
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTopicDetails();
  }, [topic]);

  return (
    <div style={{ minHeight: "100vh", background: theme.bg, fontFamily: "'Inter', sans-serif", transition: "background-color 0.3s" }}>
      {/* Navigation */}
      <nav style={{
        backgroundColor: theme.navBg,
        backdropFilter: "blur(10px)",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        padding: "16px 0",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "0 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button 
              onClick={() => navigate("/learning")}
            style={{
              background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
              padding: "10px 14px",
              borderRadius: "10px",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            onMouseOver={(e) => e.target.style.background = "linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)"}
            onMouseOut={(e) => e.target.style.background = "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)"}
          >
            ←
          </button>
          <div style={{ 
            fontSize: "18px", 
            fontWeight: "600",
            background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Topic Overview
          </div>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={toggleSpeech} style={{ background: speaking ? "#ef4444" : "#7c3aed", color: "white", border: "none", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "600" }}>
              {speaking ? "⏸️ Stop" : "🔊 Listen"}
            </button>
            <button onClick={saveNote} style={{ background: "#10b981", color: "white", border: "none", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "600" }}>
              💾 Save
            </button>
            <button onClick={() => setShowChat(!showChat)} style={{ background: showChat ? "#ef4444" : "#7c3aed", color: "white", border: "none", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "600" }}>
              {showChat ? "✕ Close" : "💬 Ask AI"}
            </button>
            <button onClick={() => setDarkMode(!darkMode)} style={{ background: darkMode ? "#2d2d3d" : "#f3f4f6", border: "none", borderRadius: "20px", padding: "8px 16px", cursor: "pointer", fontSize: "18px" }}>
              {darkMode ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "60px 30px 80px"
      }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{
              width: "60px",
              height: "60px",
              border: "4px solid #f0f0f0",
              borderTop: "4px solid #7c3aed",
              borderRadius: "50%",
              margin: "0 auto 24px",
              animation: "spin 1s linear infinite"
            }}></div>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              @keyframes fadeInUp {
                from {
                  opacity: 0;
                  transform: translateY(30px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
              }
              @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
              }
            `}</style>
            <p style={{ fontSize: "16px", color: "#64748b" }}>
              Generating topic overview...
            </p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: "50px", animation: "fadeInUp 0.6s ease-out" }}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                background: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)",
                border: "1.5px solid #e9d5ff",
                borderRadius: "25px",
                fontSize: "13px",
                fontWeight: "600",
                color: "#7c3aed",
                marginBottom: "20px",
                boxShadow: "0 2px 8px rgba(124, 58, 237, 0.1)",
                animation: "pulse 2s ease-in-out infinite"
              }}>
                <span style={{ fontSize: "16px", animation: "float 3s ease-in-out infinite" }}>✨</span>
                AI Generated Overview
              </div>
              <h1 style={{
                fontSize: "48px",
                fontWeight: "800",
                background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "12px",
                letterSpacing: "-1.5px",
                lineHeight: "1.2"
              }}>
                {topicData?.topic || topic}
              </h1>
              <div style={{
                height: "4px",
                width: "80px",
                background: "linear-gradient(90deg, #7c3aed 0%, #a855f7 100%)",
                borderRadius: "2px"
              }}></div>
            </div>

            {/* Description Card */}
            <div style={{
              backgroundColor: theme.cardBg,
              padding: "40px",
              borderRadius: "20px",
              border: `1px solid ${theme.border}`,
              marginBottom: "28px",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
              position: "relative",
              overflow: "hidden",
              animation: "fadeInUp 0.6s ease-out 0.2s backwards",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(0, 0, 0, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.06)";
            }}>
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "4px",
                background: "linear-gradient(90deg, #7c3aed 0%, #a855f7 50%, #7c3aed 100%)"
              }}></div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px"
                }}>
                  📖
                </div>
                <h2 style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  color: theme.text,
                  margin: 0
                }}>
                  Overview
                </h2>
              </div>
              <div style={{
                fontSize: "16px",
                lineHeight: "1.9"
              }}>
                {error ? (
                  <p style={{ color: "#ef4444" }}>Error: {error}</p>
                ) : (
                  topicData?.description?.split('\n').map((paragraph, i) => {
                    const trimmed = paragraph.trim();
                    if (!trimmed) return <div key={i} style={{ height: "12px" }}></div>;
                    
                    // **Bold headings** (e.g., "**Introduction**")
                    if (/^\*\*[^*]+\*\*$/.test(trimmed)) {
                      return (
                        <h2 key={i} style={{
                          fontSize: "20px",
                          fontWeight: "800",
                          color: "#1e293b",
                          marginTop: i > 0 ? "32px" : "0",
                          marginBottom: "14px",
                          letterSpacing: "-0.4px"
                        }}>
                          {trimmed.replace(/\*\*/g, '')}
                        </h2>
                      );
                    }
                    
                    // Numbered list items (e.g., "1. Database Schema:")
                    const numberedMatch = trimmed.match(/^(\d+\.\s+)\*\*([^*]+)\*\*:?(.*)$/);
                    if (numberedMatch) {
                      return (
                        <div key={i} style={{ marginBottom: "16px" }}>
                          <h3 style={{
                            fontSize: "17px",
                            fontWeight: "700",
                            color: "#1e293b",
                            marginBottom: "6px"
                          }}>
                            {numberedMatch[1]}{numberedMatch[2]}
                          </h3>
                          {numberedMatch[3] && (
                            <p style={{ color: "#64748b", fontSize: "15px", lineHeight: "1.8", marginLeft: "20px" }}>
                              {numberedMatch[3].trim()}
                            </p>
                          )}
                        </div>
                      );
                    }
                    
                    // Code blocks (```sql or contains SQL keywords)
                    if (trimmed.startsWith('```') || /SELECT|INSERT|UPDATE|DELETE|CREATE|FROM|WHERE/i.test(trimmed)) {
                      return (
                        <pre key={i} style={{
                          background: "#f8fafc",
                          border: "1px solid #e2e8f0",
                          borderRadius: "8px",
                          padding: "14px",
                          color: "#334155",
                          fontSize: "13px",
                          fontFamily: "'Courier New', monospace",
                          overflowX: "auto",
                          marginBottom: "14px",
                          lineHeight: "1.6"
                        }}>
                          {trimmed.replace(/```sql|```/g, '')}
                        </pre>
                      );
                    }
                    
                    // Bullet points (• or -)
                    if (/^[•\-]/.test(trimmed)) {
                      return (
                        <div key={i} style={{
                          display: "flex",
                          gap: "10px",
                          marginBottom: "8px",
                          paddingLeft: "4px"
                        }}>
                          <span style={{ color: "#7c3aed", fontWeight: "700" }}>•</span>
                          <span style={{ color: "#64748b", fontSize: "15px", lineHeight: "1.7", flex: 1 }}>
                            {trimmed.replace(/^[•\-]\s*/, '')}
                          </span>
                        </div>
                      );
                    }
                    
                    // Regular paragraph
                    return (
                      <p key={i} style={{ 
                        marginBottom: "12px", 
                        color: "#64748b", 
                        fontSize: "15px", 
                        lineHeight: "1.8"
                      }}>
                        {trimmed}
                      </p>
                    );
                  })
                )}
              </div>
            </div>

            {/* Key Points Card */}
            <div style={{
              backgroundColor: "white",
              padding: "40px",
              borderRadius: "20px",
              border: "1px solid #f0f0f0",
              marginBottom: "28px",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
              position: "relative",
              overflow: "hidden",
              animation: "fadeInUp 0.6s ease-out 0.4s backwards",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(0, 0, 0, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.06)";
            }}>
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "4px",
                background: "linear-gradient(90deg, #10b981 0%, #34d399 50%, #10b981 100%)"
              }}></div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px"
                }}>
                  🎯
                </div>
                <h2 style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "#0f172a",
                  margin: 0
                }}>
                  What You'll Learn
                </h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {topicData?.key_points?.map((point, i) => {
                  const icons = ['💡', '🎓', '⚡', '🔥', '✨', '🚀', '💪', '🎯', '📚', '🌟'];
                  return (
                    <div 
                      key={i} 
                      style={{ 
                        display: "flex", 
                        alignItems: "flex-start", 
                        gap: "14px",
                        padding: "16px",
                        backgroundColor: hoveredPoint === i ? "#f0fdf4" : "#f9fafb",
                        borderRadius: "12px",
                        border: hoveredPoint === i ? "1px solid #86efac" : "1px solid #f0f0f0",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        transform: hoveredPoint === i ? "translateX(8px)" : "translateX(0)",
                        animation: `fadeInUp 0.4s ease-out ${0.6 + i * 0.1}s backwards`
                      }}
                      onMouseEnter={() => setHoveredPoint(i)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    >
                      <div style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        background: hoveredPoint === i 
                          ? "linear-gradient(135deg, #10b981 0%, #34d399 100%)" 
                          : "linear-gradient(135deg, #10b98120 0%, #34d39920 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                        flexShrink: 0,
                        boxShadow: hoveredPoint === i 
                          ? "0 4px 12px rgba(16, 185, 129, 0.4)" 
                          : "none",
                        transition: "all 0.3s ease",
                        transform: hoveredPoint === i ? "scale(1.1) rotate(5deg)" : "scale(1) rotate(0deg)"
                      }}>
                        {icons[i % icons.length]}
                      </div>
                      <span style={{ fontSize: "15px", color: "#475569", lineHeight: "1.6", paddingTop: "6px", flex: 1 }}>
                        {point}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Button */}
            <div style={{
              backgroundColor: "white",
              padding: "32px",
              borderRadius: "20px",
              border: "1px solid #f0f0f0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
              background: "linear-gradient(135deg, #ffffff 0%, #faf5ff 100%)",
              animation: "fadeInUp 0.6s ease-out 0.6s backwards"
            }}>
              <div>
                <div style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", marginBottom: "6px" }}>
                  Ready to test your knowledge? 🚀
                </div>
                <div style={{ fontSize: "14px", color: "#64748b" }}>
                  Take the quiz to assess your understanding
                </div>
              </div>
              <button
                onClick={() => navigate("/quiz")}
                aria-label="Start quiz"
                style={{
                  background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
                  color: "white",
                  border: "none",
                  padding: "16px 36px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  boxShadow: "0 8px 24px rgba(124, 58, 237, 0.35)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-3px)";
                  e.target.style.boxShadow = "0 12px 32px rgba(124, 58, 237, 0.45)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 8px 24px rgba(124, 58, 237, 0.35)";
                }}
              >
                Start Quiz →
              </button>
            </div>
          </>
        )}
      </div>

      {/* AI Chat Sidebar */}
      {showChat && (
        <div style={{
          position: "fixed",
          right: 0,
          top: 0,
          width: "400px",
          height: "100vh",
          background: "white",
          boxShadow: "-4px 0 12px rgba(0,0,0,0.1)",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column"
        }}>
          <div style={{ padding: "20px", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a" }}>💬 AI Tutor</div>
            <button onClick={() => setShowChat(false)} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#64748b" }}>×</button>
          </div>
          
          <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
            {chatMessages.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 20px", color: "#94a3b8" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>💬</div>
                <p>Ask me anything about {topicData?.topic || "this topic"}!</p>
              </div>
            ) : (
              chatMessages.map((msg, i) => (
                <div key={i} style={{ marginBottom: "16px", display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{
                    maxWidth: "80%",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    background: msg.role === "user" ? "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)" : "#f0f0f0",
                    color: msg.role === "user" ? "white" : "#0f172a",
                    fontSize: "14px",
                    lineHeight: "1.8",
                    whiteSpace: "pre-wrap"
                  }}>
                    {msg.content.split('\n').map((line, idx) => (
                      <div key={idx} style={{ marginBottom: line.trim() ? "8px" : "4px" }}>
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
            {chatLoading && (
              <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "16px" }}>
                <div style={{ padding: "12px 16px", borderRadius: "12px", background: "#f0f0f0", color: "#64748b" }}>Thinking...</div>
              </div>
            )}
          </div>
          
          <div style={{ padding: "20px", borderTop: "1px solid #f0f0f0" }}>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !chatLoading && sendChatMessage()}
                placeholder="Ask a question..."
                disabled={chatLoading}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "8px",
                  border: "2px solid #e5e7eb",
                  fontSize: "14px",
                  outline: "none"
                }}
              />
              <button
                onClick={sendChatMessage}
                disabled={chatLoading || !chatInput.trim()}
                style={{
                  padding: "12px 20px",
                  background: chatLoading || !chatInput.trim() ? "#e5e7eb" : "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
                  color: chatLoading || !chatInput.trim() ? "#9ca3af" : "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: chatLoading || !chatInput.trim() ? "not-allowed" : "pointer"
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../hooks/useDarkMode";

export default function ChatPage() {
  const navigate = useNavigate();
  const { darkMode, setDarkMode, theme } = useDarkMode();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const topic = localStorage.getItem("learningTopic") || "";

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg = { role: "user", content: input };
    setMessages([...messages, userMsg]);
    setInput("");
    setLoading(true);
    
    try {
      const res = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, topic })
      });
      
      const data = await res.json();
      setMessages(prev => [...prev, { role: "ai", content: data.response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "ai", content: "Sorry, I couldn't process that. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: theme.bg, fontFamily: "'Inter', sans-serif", transition: "background-color 0.3s" }}>
      <nav style={{ backgroundColor: theme.navBg, boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)", padding: "16px 0" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 30px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button onClick={() => navigate("/")} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", padding: "8px", color: theme.text }}>←</button>
            <div style={{ fontSize: "18px", fontWeight: "600", background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              💬 AI Tutor Chat
            </div>
          </div>
          <button onClick={() => setDarkMode(!darkMode)} style={{ background: darkMode ? "#2d2d3d" : "#f3f4f6", border: "none", borderRadius: "20px", padding: "8px 16px", cursor: "pointer", fontSize: "18px" }}>
            {darkMode ? "🌙" : "☀️"}
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px 30px" }}>
        <div style={{ backgroundColor: theme.cardBg, borderRadius: "20px", padding: "20px", height: "600px", display: "flex", flexDirection: "column", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)", border: `1px solid ${theme.border}` }}>
          <div style={{ flex: 1, overflowY: "auto", marginBottom: "20px", padding: "10px" }}>
            {messages.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "#94a3b8" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>💬</div>
                <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#64748b", marginBottom: "8px" }}>Ask me anything!</h3>
                <p>I'm here to help you understand {topic || "any topic"}</p>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div key={i} style={{ marginBottom: "16px", display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{
                    maxWidth: "70%",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    background: msg.role === "user" ? "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)" : "#f0f0f0",
                    color: msg.role === "user" ? "white" : "#0f172a",
                    fontSize: "15px",
                    lineHeight: "1.6"
                  }}>
                    {msg.content}
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "16px" }}>
                <div style={{ padding: "12px 16px", borderRadius: "12px", background: "#f0f0f0", color: "#64748b" }}>
                  Thinking...
                </div>
              </div>
            )}
          </div>
          
          <div style={{ display: "flex", gap: "12px" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !loading && sendMessage()}
              placeholder="Ask anything about the topic..."
              disabled={loading}
              style={{
                flex: 1,
                padding: "14px 16px",
                borderRadius: "12px",
                border: "2px solid #e5e7eb",
                fontSize: "15px",
                outline: "none",
                fontFamily: "'Inter', sans-serif"
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                padding: "14px 28px",
                background: loading || !input.trim() ? "#e5e7eb" : "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
                color: loading || !input.trim() ? "#9ca3af" : "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: loading || !input.trim() ? "not-allowed" : "pointer"
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

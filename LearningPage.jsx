import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LearningPage() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("intermediate");
  const [loading, setLoading] = useState(false);
  
  const availableTopics = [
    "Machine Learning",
    "Deep Learning",
    "NLP",
    "Data Science",
    "SQL",
    "Quantum Computing",
    "Computer Networking",
    "Operating System"
  ];

  const handleStart = () => {
    if (topic.trim()) {
      setLoading(true);
      localStorage.setItem("learningTopic", topic);
      localStorage.setItem("difficulty", difficulty);
      navigate("/topic-details");
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0f", fontFamily: "'Inter', sans-serif", position: "relative", overflow: "hidden" }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes bubble1 {
          0% { transform: translateY(100vh) scale(0); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-100vh) scale(1); opacity: 0; }
        }
        @keyframes bubble2 {
          0% { transform: translateY(100vh) translateX(0) scale(0); opacity: 0; }
          10% { opacity: 0.5; }
          50% { transform: translateY(0) translateX(50px) scale(1); }
          90% { opacity: 0.5; }
          100% { transform: translateY(-100vh) translateX(-50px) scale(1); opacity: 0; }
        }
        @keyframes bubble3 {
          0% { transform: translateY(100vh) translateX(0) scale(0); opacity: 0; }
          10% { opacity: 0.4; }
          50% { transform: translateY(0) translateX(-30px) scale(1); }
          90% { opacity: 0.4; }
          100% { transform: translateY(-100vh) translateX(30px) scale(1); opacity: 0; }
        }
        @keyframes glow {
          0%, 100% { filter: blur(40px) brightness(1); }
          50% { filter: blur(60px) brightness(1.3); }
        }
      `}</style>

      {/* Animated Bubbles Background */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden", zIndex: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute",
          bottom: "-100px",
          left: "10%",
          width: "80px",
          height: "80px",
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.6) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "bubble1 20s ease-in-out 0s infinite",
          filter: "blur(20px)"
        }}></div>
        <div style={{
          position: "absolute",
          bottom: "-100px",
          left: "25%",
          width: "60px",
          height: "60px",
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "bubble2 18s ease-in-out 2s infinite",
          filter: "blur(20px)"
        }}></div>
        <div style={{
          position: "absolute",
          bottom: "-100px",
          left: "40%",
          width: "70px",
          height: "70px",
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "bubble3 22s ease-in-out 1s infinite",
          filter: "blur(20px)"
        }}></div>
        <div style={{
          position: "absolute",
          bottom: "-100px",
          left: "55%",
          width: "50px",
          height: "50px",
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.5) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "bubble1 19s ease-in-out 3s infinite",
          filter: "blur(20px)"
        }}></div>
        <div style={{
          position: "absolute",
          bottom: "-100px",
          left: "70%",
          width: "65px",
          height: "65px",
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "bubble2 21s ease-in-out 4s infinite",
          filter: "blur(20px)"
        }}></div>
        <div style={{
          position: "absolute",
          bottom: "-100px",
          left: "85%",
          width: "55px",
          height: "55px",
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.5) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "bubble3 17s ease-in-out 2.5s infinite",
          filter: "blur(20px)"
        }}></div>
      </div>

      {/* Navigation */}
      <nav style={{
        backgroundColor: "rgba(15, 15, 20, 0.8)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 1px 3px rgba(124, 58, 237, 0.1)",
        padding: "16px 0",
        position: "relative",
        zIndex: 10
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 30px",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}>
          <button 
            onClick={() => navigate("/")}
            style={{
              background: "none",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
              padding: "8px",
              color: "white"
            }}
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
            AI Learning Agent
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{
        maxWidth: "700px",
        margin: "0 auto",
        padding: "80px 30px",
        animation: "fadeIn 0.6s ease-out",
        position: "relative",
        zIndex: 1
      }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <div style={{
            fontSize: "64px",
            marginBottom: "20px",
            animation: "float 3s ease-in-out infinite",
            background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "800"
          }}>
            ⚡
          </div>
          <h1 style={{
            fontSize: "42px",
            fontWeight: "800",
            color: "#ffffff",
            marginBottom: "16px",
            letterSpacing: "-1px"
          }}>
            What do you want to learn?
          </h1>
          <p style={{
            fontSize: "18px",
            color: "#cbd5e1",
            lineHeight: "1.6"
          }}>
            Enter any topic and we'll create a personalized quiz to test your knowledge
          </p>
        </div>

        <div style={{
          backgroundColor: "rgba(15, 15, 20, 0.6)",
          backdropFilter: "blur(20px)",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 10px 40px rgba(124, 58, 237, 0.2)",
          border: "1px solid rgba(124, 58, 237, 0.2)"
        }}>
          <label style={{
            display: "block",
            marginBottom: "12px",
            fontSize: "15px",
            fontWeight: "600",
            color: "#e5e7eb"
          }}>
            Select Learning Topic
          </label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "16px",
              border: "2px solid rgba(124, 58, 237, 0.3)",
              borderRadius: "12px",
              outline: "none",
              transition: "all 0.3s",
              fontFamily: "'Inter', sans-serif",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              color: "white",
              cursor: "pointer",
              marginBottom: "20px"
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#7c3aed";
              e.target.style.boxShadow = "0 0 0 4px rgba(124, 58, 237, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(124, 58, 237, 0.3)";
              e.target.style.boxShadow = "none";
            }}
          >
            <option value="" style={{ backgroundColor: "#1a1a24", color: "#94a3b8" }}>-- Choose a topic --</option>
            {availableTopics.map((topicOption) => (
              <option key={topicOption} value={topicOption} style={{ backgroundColor: "#1a1a24", color: "white" }}>
                {topicOption}
              </option>
            ))}
          </select>

          <label style={{
            display: "block",
            marginBottom: "12px",
            fontSize: "15px",
            fontWeight: "600",
            color: "#e5e7eb"
          }}>
            Select Difficulty Level
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "16px",
              border: "2px solid rgba(124, 58, 237, 0.3)",
              borderRadius: "12px",
              outline: "none",
              transition: "all 0.3s",
              fontFamily: "'Inter', sans-serif",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              color: "white",
              cursor: "pointer"
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#7c3aed";
              e.target.style.boxShadow = "0 0 0 4px rgba(124, 58, 237, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(124, 58, 237, 0.3)";
              e.target.style.boxShadow = "none";
            }}
          >
            <option value="beginner" style={{ backgroundColor: "#1a1a24", color: "white" }}>🟢 Beginner (5 questions)</option>
            <option value="intermediate" style={{ backgroundColor: "#1a1a24", color: "white" }}>🟡 Intermediate (7 questions)</option>
            <option value="advanced" style={{ backgroundColor: "#1a1a24", color: "white" }}>🔴 Advanced (10 questions)</option>
          </select>

          <button
            onClick={handleStart}
            disabled={!topic.trim() || loading}
            aria-label="Generate topic overview"
            style={{
              width: "100%",
              marginTop: "24px",
              background: (topic.trim() && !loading)
                ? "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)" 
                : "#e5e7eb",
              color: (topic.trim() && !loading) ? "white" : "#9ca3af",
              border: "none",
              padding: "16px",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: (topic.trim() && !loading) ? "pointer" : "not-allowed",
              transition: "all 0.3s",
              boxShadow: (topic.trim() && !loading) ? "0 8px 24px rgba(124, 58, 237, 0.3)" : "none"
            }}
            onMouseOver={(e) => {
              if (topic.trim() && !loading) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 12px 32px rgba(124, 58, 237, 0.4)";
              }
            }}
            onMouseOut={(e) => {
              if (topic.trim() && !loading) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 8px 24px rgba(124, 58, 237, 0.3)";
              }
            }}
          >
            {loading ? "Loading..." : "Generate Topic Overview →"}
          </button>
        </div>

        {/* Quick Select Buttons */}
        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <p style={{ fontSize: "14px", color: "#94a3b8", marginBottom: "16px" }}>
            Quick select:
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            {availableTopics.slice(0, 4).map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setTopic(suggestion)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "rgba(124, 58, 237, 0.1)",
                  border: "1px solid rgba(124, 58, 237, 0.3)",
                  borderRadius: "20px",
                  fontSize: "13px",
                  color: "#cbd5e1",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onMouseOver={(e) => {
                  e.target.style.borderColor = "#a855f7";
                  e.target.style.color = "white";
                  e.target.style.backgroundColor = "rgba(124, 58, 237, 0.3)";
                }}
                onMouseOut={(e) => {
                  e.target.style.borderColor = "rgba(124, 58, 237, 0.3)";
                  e.target.style.color = "#cbd5e1";
                  e.target.style.backgroundColor = "rgba(124, 58, 237, 0.1)";
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SmartRecommendations() {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const quizHistory = JSON.parse(localStorage.getItem("quizHistory") || "[]");
    const allTopics = ["Machine Learning", "Deep Learning", "NLP", "Data Science", "SQL", "Quantum Computing", "Computer Networking", "Operating System"];
    
    // Analyze performance
    const topicScores = {};
    quizHistory.forEach(quiz => {
      if (!topicScores[quiz.topic]) {
        topicScores[quiz.topic] = [];
      }
      topicScores[quiz.topic].push(quiz.score);
    });

    // Calculate recommendations
    const recs = [];

    // 1. Weak topics (score < 70%)
    Object.keys(topicScores).forEach(topic => {
      const avgScore = topicScores[topic].reduce((a, b) => a + b, 0) / topicScores[topic].length;
      if (avgScore < 70) {
        recs.push({
          topic,
          reason: "Needs improvement",
          priority: "high",
          icon: "⚠️",
          color: "#ef4444",
          avgScore: Math.round(avgScore)
        });
      }
    });

    // 2. Untried topics
    const triedTopics = Object.keys(topicScores);
    const untriedTopics = allTopics.filter(t => !triedTopics.includes(t));
    untriedTopics.slice(0, 2).forEach(topic => {
      recs.push({
        topic,
        reason: "New topic to explore",
        priority: "medium",
        icon: "🆕",
        color: "#3b82f6"
      });
    });

    // 3. Topics to master (score 70-85%)
    Object.keys(topicScores).forEach(topic => {
      const avgScore = topicScores[topic].reduce((a, b) => a + b, 0) / topicScores[topic].length;
      if (avgScore >= 70 && avgScore < 85) {
        recs.push({
          topic,
          reason: "Almost mastered",
          priority: "medium",
          icon: "📈",
          color: "#10b981",
          avgScore: Math.round(avgScore)
        });
      }
    });

    // 4. Progressive learning path
    if (topicScores["Machine Learning"] && !topicScores["Deep Learning"]) {
      recs.push({
        topic: "Deep Learning",
        reason: "Next in learning path",
        priority: "high",
        icon: "🎯",
        color: "#7c3aed"
      });
    }

    setRecommendations(recs.slice(0, 4));
  }, []);

  if (recommendations.length === 0) return null;

  return (
    <div style={{ marginTop: "30px" }}>
      <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "16px", color: "#0f172a" }}>
        🎯 Recommended for You
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
        {recommendations.map((rec, i) => (
          <div
            key={i}
            onClick={() => {
              localStorage.setItem("learningTopic", rec.topic);
              navigate("/topic-details");
            }}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              border: `2px solid ${rec.color}20`,
              cursor: "pointer",
              transition: "all 0.3s",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = `0 8px 24px ${rec.color}30`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{ fontSize: "32px" }}>{rec.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", marginBottom: "4px" }}>
                  {rec.topic}
                </div>
                <div style={{ fontSize: "13px", color: "#64748b" }}>
                  {rec.reason}
                </div>
              </div>
            </div>
            {rec.avgScore && (
              <div style={{
                background: `${rec.color}10`,
                padding: "8px 12px",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: "600",
                color: rec.color,
                textAlign: "center"
              }}>
                Current: {rec.avgScore}%
              </div>
            )}
            <div style={{
              marginTop: "12px",
              padding: "8px",
              background: `${rec.color}`,
              color: "white",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: "600",
              textAlign: "center"
            }}>
              Start Learning →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

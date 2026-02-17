import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExplanationCard from "../components/ExplanationCard";
import CertificateGenerator from "../components/CertificateGenerator";
import ShareScore from "../components/ShareScore";

export default function FeynmanPage() {
  const navigate = useNavigate();
  const topic = localStorage.getItem("learningTopic") || "Database Management";
  const score = parseInt(localStorage.getItem("quizScore") || "0");
  const userEmail = localStorage.getItem("userEmail") || "Student";
  const [explanation, setExplanation] = useState("");

  useEffect(() => {
    const feynmanText = localStorage.getItem("feynmanExplanation");
    if (feynmanText) {
      setExplanation(feynmanText);
    }
  }, []);

  // Split explanation into paragraphs for better display
  const explanationParagraphs = explanation.split('\n\n').filter(p => p.trim());

  const explanations = explanationParagraphs.length > 0 ? 
    explanationParagraphs.map((para, i) => ({
      title: `Key Point ${i + 1}`,
      explanation: para
    })) : [
      {
        title: "Simplified Explanation",
        explanation: explanation || "Loading explanation..."
      }
    ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fafafa", fontFamily: "'Inter', sans-serif" }}>
      {/* Navigation */}
      <nav style={{
        backgroundColor: "white",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        padding: "16px 0"
      }}>
        <div style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "0 30px",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}>
          <div style={{ 
            fontSize: "18px", 
            fontWeight: "600",
            background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Feynman Technique
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "60px 30px"
      }}>
        {/* Score Alert */}
        <div style={{
          backgroundColor: "#fef3c7",
          border: "1px solid #fbbf24",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "32px",
          display: "flex",
          alignItems: "center",
          gap: "16px"
        }}>
          <div style={{
            fontSize: "32px",
            flexShrink: 0
          }}>
            ⚠️
          </div>
          <div>
            <div style={{ fontSize: "16px", fontWeight: "600", color: "#92400e", marginBottom: "4px" }}>
              Score: {Math.round(score)}% - Below Mastery Threshold
            </div>
            <div style={{ fontSize: "14px", color: "#78350f" }}>
              You need 70% or higher to pass. Let's simplify the concepts to help you understand better.
            </div>
          </div>
        </div>

        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{
            display: "inline-block",
            padding: "6px 14px",
            backgroundColor: "#faf5ff",
            border: "1px solid #e9d5ff",
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: "600",
            color: "#7c3aed",
            marginBottom: "16px"
          }}>
            Simplified Explanations
          </div>
          <h1 style={{
            fontSize: "42px",
            fontWeight: "800",
            color: "#0f172a",
            marginBottom: "12px",
            letterSpacing: "-1px"
          }}>
            Let's Simplify: {topic}
          </h1>
          <p style={{
            fontSize: "16px",
            color: "#64748b",
            lineHeight: "1.7"
          }}>
            Using the Feynman Technique, we'll break down complex concepts into simple, easy-to-understand explanations with relatable analogies.
          </p>
        </div>

        {/* What is Feynman Technique */}
        <div style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "16px",
          border: "1px solid #f0f0f0",
          marginBottom: "32px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <span style={{ fontSize: "24px" }}>💡</span>
            <h2 style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#0f172a"
            }}>
              About the Feynman Technique
            </h2>
          </div>
          <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.7" }}>
            Named after physicist Richard Feynman, this method teaches complex topics by explaining them in simple terms, as if teaching a child. It helps identify knowledge gaps and ensures true understanding.
          </p>
        </div>

        {/* Explanation Cards */}
        <div style={{ marginBottom: "32px" }}>
          {explanations.map((exp, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "white",
                padding: "28px",
                borderRadius: "16px",
                border: "1px solid #f0f0f0",
                marginBottom: "16px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "700"
                }}>
                  {i + 1}
                </div>
                <h3 style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#0f172a"
                }}>
                  {exp.title}
                </h3>
              </div>
              <p style={{
                fontSize: "16px",
                color: "#64748b",
                lineHeight: "1.8",
                paddingLeft: "44px"
              }}>
                {exp.explanation}
              </p>
            </div>
          ))}
        </div>

        {/* Action Card */}
        <div style={{
          backgroundColor: "white",
          padding: "28px",
          borderRadius: "16px",
          border: "1px solid #f0f0f0",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
        }}>
          <div style={{ marginBottom: "20px" }}>
            <h3 style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#0f172a",
              marginBottom: "8px"
            }}>
              Ready to Try Again?
            </h3>
            <p style={{ fontSize: "14px", color: "#64748b" }}>
              Now that you've reviewed the simplified explanations, retake the quiz to improve your score.
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => navigate("/quiz")}
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
                color: "white",
                border: "none",
                padding: "14px 28px",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s",
                boxShadow: "0 8px 24px rgba(124, 58, 237, 0.3)"
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 12px 32px rgba(124, 58, 237, 0.4)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 8px 24px rgba(124, 58, 237, 0.3)";
              }}
            >
              Retry Quiz →
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              style={{
                background: "white",
                color: "#7c3aed",
                border: "2px solid #e9d5ff",
                padding: "14px 28px",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s"
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#faf5ff";
                e.target.style.borderColor = "#d8b4fe";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "white";
                e.target.style.borderColor = "#e9d5ff";
              }}
            >
              View Dashboard
            </button>
          </div>

          {score >= 80 && (
            <div style={{ marginTop: "30px", padding: "24px", background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)", borderRadius: "16px", border: "2px solid #86efac" }}>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "#15803d", marginBottom: "16px" }}>
                🎉 Congratulations! You've earned a certificate!
              </div>
              <CertificateGenerator topic={topic} score={score} userName={userEmail.split('@')[0]} />
            </div>
          )}

          <ShareScore topic={topic} score={score} />
        </div>
      </div>
    </div>
  );
}

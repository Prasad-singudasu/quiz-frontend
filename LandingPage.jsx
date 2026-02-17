import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [darkMode, setDarkMode] = useState(false);
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    window.location.reload();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const theme = {
    bg: darkMode ? "#0a0a0f" : "#ffffff",
    text: darkMode ? "#e2e8f0" : "#0f172a",
    textSecondary: darkMode ? "#94a3b8" : "#64748b",
    cardBg: darkMode ? "#1a1a24" : "white",
    navBg: darkMode ? "rgba(10, 10, 15, 0.98)" : "rgba(255, 255, 255, 0.98)",
    sectionBg: darkMode ? "#0f0f14" : "#fafafa",
    border: darkMode ? "#2d2d3d" : "#f0f0f0"
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: theme.bg, fontFamily: "'Inter', sans-serif", transition: "background-color 0.3s ease" }}>
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 1; }
          50% { transform: translateX(-50%) scale(1.15); opacity: 0.7; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(15deg); }
        }
        @keyframes floatReverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(30px) rotate(-15deg); }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes particle1 {
          0% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          50% { transform: translate(100px, -150px) scale(1.5); opacity: 0.6; }
          100% { transform: translate(0, -300px) scale(0.5); opacity: 0; }
        }
        @keyframes particle2 {
          0% { transform: translate(0, 0) scale(1); opacity: 0.4; }
          50% { transform: translate(-80px, -120px) scale(1.3); opacity: 0.7; }
          100% { transform: translate(-150px, -250px) scale(0.8); opacity: 0; }
        }
        @keyframes particle3 {
          0% { transform: translate(0, 0) scale(1); opacity: 0.2; }
          50% { transform: translate(50px, -100px) scale(1.2); opacity: 0.5; }
          100% { transform: translate(100px, -200px) scale(0.6); opacity: 0; }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(124, 58, 237, 0.5); }
          50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.8); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Navigation */}
      <nav style={{
        position: "sticky",
        top: 0,
        backgroundColor: theme.navBg,
        backdropFilter: "blur(20px)",
        boxShadow: "0 1px 0 rgba(0, 0, 0, 0.05)",
        padding: "16px 0",
        zIndex: 1000,
        transition: "background-color 0.3s ease"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "10px", 
            fontSize: "20px", 
            fontWeight: "700",
            background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            <span style={{ fontSize: "24px" }}>⚡</span>
            AI Learning Agent
          </div>
          <div style={{ display: "flex", gap: "32px", alignItems: "center", fontSize: "14px", fontWeight: "500" }}>
            <a 
              href="#home" 
              style={{ color: theme.text, textDecoration: "none", cursor: "pointer", transition: "all 0.3s", position: "relative" }}
              onMouseOver={(e) => {
                e.target.style.background = "linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)";
                e.target.style.WebkitBackgroundClip = "text";
                e.target.style.WebkitTextFillColor = "transparent";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "none";
                e.target.style.WebkitBackgroundClip = "unset";
                e.target.style.WebkitTextFillColor = "unset";
                e.target.style.color = theme.text;
                e.target.style.transform = "translateY(0)";
              }}
            >
              Home
            </a>
            <a 
              href="#dashboard" 
              onClick={() => navigate("/dashboard")} 
              style={{ color: theme.textSecondary, textDecoration: "none", cursor: "pointer", transition: "all 0.3s" }}
              onMouseOver={(e) => {
                e.target.style.background = "linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)";
                e.target.style.WebkitBackgroundClip = "text";
                e.target.style.WebkitTextFillColor = "transparent";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "none";
                e.target.style.WebkitBackgroundClip = "unset";
                e.target.style.WebkitTextFillColor = "unset";
                e.target.style.color = theme.textSecondary;
                e.target.style.transform = "translateY(0)";
              }}
            >
              Dashboard
            </a>
            <a 
              href="#leaderboard" 
              onClick={() => navigate("/leaderboard")} 
              style={{ color: theme.textSecondary, textDecoration: "none", cursor: "pointer", transition: "all 0.3s" }}
              onMouseOver={(e) => {
                e.target.style.background = "linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)";
                e.target.style.WebkitBackgroundClip = "text";
                e.target.style.WebkitTextFillColor = "transparent";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "none";
                e.target.style.WebkitBackgroundClip = "unset";
                e.target.style.WebkitTextFillColor = "unset";
                e.target.style.color = theme.textSecondary;
                e.target.style.transform = "translateY(0)";
              }}
            >
              Leaderboard
            </a>
            <a 
              href="#chat" 
              onClick={() => navigate("/chat")} 
              style={{ color: theme.textSecondary, textDecoration: "none", cursor: "pointer", transition: "all 0.3s" }}
              onMouseOver={(e) => {
                e.target.style.background = "linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)";
                e.target.style.WebkitBackgroundClip = "text";
                e.target.style.WebkitTextFillColor = "transparent";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "none";
                e.target.style.WebkitBackgroundClip = "unset";
                e.target.style.WebkitTextFillColor = "unset";
                e.target.style.color = theme.textSecondary;
                e.target.style.transform = "translateY(0)";
              }}
            >
              AI Tutor
            </a>
            <a 
              href="#notes" 
              onClick={() => navigate("/notes")} 
              style={{ color: theme.textSecondary, textDecoration: "none", cursor: "pointer", transition: "all 0.3s" }}
              onMouseOver={(e) => {
                e.target.style.background = "linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)";
                e.target.style.WebkitBackgroundClip = "text";
                e.target.style.WebkitTextFillColor = "transparent";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "none";
                e.target.style.WebkitBackgroundClip = "unset";
                e.target.style.WebkitTextFillColor = "unset";
                e.target.style.color = theme.textSecondary;
                e.target.style.transform = "translateY(0)";
              }}
            >
              Notes
            </a>
            <a 
              href="#results" 
              style={{ color: theme.textSecondary, textDecoration: "none", cursor: "pointer", transition: "all 0.3s" }}
              onMouseOver={(e) => {
                e.target.style.background = "linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)";
                e.target.style.WebkitBackgroundClip = "text";
                e.target.style.WebkitTextFillColor = "transparent";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "none";
                e.target.style.WebkitBackgroundClip = "unset";
                e.target.style.WebkitTextFillColor = "unset";
                e.target.style.color = theme.textSecondary;
                e.target.style.transform = "translateY(0)";
              }}
            >
              Results
            </a>
            <button
              onClick={() => navigate("/login")}
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "8px 20px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                transition: "all 0.3s",
                display: isAuthenticated ? "none" : "block"
              }}
              onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
              onMouseOut={(e) => e.target.style.transform = "scale(1)"}
            >
              Login
            </button>
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                style={{
                  background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 20px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                  transition: "all 0.3s"
                }}
                onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
                onMouseOut={(e) => e.target.style.transform = "scale(1)"}
              >
                Logout
              </button>
            )}
            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{
                background: darkMode ? "#2d2d3d" : "#f3f4f6",
                border: "none",
                borderRadius: "20px",
                padding: "8px 16px",
                cursor: "pointer",
                fontSize: "18px",
                transition: "all 0.3s",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              {darkMode ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "70px 30px 60px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Animated Background Elements */}
        <div style={{
          position: "absolute",
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          zIndex: 0,
          pointerEvents: "none",
          animation: "pulse 4s ease-in-out infinite"
        }}></div>

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: `${Math.random() * 10 + 3}px`,
              height: `${Math.random() * 10 + 3}px`,
              borderRadius: "50%",
              background: i % 4 === 0 ? "linear-gradient(135deg, #7c3aed, #a855f7)" : 
                         i % 4 === 1 ? "linear-gradient(135deg, #a855f7, #ec4899)" :
                         i % 4 === 2 ? "linear-gradient(135deg, #ec4899, #f59e0b)" :
                         "linear-gradient(135deg, #10b981, #34d399)",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0,
              animation: `particle${(i % 3) + 1} ${Math.random() * 6 + 5}s ease-in-out ${Math.random() * 4}s infinite`,
              zIndex: 0,
              pointerEvents: "none",
              boxShadow: "0 0 10px rgba(124, 58, 237, 0.5)"
            }}
          />
        ))}

        {/* Interactive Glow Effect */}
        <div style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)",
          left: `${mousePosition.x - 150}px`,
          top: `${mousePosition.y - 150}px`,
          pointerEvents: "none",
          transition: "all 0.3s ease",
          zIndex: 0,
          filter: "blur(40px)"
        }}></div>

        <div style={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "120px",
          height: "120px",
          background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
          borderRadius: "50%",
          opacity: 0.15,
          animation: "float 5s ease-in-out infinite",
          filter: "blur(40px)"
        }}></div>

        <div style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: "100px",
          height: "100px",
          background: "linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)",
          borderRadius: "30%",
          opacity: 0.15,
          animation: "floatReverse 7s ease-in-out infinite",
          filter: "blur(40px)"
        }}></div>

        <div style={{
          position: "absolute",
          bottom: "20%",
          left: "15%",
          width: "80px",
          height: "80px",
          background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
          borderRadius: "20%",
          opacity: 0.15,
          animation: "float 6s ease-in-out infinite",
          filter: "blur(40px)"
        }}></div>

        <div style={{
          position: "absolute",
          bottom: "10%",
          right: "20%",
          width: "90px",
          height: "90px",
          background: "linear-gradient(135deg, #f59e0b 0%, #7c3aed 100%)",
          borderRadius: "40%",
          opacity: 0.15,
          animation: "floatReverse 8s ease-in-out infinite",
          filter: "blur(40px)"
        }}></div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-block",
            padding: "6px 16px",
            backgroundColor: "#faf5ff",
            border: "1px solid #e9d5ff",
            borderRadius: "25px",
            fontSize: "13px",
            fontWeight: "600",
            color: "#7c3aed",
            marginBottom: "24px",
            letterSpacing: "0.5px",
            animation: "scaleIn 0.6s ease-out, glow 3s ease-in-out infinite"
          }}>
            ✨ AI-POWERED ADAPTIVE LEARNING
          </div>

          <h1 style={{
            fontSize: "52px",
            fontWeight: "800",
            lineHeight: "1.1",
            marginBottom: "20px",
            color: theme.text,
            letterSpacing: "-1.5px",
            animation: "slideInLeft 0.8s ease-out",
            transition: "color 0.3s"
          }}>
            Autonomous AI<br />
            <span style={{
              background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              Learning Agent
            </span>
          </h1>

          <p style={{
            fontSize: "17px",
            color: theme.textSecondary,
            maxWidth: "680px",
            margin: "0 auto 36px",
            lineHeight: "1.7",
            animation: "slideInRight 0.8s ease-out 0.2s backwards",
            transition: "color 0.3s"
          }}>
            Master complex topics with an intelligent learning system that guides you through structured checkpoints, verifies your understanding, and provides simplified explanations when you need them.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", alignItems: "center", animation: "scaleIn 0.8s ease-out 0.4s backwards" }}>
            <button
              onClick={() => navigate("/learning")}
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
                boxShadow: "0 8px 24px rgba(124, 58, 237, 0.3)",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-3px) scale(1.02)";
                e.target.style.boxShadow = "0 16px 40px rgba(124, 58, 237, 0.5)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.boxShadow = "0 8px 24px rgba(124, 58, 237, 0.3)";
              }}
            >
              <span style={{ position: "relative", zIndex: 1 }}>Start Learning →</span>
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              style={{
                background: "white",
                color: "#7c3aed",
                border: "2px solid #e9d5ff",
                padding: "16px 36px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s",
                position: "relative"
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#faf5ff";
                e.target.style.borderColor = "#d8b4fe";
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = "0 8px 20px rgba(124, 58, 237, 0.15)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "white";
                e.target.style.borderColor = "#e9d5ff";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              View Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{
        backgroundColor: theme.sectionBg,
        padding: "70px 30px",
        borderTop: `1px solid ${theme.border}`,
        transition: "background-color 0.3s ease"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <h2 style={{ 
              fontSize: "38px", 
              fontWeight: "800", 
              color: theme.text, 
              marginBottom: "12px",
              letterSpacing: "-1px",
              transition: "color 0.3s"
            }}>
              How It Works
            </h2>
            <p style={{ fontSize: "17px", color: theme.textSecondary, maxWidth: "550px", margin: "0 auto", transition: "color 0.3s" }}>
              Our learning agent uses proven pedagogical techniques to ensure deep understanding.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px"
          }}>
            {[
              {
                icon: "◆",
                title: "Checkpoint-Based Learning",
                desc: "Progress through structured learning modules designed to build your knowledge step-by-step.",
                color: "#7c3aed",
                iconColor: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)"
              },
              {
                icon: "★",
                title: "Automated Assessment",
                desc: "Verify your understanding with intelligent quizzes that adapt to your learning pace.",
                color: "#ec4899",
                iconColor: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)"
              },
              {
                icon: "●",
                title: "Feynman-Style Simplification",
                desc: "When you struggle, receive explanations using simple language and relatable analogies.",
                color: "#f59e0b",
                iconColor: "linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)"
              }
            ].map((feature, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: theme.cardBg,
                  padding: "32px",
                  borderRadius: "20px",
                  border: hoveredCard === i ? `2px solid ${feature.color}` : `2px solid ${theme.border}`,
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  transform: hoveredCard === i ? "translateY(-12px) scale(1.02)" : "translateY(0) scale(1)",
                  boxShadow: hoveredCard === i ? `0 20px 60px ${feature.color}30` : "0 4px 12px rgba(0, 0, 0, 0.05)"
                }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={{
                  width: "64px",
                  height: "64px",
                  background: hoveredCard === i 
                    ? feature.iconColor
                    : `linear-gradient(135deg, ${feature.color}20 0%, ${feature.color}10 100%)`,
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "32px",
                  marginBottom: "20px",
                  transition: "all 0.4s",
                  transform: hoveredCard === i ? "rotate(10deg) scale(1.1)" : "rotate(0deg) scale(1)"
                }}>
                  <span style={{
                    background: hoveredCard === i ? "white" : feature.iconColor,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: "900"
                  }}>
                    {feature.icon}
                  </span>
                </div>
                <h3 style={{ 
                  fontSize: "19px", 
                  fontWeight: "700", 
                  color: theme.text, 
                  marginBottom: "10px",
                  letterSpacing: "-0.3px",
                  transition: "color 0.3s"
                }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: "14px", color: theme.textSecondary, lineHeight: "1.6", transition: "color 0.3s" }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: "70px 30px" }}>
        <div style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%)",
          padding: "50px 40px",
          borderRadius: "24px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            position: "absolute",
            top: "-40px",
            right: "-40px",
            width: "160px",
            height: "160px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%"
          }}></div>
          <div style={{
            position: "absolute",
            bottom: "-60px",
            left: "-60px",
            width: "200px",
            height: "200px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%"
          }}></div>
          
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ 
              fontSize: "34px", 
              fontWeight: "800", 
              color: "white", 
              marginBottom: "14px",
              letterSpacing: "-0.8px"
            }}>
              Ready to Transform Your Learning?
            </h2>
            <p style={{ fontSize: "17px", color: "rgba(255, 255, 255, 0.9)", marginBottom: "28px" }}>
              Begin your journey with our AI-powered learning system today.
            </p>
            <button
              onClick={() => navigate("/learning")}
              style={{
                background: "white",
                color: "#7c3aed",
                border: "none",
                padding: "15px 38px",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.3s",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)"
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow = "0 12px 32px rgba(0, 0, 0, 0.3)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.2)";
              }}
            >
              Get Started Now →
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: "#0f172a",
        color: "#94a3b8",
        textAlign: "center",
        padding: "32px 30px",
        fontSize: "14px",
        borderTop: "1px solid #1e293b"
      }}>
        <div style={{ marginBottom: "6px", fontWeight: "600", color: "#cbd5e1" }}>
          Autonomous AI Learning Agent
        </div>
        © 2026 Built for academic excellence.
      </footer>
    </div>
  );
}

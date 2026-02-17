import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../hooks/useDarkMode";

export default function LeaderboardPage() {
  const navigate = useNavigate();
  const { darkMode, setDarkMode, theme } = useDarkMode();
  const [leaderboard, setLeaderboard] = useState([]);
  const [filter, setFilter] = useState("all"); // all, weekly, monthly
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    fetchLeaderboard();
  }, [filter]);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/leaderboard?filter=${filter}`);
      const data = await response.json();
      setLeaderboard(data.leaderboard || []);
    } catch (err) {
      console.error("Failed to fetch leaderboard:", err);
    }
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: theme.bg, fontFamily: "'Inter', sans-serif", transition: "background-color 0.3s" }}>
      <nav style={{
        backgroundColor: theme.navBg,
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        padding: "16px 0",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button onClick={() => navigate("/")} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", padding: "8px", color: theme.text }}>←</button>
            <div style={{ fontSize: "18px", fontWeight: "600", background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              🏆 Leaderboard
            </div>
          </div>
          <button onClick={() => setDarkMode(!darkMode)} style={{ background: darkMode ? "#2d2d3d" : "#f3f4f6", border: "none", borderRadius: "20px", padding: "8px 16px", cursor: "pointer", fontSize: "18px" }}>
            {darkMode ? "🌙" : "☀️"}
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 30px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "42px", fontWeight: "800", color: theme.text, marginBottom: "12px" }}>
            Top Performers 🏆
          </h1>
          <p style={{ fontSize: "16px", color: theme.textSecondary }}>Compete with learners worldwide</p>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginBottom: "30px" }}>
          {[
            { key: "all", label: "All Time" },
            { key: "weekly", label: "This Week" },
            { key: "monthly", label: "This Month" }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              style={{
                padding: "10px 24px",
                borderRadius: "10px",
                border: filter === tab.key ? "2px solid #7c3aed" : "2px solid #e5e7eb",
                background: filter === tab.key ? "#faf5ff" : "white",
                color: filter === tab.key ? "#7c3aed" : "#64748b",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s"
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Leaderboard List */}
        <div style={{ backgroundColor: theme.cardBg, borderRadius: "20px", padding: "30px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)", border: `1px solid ${theme.border}` }}>
          {leaderboard.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: theme.textSecondary }}>
              No data available yet. Be the first to compete!
            </div>
          ) : (
            leaderboard.map((user, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "20px",
                  borderRadius: "12px",
                  marginBottom: "12px",
                  background: user.email === userEmail ? "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)" : index < 3 ? "#fafafa" : "white",
                  border: user.email === userEmail ? "2px solid #7c3aed" : "1px solid #f0f0f0",
                  transition: "all 0.3s"
                }}
              >
                <div style={{ fontSize: "28px", fontWeight: "800", width: "60px", textAlign: "center" }}>
                  {getRankIcon(index + 1)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", marginBottom: "4px" }}>
                    {user.email === userEmail ? "You" : user.email.split("@")[0]}
                    {user.email === userEmail && " 👤"}
                  </div>
                  <div style={{ fontSize: "13px", color: "#64748b" }}>
                    {user.total_quizzes} quizzes completed
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "24px", fontWeight: "800", color: "#7c3aed" }}>
                    {user.avg_score}%
                  </div>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>avg score</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

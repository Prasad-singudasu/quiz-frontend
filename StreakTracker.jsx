import { useState, useEffect } from "react";

export default function StreakTracker() {
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    calculateStreak();
  }, []);

  const calculateStreak = () => {
    const lastActivity = localStorage.getItem("lastActivityDate");
    const currentStreak = parseInt(localStorage.getItem("currentStreak") || "0");
    const today = new Date().toDateString();

    if (lastActivity === today) {
      setStreak(currentStreak);
    } else if (lastActivity === new Date(Date.now() - 86400000).toDateString()) {
      const newStreak = currentStreak + 1;
      setStreak(newStreak);
      localStorage.setItem("currentStreak", newStreak.toString());
      localStorage.setItem("lastActivityDate", today);
      checkBadges(newStreak);
    } else {
      setStreak(1);
      localStorage.setItem("currentStreak", "1");
      localStorage.setItem("lastActivityDate", today);
    }
  };

  const checkBadges = (streakCount) => {
    const earnedBadges = [];
    if (streakCount >= 3) earnedBadges.push({ name: "3-Day Streak", icon: "🔥" });
    if (streakCount >= 7) earnedBadges.push({ name: "Week Warrior", icon: "⚡" });
    if (streakCount >= 30) earnedBadges.push({ name: "Month Master", icon: "🏆" });
    if (streakCount >= 100) earnedBadges.push({ name: "Century Club", icon: "👑" });
    setBadges(earnedBadges);
  };

  return (
    <div style={{
      background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",
      padding: "20px",
      borderRadius: "16px",
      color: "white",
      textAlign: "center",
      boxShadow: "0 4px 12px rgba(255, 107, 107, 0.3)"
    }}>
      <div style={{ fontSize: "48px", marginBottom: "8px" }}>🔥</div>
      <div style={{ fontSize: "32px", fontWeight: "800", marginBottom: "4px" }}>{streak}</div>
      <div style={{ fontSize: "14px", opacity: 0.9 }}>Day Streak</div>
      {badges.length > 0 && (
        <div style={{ marginTop: "16px", display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
          {badges.map((badge, i) => (
            <div key={i} style={{
              background: "rgba(255, 255, 255, 0.2)",
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "600"
            }}>
              {badge.icon} {badge.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

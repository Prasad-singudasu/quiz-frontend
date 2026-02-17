import { useState, useEffect } from "react";

export default function XPSystem() {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [nextLevelXP, setNextLevelXP] = useState(500);

  useEffect(() => {
    const savedXP = parseInt(localStorage.getItem("userXP") || "0");
    const savedLevel = parseInt(localStorage.getItem("userLevel") || "1");
    setXp(savedXP);
    setLevel(savedLevel);
    setNextLevelXP(savedLevel * 500);
  }, []);

  const progress = (xp % 500) / 500 * 100;

  const getLevelBadge = (lvl) => {
    if (lvl >= 20) return { icon: "👑", name: "Legend", color: "#fbbf24" };
    if (lvl >= 15) return { icon: "💎", name: "Diamond", color: "#60a5fa" };
    if (lvl >= 10) return { icon: "🥇", name: "Gold", color: "#fbbf24" };
    if (lvl >= 5) return { icon: "🥈", name: "Silver", color: "#d1d5db" };
    return { icon: "🥉", name: "Bronze", color: "#f97316" };
  };

  const badge = getLevelBadge(level);

  return (
    <div style={{
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "20px",
      borderRadius: "16px",
      color: "white",
      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <div>
          <div style={{ fontSize: "14px", opacity: 0.9, marginBottom: "4px" }}>Level {level}</div>
          <div style={{ fontSize: "24px", fontWeight: "800" }}>{badge.icon} {badge.name}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "28px", fontWeight: "800" }}>{xp}</div>
          <div style={{ fontSize: "12px", opacity: 0.9 }}>XP</div>
        </div>
      </div>
      
      <div style={{ background: "rgba(255,255,255,0.2)", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
        <div style={{
          background: "white",
          height: "100%",
          width: `${progress}%`,
          transition: "width 0.5s ease",
          borderRadius: "4px"
        }}></div>
      </div>
      
      <div style={{ fontSize: "12px", marginTop: "8px", opacity: 0.9, textAlign: "center" }}>
        {500 - (xp % 500)} XP to Level {level + 1}
      </div>
    </div>
  );
}

export const addXP = (points) => {
  const currentXP = parseInt(localStorage.getItem("userXP") || "0");
  const currentLevel = parseInt(localStorage.getItem("userLevel") || "1");
  const newXP = currentXP + points;
  const newLevel = Math.floor(newXP / 500) + 1;
  
  localStorage.setItem("userXP", newXP.toString());
  localStorage.setItem("userLevel", newLevel.toString());
  
  if (newLevel > currentLevel) {
    return { levelUp: true, newLevel };
  }
  return { levelUp: false };
};

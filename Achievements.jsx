import { useState, useEffect } from "react";

const ACHIEVEMENTS = [
  { id: "first_quiz", name: "First Steps", desc: "Complete your first quiz", icon: "🎯", condition: (stats) => stats.totalQuizzes >= 1 },
  { id: "perfect_score", name: "Perfectionist", desc: "Score 100% on a quiz", icon: "💯", condition: (stats) => stats.perfectScores >= 1 },
  { id: "quiz_master", name: "Quiz Master", desc: "Complete 10 quizzes", icon: "🎓", condition: (stats) => stats.totalQuizzes >= 10 },
  { id: "streak_3", name: "On Fire", desc: "3-day learning streak", icon: "🔥", condition: (stats) => stats.currentStreak >= 3 },
  { id: "streak_7", name: "Week Warrior", desc: "7-day learning streak", icon: "⚡", condition: (stats) => stats.currentStreak >= 7 },
  { id: "streak_30", name: "Month Master", desc: "30-day learning streak", icon: "👑", condition: (stats) => stats.currentStreak >= 30 },
  { id: "all_topics", name: "Explorer", desc: "Try all 8 topics", icon: "🗺️", condition: (stats) => stats.uniqueTopics >= 8 },
  { id: "high_scorer", name: "High Achiever", desc: "Average score above 85%", icon: "🌟", condition: (stats) => stats.avgScore >= 85 },
  { id: "speed_demon", name: "Speed Demon", desc: "Complete quiz in under 5 min", icon: "⚡", condition: (stats) => stats.fastestTime < 300 },
  { id: "comeback", name: "Comeback Kid", desc: "Improve score by 30%", icon: "📈", condition: (stats) => stats.maxImprovement >= 30 },
  { id: "night_owl", name: "Night Owl", desc: "Complete quiz after midnight", icon: "🦉", condition: (stats) => stats.lateNightQuizzes >= 1 },
  { id: "early_bird", name: "Early Bird", desc: "Complete quiz before 6 AM", icon: "🐦", condition: (stats) => stats.earlyMorningQuizzes >= 1 },
  { id: "social_butterfly", name: "Social Butterfly", desc: "Share 5 quiz results", icon: "🦋", condition: (stats) => stats.sharesCount >= 5 },
  { id: "note_taker", name: "Note Taker", desc: "Save 10 study notes", icon: "📝", condition: (stats) => stats.savedNotes >= 10 },
  { id: "chat_master", name: "Curious Mind", desc: "Ask AI tutor 20 questions", icon: "💬", condition: (stats) => stats.chatMessages >= 20 },
];

export function checkAchievements() {
  const quizHistory = JSON.parse(localStorage.getItem("quizHistory") || "[]");
  const savedNotes = JSON.parse(localStorage.getItem("savedNotes") || "[]");
  const currentStreak = parseInt(localStorage.getItem("currentStreak") || "0");
  const chatMessages = parseInt(localStorage.getItem("chatMessageCount") || "0");
  const sharesCount = parseInt(localStorage.getItem("sharesCount") || "0");
  
  const stats = {
    totalQuizzes: quizHistory.length,
    perfectScores: quizHistory.filter(q => q.score === 100).length,
    currentStreak,
    uniqueTopics: new Set(quizHistory.map(q => q.topic)).size,
    avgScore: quizHistory.length > 0 ? quizHistory.reduce((sum, q) => sum + q.score, 0) / quizHistory.length : 0,
    fastestTime: 999999,
    maxImprovement: 0,
    lateNightQuizzes: 0,
    earlyMorningQuizzes: 0,
    savedNotes: savedNotes.length,
    chatMessages,
    sharesCount
  };

  const unlockedAchievements = JSON.parse(localStorage.getItem("achievements") || "[]");
  const newAchievements = [];

  ACHIEVEMENTS.forEach(achievement => {
    if (!unlockedAchievements.includes(achievement.id) && achievement.condition(stats)) {
      newAchievements.push(achievement);
      unlockedAchievements.push(achievement.id);
    }
  });

  if (newAchievements.length > 0) {
    localStorage.setItem("achievements", JSON.stringify(unlockedAchievements));
  }

  return newAchievements;
}

export default function AchievementPopup({ achievement, onClose }) {
  if (!achievement) return null;

  return (
    <div style={{
      position: "fixed",
      top: "20px",
      right: "20px",
      background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
      padding: "20px 24px",
      borderRadius: "16px",
      boxShadow: "0 8px 32px rgba(251, 191, 36, 0.4)",
      zIndex: 9999,
      animation: "slideIn 0.5s ease-out",
      minWidth: "300px"
    }}>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(400px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ fontSize: "48px" }}>{achievement.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "12px", fontWeight: "600", color: "rgba(255,255,255,0.8)", marginBottom: "4px" }}>
            🎉 ACHIEVEMENT UNLOCKED!
          </div>
          <div style={{ fontSize: "18px", fontWeight: "800", color: "white", marginBottom: "4px" }}>
            {achievement.name}
          </div>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.9)" }}>
            {achievement.desc}
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: "rgba(255,255,255,0.2)",
            border: "none",
            color: "white",
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold"
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}

export function AchievementsList() {
  const [unlocked, setUnlocked] = useState([]);

  useEffect(() => {
    const unlockedIds = JSON.parse(localStorage.getItem("achievements") || "[]");
    setUnlocked(unlockedIds);
  }, []);

  return (
    <div style={{ marginTop: "30px" }}>
      <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "16px" }}>
        🏆 Achievements ({unlocked.length}/{ACHIEVEMENTS.length})
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "12px" }}>
        {ACHIEVEMENTS.map(achievement => {
          const isUnlocked = unlocked.includes(achievement.id);
          return (
            <div
              key={achievement.id}
              style={{
                background: isUnlocked ? "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)" : "#f3f4f6",
                padding: "16px",
                borderRadius: "12px",
                textAlign: "center",
                opacity: isUnlocked ? 1 : 0.5,
                transition: "all 0.3s"
              }}
            >
              <div style={{ fontSize: "40px", marginBottom: "8px", filter: isUnlocked ? "none" : "grayscale(100%)" }}>
                {achievement.icon}
              </div>
              <div style={{ fontSize: "13px", fontWeight: "700", color: isUnlocked ? "white" : "#64748b", marginBottom: "4px" }}>
                {achievement.name}
              </div>
              <div style={{ fontSize: "11px", color: isUnlocked ? "rgba(255,255,255,0.9)" : "#94a3b8" }}>
                {achievement.desc}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

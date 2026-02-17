import { useState, useEffect } from "react";

export default function QuizTimer({ duration = 600, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsRunning(false);
          onTimeUp && onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const percentage = (timeLeft / duration) * 100;
  const isWarning = timeLeft < 60;
  const isCritical = timeLeft < 30;

  return (
    <div style={{
      background: isCritical ? "#fee2e2" : isWarning ? "#fef3c7" : "#f0fdf4",
      padding: "16px 20px",
      borderRadius: "12px",
      border: `2px solid ${isCritical ? "#ef4444" : isWarning ? "#fbbf24" : "#10b981"}`,
      display: "flex",
      alignItems: "center",
      gap: "12px"
    }}>
      <div style={{ fontSize: "24px" }}>
        {isCritical ? "⏰" : isWarning ? "⚠️" : "⏱️"}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", marginBottom: "4px" }}>
          Time Remaining
        </div>
        <div style={{ fontSize: "24px", fontWeight: "800", color: isCritical ? "#dc2626" : isWarning ? "#d97706" : "#15803d" }}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </div>
      <div style={{ width: "60px", height: "60px", position: "relative" }}>
        <svg width="60" height="60" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="30" cy="30" r="26" fill="none" stroke="#e5e7eb" strokeWidth="4" />
          <circle
            cx="30"
            cy="30"
            r="26"
            fill="none"
            stroke={isCritical ? "#ef4444" : isWarning ? "#fbbf24" : "#10b981"}
            strokeWidth="4"
            strokeDasharray={`${2 * Math.PI * 26}`}
            strokeDashoffset={`${2 * Math.PI * 26 * (1 - percentage / 100)}`}
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
      </div>
    </div>
  );
}

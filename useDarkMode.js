import { useState, useEffect } from 'react';

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const theme = {
    bg: darkMode ? "#0a0a0f" : "#fafafa",
    text: darkMode ? "#e2e8f0" : "#0f172a",
    textSecondary: darkMode ? "#94a3b8" : "#64748b",
    cardBg: darkMode ? "#1a1a24" : "white",
    navBg: darkMode ? "rgba(10, 10, 15, 0.98)" : "rgba(255, 255, 255, 0.98)",
    border: darkMode ? "#2d2d3d" : "#f0f0f0",
    inputBg: darkMode ? "rgba(255, 255, 255, 0.05)" : "white"
  };

  return { darkMode, setDarkMode, theme };
};

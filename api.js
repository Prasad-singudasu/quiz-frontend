export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  generateTopic: `${API_URL}/api/generate-topic`,
  generateQuiz: `${API_URL}/api/generate-quiz`,
  evaluateAnswers: `${API_URL}/api/evaluate-answers`,
  userActivity: `${API_URL}/api/user-activity`,
  leaderboard: `${API_URL}/api/leaderboard`,
  chat: `${API_URL}/api/chat`,
};

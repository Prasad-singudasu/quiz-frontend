import { useState, useEffect } from "react";
import QuestionCard from "../components/QuestionCard";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../hooks/useDarkMode";

export default function QuizPage() {
  const navigate = useNavigate();
  const { darkMode, setDarkMode, theme } = useDarkMode();
  const [answers, setAnswers] = useState({});
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Analyzing topic...");
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState(null);
  const [toast, setToast] = useState(null);
  const topic = localStorage.getItem("learningTopic") || "Database Management";
  const context = localStorage.getItem("topicContext") || "";
  const difficulty = localStorage.getItem("difficulty") || "intermediate";

  useEffect(() => {
    // Fetch quiz from backend
    const fetchQuiz = async () => {
      try {
        // Update loading messages
        setLoadingMessage("Analyzing topic...");
        setTimeout(() => setLoadingMessage("Generating questions..."), 1000);
        setTimeout(() => setLoadingMessage("Creating answer options..."), 2000);
        setTimeout(() => setLoadingMessage("Almost ready..."), 3000);
        
        const response = await fetch('http://localhost:8000/api/generate-quiz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ topic, context, difficulty })
        });
        
        if (!response.ok) {
          throw new Error('Failed to generate quiz. Please try again.');
        }
        
        const data = await response.json();
        setQuizQuestions(data.questions);
      } catch (err) {
        console.error('Failed to generate quiz:', err);
        setError(err.message || 'Failed to generate quiz. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [topic, context]);

  const handleAnswer = (questionIndex, optionIndex) => {
    setAnswers({ ...answers, [questionIndex]: optionIndex });
  };

  const handleSubmit = async () => {
    // Validate all questions answered
    if (Object.keys(answers).length < quizQuestions.length) {
      alert('Please answer all questions before submitting.');
      return;
    }
    
    setLoading(true);
    const studentAnswers = quizQuestions.map((_, i) => answers[i] || "");
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout
      
      const response = await fetch('http://localhost:8000/api/evaluate-answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          questions: quizQuestions,
          answers: studentAnswers
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error('Failed to evaluate');
      }
      
      const data = await response.json();
      setResults(data);
      setSubmitted(true);
      setToast({ message: 'Quiz submitted successfully!', type: 'success' });
      localStorage.setItem("quizScore", data.score);
      
      // Save to quiz history
      const history = JSON.parse(localStorage.getItem("quizHistory") || "[]");
      history.push({
        topic: topic,
        score: data.score,
        date: new Date().toISOString(),
        passed: data.passed
      });
      localStorage.setItem("quizHistory", JSON.stringify(history));
      
      if (data.feynman_explanation) {
        localStorage.setItem("feynmanExplanation", data.feynman_explanation);
      }
    } catch (err) {
      console.error('Failed to evaluate answers:', err);
      if (err.name === 'AbortError') {
        setToast({ message: 'Request timed out. Please try again.', type: 'error' });
      } else {
        setToast({ message: 'Error submitting quiz. Please try again.', type: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };

  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / quizQuestions.length) * 100;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: theme.bg, fontFamily: "'Inter', sans-serif", transition: "background-color 0.3s" }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {/* Navigation */}
      <nav style={{
        backgroundColor: theme.navBg,
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        padding: "16px 0",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "0 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button 
              onClick={() => navigate("/learning")}
              style={{
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                padding: "8px"
              }}
            >
              ←
            </button>
            <div style={{ 
              fontSize: "18px", 
              fontWeight: "600",
              background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              Quiz Assessment
            </div>
          </div>
          <div style={{ fontSize: "14px", color: theme.textSecondary, fontWeight: "500" }}>
            {answeredCount} / {quizQuestions.length} answered
          </div>
          <button onClick={() => setDarkMode(!darkMode)} style={{ background: darkMode ? "#2d2d3d" : "#f3f4f6", border: "none", borderRadius: "20px", padding: "8px 16px", cursor: "pointer", fontSize: "18px" }}>
            {darkMode ? "🌙" : "☀️"}
          </button>
        </div>
      </nav>

      {/* Progress Bar */}
      <div style={{
        backgroundColor: "white",
        borderBottom: "1px solid #f0f0f0"
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 30px" }}>
          <div style={{
            height: "4px",
            backgroundColor: "#f0f0f0",
            borderRadius: "2px",
            overflow: "hidden"
          }}>
            <div style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg, #7c3aed 0%, #a855f7 100%)",
              transition: "width 0.3s ease"
            }}></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "40px 30px"
      }}>
        <div style={{ marginBottom: "40px" }}>
          <h1 style={{
            fontSize: "32px",
            fontWeight: "800",
            color: "#0f172a",
            marginBottom: "8px",
            letterSpacing: "-0.5px"
          }}>
            {topic}
          </h1>
          <p style={{ fontSize: "16px", color: "#64748b" }}>
            Answer all questions to test your understanding
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{
              width: "60px",
              height: "60px",
              border: "4px solid #f0f0f0",
              borderTop: "4px solid #7c3aed",
              borderRadius: "50%",
              margin: "0 auto 24px",
              animation: "spin 1s linear infinite"
            }}></div>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
            `}</style>
            <p style={{ 
              marginTop: "20px", 
              color: "#7c3aed", 
              fontSize: "18px", 
              fontWeight: "600",
              animation: "fadeIn 0.5s ease-in-out"
            }}>
              {loadingMessage}
            </p>
            <p style={{ marginTop: "8px", color: "#94a3b8", fontSize: "14px" }}>
              This may take 10-15 seconds
            </p>
          </div>
        ) : error ? (
          <div style={{
            backgroundColor: "#fee2e2",
            padding: "40px",
            borderRadius: "16px",
            border: "2px solid #fca5a5",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>⚠️</div>
            <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#dc2626", marginBottom: "8px" }}>
              Error Loading Quiz
            </h3>
            <p style={{ fontSize: "16px", color: "#991b1b", marginBottom: "20px" }}>
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Try Again
            </button>
          </div>
        ) : (
          quizQuestions.map((q, i) => {
            const userAnswer = answers[i];
            const correctAnswer = results?.correct_answers[i];
            const isCorrect = submitted && userAnswer === correctAnswer;
            const isWrong = submitted && userAnswer && userAnswer !== correctAnswer;
            
            return (
              <div key={i} style={{
                backgroundColor: "white",
                padding: "28px",
                borderRadius: "16px",
                border: submitted ? (isCorrect ? "2px solid #10b981" : isWrong ? "2px solid #ef4444" : "1px solid #f0f0f0") : "1px solid #f0f0f0",
                marginBottom: "20px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
              }}>
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: "#7c3aed", marginBottom: "8px" }}>
                    Question {i + 1}
                  </div>
                  <div style={{ fontSize: "18px", fontWeight: "600", color: "#0f172a", lineHeight: "1.6" }}>
                    {q.question}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {Object.entries(q.options).map(([key, value]) => {
                    const isSelected = userAnswer === key;
                    const isCorrectOption = submitted && key === correctAnswer;
                    
                    return (
                      <button
                        key={key}
                        onClick={() => !submitted && handleAnswer(i, key)}
                        disabled={submitted}
                        style={{
                          padding: "16px",
                          borderRadius: "12px",
                          border: isCorrectOption ? "2px solid #10b981" : isSelected && isWrong ? "2px solid #ef4444" : isSelected ? "2px solid #7c3aed" : "2px solid #f0f0f0",
                          backgroundColor: isCorrectOption ? "#f0fdf4" : isSelected && isWrong ? "#fef2f2" : isSelected ? "#faf5ff" : "white",
                          cursor: submitted ? "default" : "pointer",
                          textAlign: "left",
                          transition: "all 0.2s",
                          display: "flex",
                          alignItems: "center",
                          gap: "12px"
                        }}
                      >
                        <span style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          backgroundColor: isCorrectOption ? "#10b981" : isSelected && isWrong ? "#ef4444" : isSelected ? "#7c3aed" : "#f0f0f0",
                          color: isSelected || isCorrectOption ? "white" : "#64748b",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "600",
                          fontSize: "14px",
                          flexShrink: 0
                        }}>
                          {isCorrectOption ? "✓" : key}
                        </span>
                        <span style={{ fontSize: "15px", color: "#0f172a", flex: 1 }}>
                          {value}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {submitted && (
                  <div style={{
                    marginTop: "16px",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    backgroundColor: isCorrect ? "#f0fdf4" : "#fef2f2",
                    border: isCorrect ? "1px solid #86efac" : "1px solid #fca5a5",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: isCorrect ? "#15803d" : "#dc2626"
                  }}>
                    {isCorrect ? "✓ Correct!" : `✗ Incorrect. Correct answer: ${correctAnswer}`}
                  </div>
                )}
              </div>
            );
          })
        )}

        <div style={{
          marginTop: "40px",
          padding: "24px",
          backgroundColor: "white",
          borderRadius: "16px",
          border: "1px solid #f0f0f0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          {submitted ? (
            <>
              <div>
                <div style={{ fontSize: "14px", color: "#64748b", marginBottom: "4px" }}>
                  Your Score
                </div>
                <div style={{ fontSize: "28px", fontWeight: "700", color: results.passed ? "#10b981" : "#ef4444" }}>
                  {results.score}%
                </div>
              </div>
              <button
                onClick={() => results.passed ? navigate("/dashboard") : navigate("/feynman")}
                style={{
                  background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
                  color: "white",
                  border: "none",
                  padding: "14px 32px",
                  borderRadius: "10px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  boxShadow: "0 8px 24px rgba(124, 58, 237, 0.3)"
                }}
              >
                {results.passed ? "Continue →" : "Review Explanation →"}
              </button>
            </>
          ) : (
            <>
              <div>
                <div style={{ fontSize: "14px", color: "#64748b", marginBottom: "4px" }}>
                  Progress
                </div>
                <div style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a" }}>
                  {answeredCount} of {quizQuestions.length} questions answered
                </div>
              </div>
              <button
                onClick={handleSubmit}
                disabled={answeredCount < quizQuestions.length || loading}
                aria-label="Submit quiz answers"
                style={{
                  background: answeredCount === quizQuestions.length
                    ? "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)"
                    : "#e5e7eb",
                  color: answeredCount === quizQuestions.length ? "white" : "#9ca3af",
                  border: "none",
                  padding: "14px 32px",
                  borderRadius: "10px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: answeredCount === quizQuestions.length ? "pointer" : "not-allowed",
                  transition: "all 0.3s",
                  boxShadow: answeredCount === quizQuestions.length ? "0 8px 24px rgba(124, 58, 237, 0.3)" : "none"
                }}
              >
                Submit Quiz →
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

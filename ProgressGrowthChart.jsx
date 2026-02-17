export default function ProgressGrowthChart({ quizHistory = [] }) {
  // Filter and prepare data - group by topic
  const topicData = {};
  
  quizHistory.forEach(quiz => {
    if (!topicData[quiz.topic]) {
      topicData[quiz.topic] = [];
    }
    topicData[quiz.topic].push(quiz);
  });

  // If no data, show message
  if (quizHistory.length === 0) {
    return (
      <div style={{
        backgroundColor: "white",
        padding: "32px",
        borderRadius: "16px",
        border: "1px solid #e5e7eb",
        textAlign: "center"
      }}>
        <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#0f172a", marginBottom: "12px" }}>
          📈 User Progress Growth
        </h2>
        <p style={{ color: "#64748b" }}>No quiz data available yet. Take a quiz to see your progress!</p>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: "white",
      padding: "32px",
      borderRadius: "16px",
      border: "1px solid #e5e7eb",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
      marginBottom: "40px"
    }}>
      <h2 style={{
        fontSize: "24px",
        fontWeight: "700",
        color: "#0f172a",
        marginBottom: "24px",
        textAlign: "center"
      }}>
        📈 User Progress Growth
      </h2>

      {/* Render graph for each topic */}
      {Object.entries(topicData).map(([topic, attempts]) => {
        const sortedAttempts = attempts.sort((a, b) => new Date(a.date) - new Date(b.date));
        const chartData = sortedAttempts.map((quiz, idx) => ({
          attempt: idx + 1,
          score: quiz.score
        }));

        // Calculate statistics
        const scores = chartData.map(d => d.score);
        const bestScore = Math.max(...scores);
        const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
        const improvement = scores.length > 1 
          ? Math.round(((scores[scores.length - 1] - scores[0]) / Math.max(scores[0], 1)) * 100)
          : 0;

        // Chart dimensions
        const width = 700;
        const height = 300;
        const padding = 50;
        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;

        // Scale functions
        const maxScore = 100;
        const maxAttempt = chartData.length;
        const xScale = (attempt) => padding + ((attempt - 1) / Math.max(maxAttempt - 1, 1)) * chartWidth;
        const yScale = (score) => height - padding - (score / maxScore) * chartHeight;

        // Generate line path
        const linePath = chartData.map((d, i) => 
          `${i === 0 ? 'M' : 'L'} ${xScale(d.attempt)} ${yScale(d.score)}`
        ).join(' ');

        return (
          <div key={topic} style={{ 
            marginBottom: "80px",
            paddingBottom: "60px",
            borderBottom: "3px solid #e5e7eb"
          }}>
            {/* Topic heading */}
            <h3 style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#7c3aed",
              marginBottom: "16px",
              textAlign: "center"
            }}>
              {topic}
            </h3>

            {/* Chart */}
            <div style={{ 
              display: "flex", 
              justifyContent: "center", 
              marginBottom: "24px",
              overflow: "auto"
            }}>
              <svg width={width} height={height} style={{ maxWidth: "100%" }}>
                {/* Grid lines */}
                {[0, 25, 50, 75, 100].map(score => (
                  <g key={score}>
                    <line
                      x1={padding}
                      y1={yScale(score)}
                      x2={width - padding}
                      y2={yScale(score)}
                      stroke="#f0f0f0"
                      strokeWidth="1"
                    />
                    <text
                      x={padding - 10}
                      y={yScale(score) + 5}
                      fontSize="12"
                      fill="#64748b"
                      textAnchor="end"
                    >
                      {score}%
                    </text>
                  </g>
                ))}

                {/* X-axis labels */}
                {chartData.map(d => (
                  <text
                    key={d.attempt}
                    x={xScale(d.attempt)}
                    y={height - padding + 25}
                    fontSize="12"
                    fill="#64748b"
                    textAnchor="middle"
                  >
                    #{d.attempt}
                  </text>
                ))}

                {/* Line */}
                <path
                  d={linePath}
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Gradient definition */}
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>

                {/* Data points */}
                {chartData.map(d => {
                  const x = xScale(d.attempt);
                  const y = yScale(d.score);
                  return (
                    <g key={d.attempt}>
                      <circle
                        cx={x}
                        cy={y}
                        r="6"
                        fill="#7c3aed"
                        stroke="white"
                        strokeWidth="2"
                      />
                      <text
                        x={x}
                        y={y - 15}
                        fontSize="13"
                        fontWeight="600"
                        fill="#0f172a"
                        textAnchor="middle"
                      >
                        {d.score}%
                      </text>
                    </g>
                  );
                })}

                {/* Axis labels */}
                <text
                  x={width / 2}
                  y={height - 5}
                  fontSize="13"
                  fontWeight="600"
                  fill="#64748b"
                  textAnchor="middle"
                >
                  Attempts
                </text>
                <text
                  x={15}
                  y={height / 2}
                  fontSize="13"
                  fontWeight="600"
                  fill="#64748b"
                  textAnchor="middle"
                  transform={`rotate(-90, 15, ${height / 2})`}
                >
                  Score
                </text>
              </svg>
            </div>

            {/* Statistics */}
            <div style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              flexWrap: "wrap"
            }}>
              <div style={{
                padding: "16px 24px",
                backgroundColor: "#f0fdf4",
                borderRadius: "12px",
                border: "1px solid #86efac",
                textAlign: "center"
              }}>
                <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "4px" }}>
                  Best Score
                </div>
                <div style={{ fontSize: "24px", fontWeight: "700", color: "#22c55e" }}>
                  {bestScore}%
                </div>
              </div>

              <div style={{
                padding: "16px 24px",
                backgroundColor: "#fef3c7",
                borderRadius: "12px",
                border: "1px solid #fbbf24",
                textAlign: "center"
              }}>
                <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "4px" }}>
                  Average Score
                </div>
                <div style={{ fontSize: "24px", fontWeight: "700", color: "#f59e0b" }}>
                  {avgScore}%
                </div>
              </div>

              <div style={{
                padding: "16px 24px",
                backgroundColor: "#ede9fe",
                borderRadius: "12px",
                border: "1px solid #c084fc",
                textAlign: "center"
              }}>
                <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "4px" }}>
                  Improvement
                </div>
                <div style={{ fontSize: "24px", fontWeight: "700", color: "#a855f7" }}>
                  {improvement > 0 ? '+' : ''}{improvement}%
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

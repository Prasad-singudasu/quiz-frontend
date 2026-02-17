function QuestionCard({ question, index, selectedAnswer, onAnswerSelect, submitted, correctAnswer, userAnswer }) {
  const options = Array.isArray(question.options) ? question.options : Object.values(question.options);
  
  const getBorderColor = () => {
    if (!submitted) return '#e5e7eb';
    if (userAnswer === correctAnswer) return '#86efac';
    return '#fca5a5';
  };

  return (
    <div style={{ padding: '1.5rem', marginBottom: '1.5rem', borderRadius: '16px', border: `2px solid ${getBorderColor()}`, background: '#f8fafc' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1e293b' }}>
        {index + 1}. {question.question}
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {options.map((option, i) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = submitted && option === correctAnswer;
          const isWrong = submitted && isSelected && option !== correctAnswer;

          return (
            <label key={i} style={{ display: 'flex', alignItems: 'center', padding: '1rem', borderRadius: '12px', border: `2px solid ${isCorrect ? '#86efac' : isWrong ? '#fca5a5' : '#e5e7eb'}`, background: isSelected ? '#f1f5f9' : 'white', cursor: submitted ? 'default' : 'pointer', transition: 'all 0.3s' }}>
              <input type="radio" name={`question-${index}`} value={option} checked={isSelected} onChange={() => !submitted && onAnswerSelect(option)} disabled={submitted} style={{ marginRight: '0.75rem', cursor: submitted ? 'default' : 'pointer' }} />
              <span style={{ color: isCorrect ? '#166534' : isWrong ? '#991b1b' : '#1e293b' }}>{option}</span>
            </label>
          );
        })}
      </div>

      {submitted && userAnswer !== correctAnswer && (
        <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: '12px', background: '#dcfce7', border: '2px solid #86efac' }}>
          <p style={{ color: '#166534', fontWeight: '600' }}>Correct Answer: {correctAnswer}</p>
        </div>
      )}
    </div>
  );
}

export default QuestionCard;

export default function ResultPage() {
  return (
    <div className="container">
      <h1>Learning Summary</h1>
      <p style={{ marginBottom: "30px" }}>
        You have completed the learning session.
      </p>

      <div className="card">
        <h3>Overall Progress</h3>
        <p>Completed Checkpoints: 2 / 3</p>
        <p>Final Mastery Score: <strong>78%</strong></p>
      </div>

      <div className="card">
        <h3>Checkpoint Status</h3>
        <ul style={{ lineHeight: "1.8" }}>
          <li>Introduction to DBMS – ✅ Completed</li>
          <li>ER Model – ✅ Completed</li>
          <li>Normalization – 🔒 Locked</li>
        </ul>
      </div>
    </div>
  );
}

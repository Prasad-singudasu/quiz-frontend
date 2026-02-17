export default function ExplanationCard({ title, explanation }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p style={{ marginTop: "10px" }}>{explanation}</p>
    </div>
  );
}

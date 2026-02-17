import ProgressBar from "./ProgressBar";

export default function CheckpointCard({ checkpoint }) {
  const { title, status, score } = checkpoint;

  return (
    <div className="card">
      <h3>{title}</h3>

      <p>
        Status:{" "}
        <span
          className={
            status === "completed"
              ? "status-completed"
              : status === "in_progress"
              ? "status-progress"
              : "status-locked"
          }
        >
          {status}
        </span>
      </p>

      {status !== "locked" && <ProgressBar value={score} />}
    </div>
  );
}

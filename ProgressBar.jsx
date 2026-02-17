export default function ProgressBar({ value }) {
  return (
    <div style={{ marginTop: "10px" }}>
      <div
        style={{
          height: "10px",
          background: "#e5e7eb",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${value}%`,
            height: "10px",
            background: value >= 70 ? "#16a34a" : "#ea580c",
            borderRadius: "8px",
          }}
        />
      </div>
      <small style={{ color: "#6b7280" }}>{value}% mastery</small>
    </div>
  );
}

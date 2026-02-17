export default function ShareScore({ topic, score }) {
  const shareOnTwitter = () => {
    const text = `I just scored ${score}% on ${topic} quiz! 🎓 Join me in learning with AI Learning Agent!`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'width=550,height=420');
  };

  const shareOnLinkedIn = () => {
    const url = window.location.href;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, '_blank', 'width=550,height=420');
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Quiz Score',
          text: `I scored ${score}% on ${topic}! 🎓`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      alert('Sharing not supported on this browser');
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  return (
    <div style={{ marginTop: "24px" }}>
      <div style={{ fontSize: "16px", fontWeight: "600", color: "#64748b", marginBottom: "12px" }}>
        Share your achievement:
      </div>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <button
          onClick={shareOnTwitter}
          style={{
            padding: "10px 20px",
            background: "#1DA1F2",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.3s"
          }}
          onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
          onMouseOut={(e) => e.target.style.transform = "scale(1)"}
        >
          🐦 Twitter
        </button>
        <button
          onClick={shareOnLinkedIn}
          style={{
            padding: "10px 20px",
            background: "#0077B5",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.3s"
          }}
          onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
          onMouseOut={(e) => e.target.style.transform = "scale(1)"}
        >
          💼 LinkedIn
        </button>
        <button
          onClick={shareNative}
          style={{
            padding: "10px 20px",
            background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.3s"
          }}
          onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
          onMouseOut={(e) => e.target.style.transform = "scale(1)"}
        >
          📤 Share
        </button>
        <button
          onClick={copyLink}
          style={{
            padding: "10px 20px",
            background: "#64748b",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.3s"
          }}
          onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
          onMouseOut={(e) => e.target.style.transform = "scale(1)"}
        >
          🔗 Copy Link
        </button>
      </div>
    </div>
  );
}

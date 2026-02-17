import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../hooks/useDarkMode";

export default function NotesPage() {
  const navigate = useNavigate();
  const { darkMode, setDarkMode, theme } = useDarkMode();
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedNote, setExpandedNote] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedNotes") || "[]");
    setNotes(saved);
  }, []);

  const deleteNote = (index) => {
    const updated = notes.filter((_, i) => i !== index);
    setNotes(updated);
    localStorage.setItem("savedNotes", JSON.stringify(updated));
  };

  const filteredNotes = notes.filter(note =>
    note.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", backgroundColor: theme.bg, fontFamily: "'Inter', sans-serif", transition: "background-color 0.3s" }}>
      <nav style={{ backgroundColor: theme.navBg, boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)", padding: "16px 0" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 30px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button onClick={() => navigate("/")} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", padding: "8px", color: theme.text }}>←</button>
            <div style={{ fontSize: "18px", fontWeight: "600", background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              📝 My Study Notes
            </div>
          </div>
          <button onClick={() => setDarkMode(!darkMode)} style={{ background: darkMode ? "#2d2d3d" : "#f3f4f6", border: "none", borderRadius: "20px", padding: "8px 16px", cursor: "pointer", fontSize: "18px" }}>
            {darkMode ? "🌙" : "☀️"}
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 30px" }}>
        <div style={{ marginBottom: "30px" }}>
          <input
            type="text"
            placeholder="🔍 Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 20px",
              fontSize: "15px",
              border: "2px solid #e5e7eb",
              borderRadius: "12px",
              outline: "none",
              fontFamily: "'Inter', sans-serif"
            }}
          />
        </div>

        {filteredNotes.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>📝</div>
            <h3 style={{ fontSize: "24px", fontWeight: "700", color: "#64748b", marginBottom: "8px" }}>
              {notes.length === 0 ? "No saved notes yet" : "No notes found"}
            </h3>
            <p style={{ color: "#94a3b8", marginBottom: "20px" }}>
              {notes.length === 0 ? "Save topics from the learning page to review later!" : "Try a different search term"}
            </p>
            {notes.length === 0 && (
              <button
                onClick={() => navigate("/learning")}
                style={{
                  background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
                  color: "white",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "10px",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                Start Learning
              </button>
            )}
          </div>
        ) : (
          <div style={{ display: "grid", gap: "16px" }}>
            {filteredNotes.map((note, i) => {
              const isExpanded = expandedNote === i;
              const displayContent = isExpanded ? note.content : note.content.substring(0, 200);
              
              return (
              <div
                key={i}
                style={{
                  background: theme.cardBg,
                  padding: "24px",
                  borderRadius: "16px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  border: `1px solid ${theme.border}`,
                  transition: "all 0.3s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)"}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)"}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a" }}>{note.topic}</h3>
                  <button
                    onClick={() => deleteNote(i)}
                    style={{
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      padding: "6px 14px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: "600"
                    }}
                  >
                    Delete
                  </button>
                </div>
                <p style={{ color: "#64748b", lineHeight: "1.6", marginBottom: "12px", whiteSpace: "pre-wrap" }}>
                  {displayContent}{!isExpanded && note.content.length > 200 && "..."}
                </p>
                {note.content.length > 200 && (
                  <button
                    onClick={() => setExpandedNote(isExpanded ? null : i)}
                    style={{
                      background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: "600",
                      marginBottom: "12px"
                    }}
                  >
                    {isExpanded ? "Show Less" : "Read More"}
                  </button>
                )}
                {note.personalNote && (
                  <div style={{ background: "#faf5ff", padding: "12px", borderRadius: "8px", marginTop: "12px", borderLeft: "3px solid #7c3aed" }}>
                    <div style={{ fontSize: "12px", fontWeight: "600", color: "#7c3aed", marginBottom: "4px" }}>Personal Note:</div>
                    <div style={{ fontSize: "14px", color: "#64748b" }}>{note.personalNote}</div>
                  </div>
                )}
                <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "12px" }}>
                  Saved on {new Date(note.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </div>
            );
            })}}
          </div>
        )}
      </div>
    </div>
  );
}

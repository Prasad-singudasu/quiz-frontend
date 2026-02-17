import jsPDF from 'jspdf';

export default function CertificateGenerator({ topic, score, userName }) {
  const generateCertificate = () => {
    const doc = new jsPDF('landscape');
    
    // Border
    doc.setLineWidth(10);
    doc.setDrawColor(124, 58, 237);
    doc.rect(10, 10, 277, 190);
    
    // Inner border
    doc.setLineWidth(1);
    doc.setDrawColor(168, 85, 247);
    doc.rect(15, 15, 267, 180);
    
    // Title
    doc.setFontSize(40);
    doc.setTextColor(124, 58, 237);
    doc.text('Certificate of Achievement', 148, 50, { align: 'center' });
    
    // Subtitle
    doc.setFontSize(16);
    doc.setTextColor(100, 116, 139);
    doc.text('This certifies that', 148, 75, { align: 'center' });
    
    // Name
    doc.setFontSize(32);
    doc.setTextColor(15, 23, 42);
    doc.text(userName || 'Student', 148, 100, { align: 'center' });
    
    // Achievement text
    doc.setFontSize(16);
    doc.setTextColor(100, 116, 139);
    doc.text('has successfully completed the course on', 148, 120, { align: 'center' });
    
    // Topic
    doc.setFontSize(26);
    doc.setTextColor(124, 58, 237);
    doc.text(topic, 148, 140, { align: 'center' });
    
    // Score
    doc.setFontSize(18);
    doc.setTextColor(16, 185, 129);
    doc.text(`with an outstanding score of ${score}%`, 148, 160, { align: 'center' });
    
    // Date
    doc.setFontSize(14);
    doc.setTextColor(100, 116, 139);
    doc.text(`Issued on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 148, 180, { align: 'center' });
    
    // Certificate ID
    const certId = `CERT-${Date.now().toString(36).toUpperCase()}`;
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184);
    doc.text(`Certificate ID: ${certId}`, 148, 195, { align: 'center' });
    
    // Save
    doc.save(`${topic.replace(/\s+/g, '_')}_Certificate.pdf`);
  };

  return (
    <button
      onClick={generateCertificate}
      style={{
        background: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
        color: "white",
        border: "none",
        padding: "14px 28px",
        borderRadius: "10px",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
        transition: "all 0.3s"
      }}
      onMouseOver={(e) => e.target.style.transform = "translateY(-2px)"}
      onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
    >
      🎓 Download Certificate
    </button>
  );
}

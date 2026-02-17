// Spaced Repetition Algorithm (SM-2)
export class SpacedRepetition {
  static calculateNextReview(quality, repetitions, easeFactor, interval) {
    // quality: 0-5 (0=complete blackout, 5=perfect response)
    // repetitions: number of consecutive correct responses
    // easeFactor: difficulty multiplier (1.3-2.5)
    // interval: days until next review

    let newEaseFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    if (newEaseFactor < 1.3) newEaseFactor = 1.3;

    let newRepetitions = repetitions;
    let newInterval = interval;

    if (quality < 3) {
      newRepetitions = 0;
      newInterval = 1;
    } else {
      newRepetitions += 1;
      if (newRepetitions === 1) {
        newInterval = 1;
      } else if (newRepetitions === 2) {
        newInterval = 6;
      } else {
        newInterval = Math.round(interval * newEaseFactor);
      }
    }

    return {
      repetitions: newRepetitions,
      easeFactor: newEaseFactor,
      interval: newInterval,
      nextReviewDate: new Date(Date.now() + newInterval * 24 * 60 * 60 * 1000)
    };
  }

  static getTopicsToReview() {
    const topics = JSON.parse(localStorage.getItem("spacedRepetitionTopics") || "[]");
    const today = new Date();
    
    return topics.filter(topic => {
      const reviewDate = new Date(topic.nextReviewDate);
      return reviewDate <= today;
    });
  }

  static updateTopic(topicName, score) {
    const topics = JSON.parse(localStorage.getItem("spacedRepetitionTopics") || "[]");
    const existingIndex = topics.findIndex(t => t.name === topicName);
    
    const quality = Math.floor((score / 100) * 5); // Convert score to 0-5
    
    if (existingIndex >= 0) {
      const topic = topics[existingIndex];
      const updated = this.calculateNextReview(
        quality,
        topic.repetitions,
        topic.easeFactor,
        topic.interval
      );
      
      topics[existingIndex] = {
        name: topicName,
        ...updated,
        lastReviewed: new Date()
      };
    } else {
      const newTopic = this.calculateNextReview(quality, 0, 2.5, 1);
      topics.push({
        name: topicName,
        ...newTopic,
        lastReviewed: new Date()
      });
    }
    
    localStorage.setItem("spacedRepetitionTopics", JSON.stringify(topics));
    return topics;
  }

  static getReviewSchedule() {
    const topics = JSON.parse(localStorage.getItem("spacedRepetitionTopics") || "[]");
    return topics.sort((a, b) => new Date(a.nextReviewDate) - new Date(b.nextReviewDate));
  }
}

export default function ReviewReminder() {
  const topicsToReview = SpacedRepetition.getTopicsToReview();

  if (topicsToReview.length === 0) return null;

  return (
    <div style={{
      background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
      padding: "16px 20px",
      borderRadius: "12px",
      color: "white",
      marginBottom: "20px",
      boxShadow: "0 4px 12px rgba(251, 191, 36, 0.3)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ fontSize: "32px" }}>🔔</div>
        <div>
          <div style={{ fontSize: "16px", fontWeight: "700", marginBottom: "4px" }}>
            Time to Review!
          </div>
          <div style={{ fontSize: "14px", opacity: 0.9 }}>
            {topicsToReview.length} topic{topicsToReview.length > 1 ? 's' : ''} ready for review
          </div>
        </div>
      </div>
      <div style={{ marginTop: "12px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {topicsToReview.map((topic, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.2)",
            padding: "6px 12px",
            borderRadius: "6px",
            fontSize: "13px",
            fontWeight: "600"
          }}>
            {topic.name}
          </div>
        ))}
      </div>
    </div>
  );
}

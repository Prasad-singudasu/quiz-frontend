import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressGrowthChart from '../components/ProgressGrowthChart';
import StreakTracker from '../components/StreakTracker';

function Dashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/user-activity');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '60px', height: '60px', border: '6px solid #e5e7eb', borderTop: '6px solid #7c3aed', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Navigation Bar */}
      <nav style={{
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        padding: '16px 0',
        marginBottom: '2rem'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ 
            fontSize: '20px', 
            fontWeight: '700',
            background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            ⚡ AI Learning Agent
          </div>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'white',
              color: '#7c3aed',
              border: '2px solid #e9d5ff',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s',
              transform: 'scale(1)'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#faf5ff';
              e.target.style.borderColor = '#d8b4fe';
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.2)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.borderColor = '#e9d5ff';
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Home
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem 2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem', background: 'linear-gradient(to right, #7c3aed, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Your Learning Dashboard
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          <div style={{ background: 'white', borderRadius: '24px', padding: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Progress Growth</h2>
            <ProgressGrowthChart quizHistory={data.quiz_history} />
          </div>

          <div>
            <div style={{ marginBottom: '2rem' }}>
              <StreakTracker />
            </div>
            <div style={{ background: 'white', borderRadius: '24px', padding: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Quiz History</h2>
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {data.quiz_history.map((quiz) => (
                  <div key={quiz.id} style={{ padding: '1rem', marginBottom: '1rem', borderRadius: '12px', background: '#f8fafc', border: `2px solid ${quiz.passed ? '#86efac' : '#fca5a5'}` }}>
                    <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{quiz.topic}</h3>
                    <p style={{ fontSize: '0.875rem', color: '#64748b' }}>{quiz.date} at {quiz.time}</p>
                    <p style={{ fontSize: '1.125rem', fontWeight: 'bold', color: quiz.passed ? '#16a34a' : '#dc2626', marginTop: '0.5rem' }}>
                      {quiz.score}% - {quiz.passed ? 'Passed ✓' : 'Failed ✗'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button onClick={() => navigate('/learning')} style={{ marginTop: '2rem', padding: '1rem 2rem', fontSize: '1.125rem', borderRadius: '12px', border: 'none', background: 'linear-gradient(to right, #7c3aed, #ec4899)', color: 'white', cursor: 'pointer', fontWeight: '600' }}>
          Start New Topic 🚀
        </button>
      </div>
    </div>
  );
}

export default Dashboard;

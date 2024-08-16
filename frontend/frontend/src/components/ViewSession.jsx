import React, { useEffect, useState } from 'react';

function ViewSession() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch('http://127.0.0.1:8000/api/sessions/', {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch sessions');
        }

        const data = await response.json();
        setSessions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  if (loading) {
    return <p style={styles.loading}>Loading sessions...</p>;
  }

  if (error) {
    return <p style={styles.error}>Error loading sessions: {error}</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>View Sessions</h2>
      {sessions.length > 0 ? (
        <ul style={styles.list}>
          {sessions.map((session) => (
            <li key={session.id} style={styles.listItem}>
              <h3 style={styles.title}>{session.title}</h3>
              <p style={styles.detail}><strong>Start Time:</strong> {session.start_time}</p>
              <p style={styles.detail}><strong>End Time:</strong> {session.end_time}</p>
              {/* Add more session details as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p style={styles.noSessions}>No sessions available</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  heading: {
    fontSize: '24px',
    color: '#343a40',
    textAlign: 'center',
    marginBottom: '20px',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
  },
  listItem: {
    backgroundColor: '#ffffff',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '5px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '18px',
    color: '#007bff',
    marginBottom: '10px',
  },
  detail: {
    fontSize: '16px',
    color: '#495057',
    margin: '5px 0',
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#6c757d',
  },
  error: {
    textAlign: 'center',
    fontSize: '18px',
    color: 'red',
  },
  noSessions: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#6c757d',
  },
};

export default ViewSession;

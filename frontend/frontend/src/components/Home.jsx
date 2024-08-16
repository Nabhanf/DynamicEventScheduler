import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [events, setEvents] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [errorEvents, setErrorEvents] = useState(null);
  const [errorSessions, setErrorSessions] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://127.0.0.1:8000/api/events/', {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setErrorEvents(error.message);
      } finally {
        setLoadingEvents(false);
      }
    };

    const fetchSessions = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://127.0.0.1:8000/api/sessions/', {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch sessions');
        const data = await response.json();
        setSessions(data);
      } catch (error) {
        setErrorSessions(error.message);
      } finally {
        setLoadingSessions(false);
      }
    };

    fetchEvents();
    fetchSessions();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Welcome to the Event Scheduler</h2>

      <section style={styles.section}>
        <h3>Event List</h3>
        {loadingEvents ? (
          <p>Loading events...</p>
        ) : errorEvents ? (
          <p style={styles.error}>Error: {errorEvents}</p>
        ) : events.length > 0 ? (
          <ul style={styles.list}>
            {events.map(event => (
              <li key={event.id} style={styles.listItem}>
                <h4 style={styles.eventTitle}>{event.title}</h4>
                <p>{event.date}</p>
                <p>{event.location}</p>
                <p>{event.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No events available</p>
        )}
      </section>

      <section style={styles.section}>
        <h3>Session List</h3>
        {loadingSessions ? (
          <p>Loading sessions...</p>
        ) : errorSessions ? (
          <p style={styles.error}>Error: {errorSessions}</p>
        ) : sessions.length > 0 ? (
          <ul style={styles.list}>
            {sessions.map(session => (
              <li key={session.id} style={styles.listItem}>
                <h4 style={styles.sessionTitle}>{session.title}</h4>
                <p>{session.date}</p>
                <p>{session.location}</p>
                <p>{session.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No sessions available</p>
        )}
      </section>

      <div style={styles.linkContainer}>
        <Link to="/create-event" style={styles.link}>Create Event</Link>
        <Link to="/view-event" style={styles.link}>View Event</Link>
        <Link to="/create-session" style={styles.link}>Create Session</Link>
        <Link to="/view-session" style={styles.link}>View Session</Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  heading: {
    fontSize: '32px',
    marginBottom: '20px',
  },
  section: {
    marginBottom: '30px',
    textAlign: 'left',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
  },
  listItem: {
    marginBottom: '15px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  eventTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  sessionTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  linkContainer: {
    marginTop: '20px',
  },
  link: {
    display: 'block',
    margin: '10px 0',
    fontSize: '18px',
    color: '#007bff',
    textDecoration: 'none',
  },
  error: {
    color: 'red',
  },
};

export default Home;

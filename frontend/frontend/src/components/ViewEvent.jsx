import React, { useEffect, useState } from 'react';

function ViewEvent() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('token'); // Assume the user is authenticated and token is stored in localStorage.

      try {
        const response = await fetch('http://127.0.0.1:8000/api/events/', {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const styles = {
    container: {
      padding: '20px',
      maxWidth: '800px',
      margin: 'auto',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      textAlign: 'center',
      color: '#333',
    },
    list: {
      listStyleType: 'none',
      padding: '0',
    },
    listItem: {
      padding: '15px',
      borderBottom: '1px solid #ddd',
    },
    eventTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
    },
    eventDate: {
      fontSize: '14px',
      color: '#666',
    },
    eventDescription: {
      fontSize: '16px',
      color: '#444',
    },
    loading: {
      textAlign: 'center',
      fontSize: '18px',
    },
    error: {
      textAlign: 'center',
      color: 'red',
      fontSize: '18px',
    },
    eventTitleHeader: {
      fontSize: '22px',
      fontWeight: 'bold',
      margin: '20px 0',
      color: '#333',
    },
  };

  if (loading) {
    return <p style={styles.loading}>Loading events...</p>;
  }

  if (error) {
    return <p style={styles.error}>Error loading events: {error}</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>View Events</h2>
      {events.length > 0 ? (
        <>
          <h3 style={styles.eventTitleHeader}>Events List</h3>
          <ul style={styles.list}>
            {events.map((event) => (
              <li key={event.id} style={styles.listItem}>
                <h3 style={styles.eventTitle}>{event.title}</h3>
                <p style={styles.eventDate}>Date: {event.date}</p>
                <p style={styles.eventDescription}>Description: {event.description}</p>
                {/* Add more event details as needed */}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p style={styles.eventDescription}>No events available</p>
      )}
    </div>
  );
}

export default ViewEvent;

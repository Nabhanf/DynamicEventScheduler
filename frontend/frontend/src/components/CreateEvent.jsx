import React, { useState, useEffect } from 'react';

function CreateEvent() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);
  const [editingEventId, setEditingEventId] = useState(null);

  const fetchEvents = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://127.0.0.1:8000/api/events/', {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        setError('Failed to fetch events.');
      }
    } catch (error) {
      setError('Something went wrong while fetching events!');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = editingEventId 
      ? `http://127.0.0.1:8000/api/events/${editingEventId}/`
      : 'http://127.0.0.1:8000/api/events/';

    const method = editingEventId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, date, description, location }),
      });

      if (response.ok) {
        alert(editingEventId ? 'Event updated successfully!' : 'Event created successfully!');
        fetchEvents();
        setTitle('');
        setDate('');
        setDescription('');
        setLocation('');
        setEditingEventId(null);
      } else {
        const data = await response.json();
        setError(data.msg || 'Failed to create or update event.');
      }
    } catch (error) {
      setError('Something went wrong!');
    }
  };

  const handleEdit = (event) => {
    setEditingEventId(event.id);
    setTitle(event.title);
    setDate(event.date);
    setDescription(event.description);
    setLocation(event.location);
  };

  const handleDelete = async (eventId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/events/${eventId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      if (response.ok) {
        alert('Event deleted successfully!');
        fetchEvents();
      } else {
        setError('Failed to delete event.');
      }
    } catch (error) {
      setError('Something went wrong!');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Event List</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Title</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Date</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Location</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{event.title}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{event.date}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{event.location}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button 
                  onClick={() => handleEdit(event)} 
                  style={{ marginRight: '10px', padding: '5px 10px', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(event.id)} 
                  style={{ padding: '5px 10px', borderRadius: '4px', backgroundColor: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ textAlign: 'center', color: '#333' }}>{editingEventId ? 'Edit Event' : 'Create Event'}</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} 
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Date:</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} 
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Description:</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', minHeight: '100px' }} 
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Location:</label>
          <input 
            type="text" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} 
          />
        </div>
        <button 
          type="submit" 
          style={{ padding: '10px 20px', borderRadius: '4px', backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          {editingEventId ? 'Update Event' : 'Create Event'}
        </button>
      </form>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </div>
  );
}

export default CreateEvent;

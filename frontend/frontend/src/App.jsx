import React, { useState } from 'react';
import { Route, Routes, Link, Navigate, useNavigate, useLocation } from 'react-router-dom'; 
import CreateEvent from './components/CreateEvent';
import ViewEvent from './components/ViewEvent';
import CreateSession from './components/CreateSession';
import ViewSession from './components/ViewSession';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem('token')));
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/home'); // Redirect to Home page after login
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setIsAuthenticated(false); 
    navigate('/login'); 
  };

  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';
  const isHomePage = location.pathname === '/home';

  return (
    <div>
      {!isLoginPage && !isRegisterPage && (
        <nav style={styles.navbar}>
          <h1 style={styles.title}>Event Scheduler</h1>
          <div style={styles.navLinks}>
            <Link style={styles.link} to="/home">Home</Link> {/* Navigate to Home page */}
            {isAuthenticated ? (
              <>
                <Link style={styles.link} to="/create-event">Create Event</Link>
                <Link style={styles.link} to="/create-session">Create Session</Link>
                <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link style={styles.link} to="/login">Login</Link>
                <Link style={styles.link} to="/register">Register</Link>
              </>
            )}
          </div>
        </nav>
      )}

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {!isLoginPage && !isRegisterPage && !isHomePage && isAuthenticated && (
          <div style={styles.sidebar}>
            <Link style={styles.sidebarLink} to="/create-event">Create Event</Link>
            <Link style={styles.sidebarLink} to="/view-event">View Event</Link>
            <Link style={styles.sidebarLink} to="/create-session">Create Session</Link>
            <Link style={styles.sidebarLink} to="/view-session">View Session</Link>
          </div>
        )}

        <div style={styles.page}>
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} /> {/* Ensure Home route is correctly defined */}
            <Route
              path="/create-event"
              element={isAuthenticated ? <CreateEvent /> : <Navigate to="/login" />}
            />
            <Route
              path="/view-event"
              element={isAuthenticated ? <ViewEvent /> : <Navigate to="/login" />}
            />
            <Route
              path="/create-session"
              element={isAuthenticated ? <CreateSession /> : <Navigate to="/login" />}
            />
            <Route
              path="/view-session"
              element={isAuthenticated ? <ViewSession /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    backgroundColor: '#343a40',
    color: '#fff',
  },
  title: {
    margin: 0,
    fontSize: '24px',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    marginLeft: '20px',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
  },
  logoutButton: {
    marginLeft: '20px',
    padding: '5px 10px',
    backgroundColor: '#ff4757',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  sidebar: {
    width: '200px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRight: '1px solid #ddd',
  },
  sidebarLink: {
    display: 'block',
    marginBottom: '10px',
    color: '#343a40',
    textDecoration: 'none',
    fontSize: '16px',
  },
  page: {
    flex: 1,
    padding: '20px',
  },
};

export default App;

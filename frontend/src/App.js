import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import Chat from './components/Chat';
import './styles.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const setAuthToken = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div className="app">
        <header>
          <div className="logo">YA BRO</div>
          {token && <button onClick={logout}>Выйти</button>}
        </header>
        <Routes>
          <Route path="/login" element={token ? <Navigate to="/files" /> : <Login setToken={setAuthToken} />} />
          <Route path="/register" element={token ? <Navigate to="/files" /> : <Register setToken={setAuthToken} />} />
          <Route path="/files" element={token ? <><FileUpload token={token} /><FileList token={token} /></> : <Navigate to="/login" />} />
          <Route path="/chat" element={token ? <Chat token={token} /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={token ? "/files" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
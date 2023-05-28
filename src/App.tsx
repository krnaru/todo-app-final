import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/main/Login';
import Register from './components/main/Register';
import TodoCategories from './components/TodoCategories';
import NavBar from './components/main/NavBar';
import Home from './Home';
import { LoginData } from './api/api';
import ListItems from './components/ListItems';
import TodoTasks from './components/TodoTasks';
import TodoPriorities from './components/TodoPriorities';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [bearerToken, setBearerToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const navigate = useNavigate();

  const handleLogin = (data: LoginData) => {
    setIsLoggedIn(true);
    setBearerToken(data.token);
    setRefreshToken(data.refreshToken);
    navigate('/Home');
  };

  return (
    <>
    <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      {isLoggedIn ? (
        <Routes>
          <Route path="/TodoCategories" element={<TodoCategories token={bearerToken} />} />
          <Route path="/TodoPriorities" element={<TodoPriorities token={bearerToken} />} />
          <Route path="/ListItems" element={<ListItems token={bearerToken} />} />
          <Route path="/TodoTasks" element={<TodoTasks token={bearerToken} />} />
          <Route path="/Home" element={<Home/>} />
        </Routes>
      ) : isRegistering ? (
        <Register onRegister={handleLogin} onSwitchToLogin={() => setIsRegistering(false)} />
      ) : (
        <Login onLogin={handleLogin} onSwitchToRegister={() => setIsRegistering(true)} />
      )}
    </>
  );
};

export default App;

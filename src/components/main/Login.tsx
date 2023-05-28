import React, { useState } from 'react';
import { LoginData, loginRequest } from '../../api/api';
import styles from './Login.module.css';

interface LoginProps {
    onLogin: (data: LoginData) => void;
    onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
      const data = await loginRequest(email, password);
      onLogin(data);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError('Login failed. Please check your email and password.');
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2 className={styles.formTitle}>Login</h2>
        <input
          className={styles.formInput}
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          className={styles.formInput}
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button className={styles.submitButton} type="submit">
          Login
        </button>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <br></br>
        <button className={styles.submitButton} onClick={onSwitchToRegister}>Register</button>
      </form>
    </div>
  );
};

export default Login;

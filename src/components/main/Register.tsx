import React, { useState } from 'react';
import { LoginData, registerRequest } from '../../api/api';
import styles from './Login.module.css';
import axios from 'axios';

interface RegisterProps {
  onRegister: (data: LoginData) => void;
  onSwitchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (!/\W/.test(password)) {
      setError('Password must contain at least one non-alphanumeric character.');
      return;
    }
    if (!/\d/.test(password)) {
      setError('Password must contain at least one digit.');
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError('Password must contain at least one uppercase letter.');
      return;
    }
    try {
      const data = await registerRequest(email, password, firstName, lastName);
      onRegister(data);
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.messages[0]);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2 className={styles.formTitle}>Register</h2>
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
        <ul className={styles.listContainer}>
          <li className={styles.listItem}>Passwords must be at least 6 characters.</li>
          <li className={styles.listItem}>Passwords must have at least one non alphanumeric character.</li>
          <li className={styles.listItem}>Passwords must have at least one digit ('0'-'9').</li>
          <li className={styles.listItem}>Passwords must have at least one uppercase ('A'-'Z').</li>
        </ul>
        <input
          className={styles.formInput}
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          required
        />
        <input
          className={styles.formInput}
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          required
        />
        <button className={styles.submitButton} type="submit">
          Register
        </button>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <br></br>
        <button className={styles.submitButton} onClick={onSwitchToLogin}>Login</button>
      </form>
    </div>
  );
};

export default Register;

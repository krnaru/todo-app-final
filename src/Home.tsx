import React from 'react';
import styles from './Home.module.css';

const NavBar: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1>Welcome to our Todo Application!</h1>
            <p>This application allows you to manage Lists, Categories, Priorities and Tasks effectively and efficiently.</p>
        </div>
    );
};

  export default NavBar;
  
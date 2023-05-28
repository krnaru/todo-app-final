// src/components/NavBar.tsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css'; 

interface NavBarProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar: React.FC<NavBarProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  const history = useNavigate();

  const handleLogout = () => {
    const confirmation = window.confirm("Are you sure you want to logout?");
    if (confirmation) {
      setIsLoggedIn(false);
      history("/")
    }
  };
  return (
    <header className={styles.navBar}>
      <div className={styles.logo}>
        <h1>React Todo app</h1>
      </div>
      <nav className={styles.navLinks}>
        {isLoggedIn ? (
          <>
            <Link to="/ListItems">List Items</Link>
            <Link to="/TodoCategories">Todo Categories</Link>
            <Link to="/TodoPriorities">Todo Priorities</Link>
            <Link to="/TodoTasks">Todo Tasks</Link>
            {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
          </>
        ) : (<></>)}
      </nav>
    </header>
  );
};

export default NavBar;

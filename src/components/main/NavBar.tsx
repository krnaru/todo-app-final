// src/components/NavBar.tsx
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css'; 

interface NavBarProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar: React.FC<NavBarProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  const history = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Element)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    const confirmation = window.confirm("Are you sure you want to logout?");
    if (confirmation) {
      setIsLoggedIn(false);
      history("/")
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.navBar}>
      <div className={styles.logo}>
        <h1>React Todo app</h1>
      </div>
      {isLoggedIn && 
      <>
        <button onClick={toggleMenu} className={styles.burgerButton}>
          &#9776;
        </button>
        <nav ref={navRef} className={`${styles.navLinks} ${menuOpen ? styles.open : styles.hidden}`}>
            <Link onClick={toggleMenu} to="/ListItems">List Items</Link>
            <Link onClick={toggleMenu} to="/TodoCategories">Todo Categories</Link>
            <Link onClick={toggleMenu} to="/TodoPriorities">Todo Priorities</Link>
            <Link onClick={toggleMenu} to="/TodoTasks">Todo Tasks</Link>
            <button onClick={handleLogout}>Logout</button>
        </nav>
      </>
      }
    </header>
  );
};

export default NavBar;

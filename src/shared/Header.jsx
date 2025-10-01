import { NavLink } from 'react-router';
import styles from './Header.module.css';

function Header({ title }) {
  return (
    <>
      <h1 className={styles.h1}>{title}</h1>
      <nav className={styles.nav}>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
          to={'/'}
          end
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
          to={'/about'}
          end
        >
          About
        </NavLink>
      </nav>
    </>
  );
}

export default Header;

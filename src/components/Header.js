import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className={styles.header}>
        <Link to="/react-movie-app/">Movies</Link>
      </div>
    </header>
  );
};

export default Header;

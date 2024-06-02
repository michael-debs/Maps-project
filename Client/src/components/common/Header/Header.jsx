import PropTypes from 'prop-types';
import styles from './Header.module.css';
import GoBackButton from '../GoBackButton/GoBackButton';

const Header = ({ destinationPath }) => {
  return (
    <div className={styles.header}>
      <GoBackButton destinationPath={destinationPath} />
    </div>
  );
};

Header.propTypes = {
  destinationPath: PropTypes.string,
};

export default Header;

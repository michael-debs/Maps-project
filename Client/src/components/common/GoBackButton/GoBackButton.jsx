import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './GoBackButton.module.css';
import whiteArrow from '../../../assets/images/whiteArrow.png';

const GoBackButton = ({ destinationPath }) => {
  const navigate = useNavigate();

  const goBack = () => {
    if (destinationPath) {
      navigate(destinationPath);
    } else {
      navigate(-1);
    }

  return (
    <button className={styles.button} onClick={goBack}>
        <img src={whiteArrow} className={styles.picture}/>
        Go Back
    </button>
  );
};

GoBackButton.propTypes = {
  destinationPath: PropTypes.string,
};
export default GoBackButton;

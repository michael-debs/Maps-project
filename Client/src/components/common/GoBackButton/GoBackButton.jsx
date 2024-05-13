import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './GoBackButton.module.css';
import whiteArrow from '../../../assets/images/whiteArrow.png';

const GoBackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    if (location.pathname.includes('edit')) {
      navigate(-1);
    } else if (location.pathname.includes('user')) {
      navigate('/');
    }
  };

  return (
    <button className={styles.button} onClick={goBack}>
      <img src={whiteArrow} className={styles.picture} alt="Back" />
      Go Back
    </button>
  );
};

export default GoBackButton;
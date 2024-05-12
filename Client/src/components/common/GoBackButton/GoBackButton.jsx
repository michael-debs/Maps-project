import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './GoBackButton.module.css';
import whiteArrow  from '../../../assets/images/whiteArrow.png'

const GoBackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); 
  };

  return (
    <button className={styles.button} onClick={goBack}>
        <img src={whiteArrow} className={styles.picture}/>
     <p className='styles.txt'> Go Back</p>
    </button>
  );
};

export default GoBackButton;

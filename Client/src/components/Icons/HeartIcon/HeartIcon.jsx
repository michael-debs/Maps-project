// HeartIcon.jsx
import React, { useState, useEffect } from 'react';
import styles from './HeartIcon.module.css';

function HeartIcon({ initialIsLiked, initialLikeCount, onLike }) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  useEffect(() => {
    setIsLiked(initialIsLiked);
    setLikeCount(initialLikeCount);
  }, [initialIsLiked, initialLikeCount]);

  const handleLikeClick = () => {
    const newIsLiked = !isLiked;
    const newLikeCount = likeCount + (isLiked ? -1 : 1);
    setIsLiked(newIsLiked);
    setLikeCount(newLikeCount);
    onLike(newIsLiked, newLikeCount);
  };

  return (
    <div className={styles.likeContainer} onClick={handleLikeClick}>
      <span className={styles.likeCount}>{likeCount}</span>
      <svg
        fill={isLiked ? "red" : "#000000"}
        width="35px"
        height="35px"
        viewBox="0 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.heartIcon}
      >
        <path d="M23.6,4.9c-1.7,0-3.3,0.7-4.6,1.9L16,9.1l-3-2.4C11.7,5.6,10.1,4.9,8.4,4.9C5.4,4.9,3,7.3,3,10.3c0,2.3,1.1,4.6,2.8,6.2 l9.6,9.6c0.2,0.2,0.5,0.3,0.8,0.3s0.6-0.1,0.8-0.3l9.6-9.6c1.7-1.6,2.8-3.9,2.8-6.2C29,7.3,26.6,4.9,23.6,4.9z"></path>
      </svg>
    </div>
  );
}

export default HeartIcon;

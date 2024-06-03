import React from 'react';
import { Link } from 'react-router-dom';
import defaultActivity from '../../../../assets/images/defaultActivity.png';
import styles from './UserPosts.module.css'; // You can create a separate CSS file for styling
import HeartIcon from '../../../../components/Icons/HeartIcon/HeartIcon';

const UserPosts = ({ posts }) => {
  if (!posts) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        {posts.map(post => (
          <Link key={post.id} to={`/posts/${post.id}`} className={styles.postLink}>
            <div className={styles.post}>
              <header className={styles.header}>
                <div className={styles.picandname}>
                  <img className={styles.Picture} src={post.activity?.profile || defaultActivity} alt="Activity" />
                  <div className={styles.Name}>
                    <div className={styles.ActivityName}>{post.activity?.name || 'Unknown Activity'}</div>
                    <div className={styles.UserName}>{post.user ? `${post.user.firstName} ${post.user.lastName}` : 'Unknown User'}</div>
                  </div>
                </div>
              </header>

              <section className={styles.titleSection}>
                <h2 className={styles.title}>{post.title}</h2>
              </section>
              <section className={styles.contentSection}>
                <p className={styles.content}>{post.content}</p>
              </section>

              <section className={styles.likesComments}>
                <HeartIcon initialIsLiked={post.isLiked} initialLikeCount={post.likes} />
              </section>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserPosts;

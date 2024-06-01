import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import usePost from "../../hooks/usePost";
import defaultActivity from "../../assets/images/defaultActivity.png";
import styles from "./PostPage.module.css";
import HeartIcon from "../../components/Icons/HeartIcon/HeartIcon";

function PostPage() {
  const { id } = useParams();
  const { post } = usePost(id);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (post) {
      setIsLiked(post.isLiked); // Assuming `post.isLiked` exists in your post object
      setLikeCount(post.likes);
    }
  }, [post]);

  const handleLikeUpdate = (newIsLiked, newLikeCount) => {
    setIsLiked(newIsLiked);
    setLikeCount(newLikeCount);
    // Perform any additional actions, such as updating the backend
  };

  if (!post) {
    return <div>No post found</div>;
  }

  const activityProfile = post.activity?.profile || defaultActivity;
  const activityName = post.activity?.name || "Unknown Activity";
  const userName = post.user
    ? `${post.user.firstName} ${post.user.lastName}`
    : "Unknown User";

  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString()
    : "Unknown Date";
    
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.picandname}>
            <img
              className={styles.Picture}
              src={activityProfile}
              alt="Activity"
            />
            <div className={styles.Name}>
              <div className={styles.ActivityName}>{activityName}</div>
              <div className={styles.UserName}>{userName}</div>
            </div>
          </div>
          <div className={styles.datePosted}>{formattedDate}</div>
        </header>

        <section className={styles.titleSection}>
          <h2 className={styles.title}>{post.title}</h2>
        </section>
        <section className={styles.contentSection}>
          <p className={styles.content}>{post.content}</p>
        </section>

        <section className={styles.likesComments}>
          <HeartIcon
            initialIsLiked={isLiked}
            initialLikeCount={likeCount}
            onLike={handleLikeUpdate}
          />
        </section>
      </div>
    </div>
  );
}

export default PostPage;

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import usePost from "../../hooks/usePost";
import defaultActivity from "../../assets/images/defaultActivity.png";
import styles from "./PostPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function PostPage() {
  const { id } = useParams();
  const { post } = usePost(id);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (post) {
      setLikeCount(post.likes);
    }
  }, [post]);

  const handleLikeClick = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
    setLikeCount((prevLikeCount) => prevLikeCount + (isLiked ? -1 : 1));
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

  console.log({ post });

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
          <p className={styles.likes}>
            {likeCount}
            <FontAwesomeIcon
              icon={faHeart}
              className={`${styles.likeIcon} ${isLiked ? styles.liked : ""}`}
              onClick={handleLikeClick}
              size="2x"
            />
          </p>
        </section>
      </div>
    </div>
  );
}

export default PostPage;

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import usePosts from "../../hooks/usePosts";
import defaultActivity from "../../assets/images/defaultActivity.png";
import styles from "./PostPage.module.css";
import HeartIcon from "../../components/Icons/HeartIcon/HeartIcon";
import Header from "../../components/Header/Header"

function PostPage() {
  const { id } = useParams();
  const { posts } = usePosts(id);
  const [post, setPost] = useState(null);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (posts) {
      setPost(posts[0]);
      setIsLiked(posts[0].isLiked); // Assuming `post.isLiked` exists in your post object
      setLikeCount(posts[0].likes);
    }
  }, [posts]);

  const handleLikeUpdate = (newIsLiked, newLikeCount) => {
    setIsLiked(newIsLiked);
    setLikeCount(newLikeCount);
    // Perform any additional actions, such as updating the backend
  };

  if (!post) {
    return <div>Loading...</div>;
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
      <Header />
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

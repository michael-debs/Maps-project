import React, { useRef } from 'react';
import styles from "./Profile.module.css";
import UserProfileHeader from "./components/ProfileHeader/UserProfileHeader";
import { useParams } from "react-router-dom";
import useUser from "../../hooks/useUser.js";
import Header from "../../components/Header/Header.jsx";
import UserPosts from "../ProfilePage/components/UserPosts/UserPosts.jsx";

const ProfilePage = () => {
  const { id } = useParams();
  const { user, userPosts } = useUser(id); // Get userPosts from useUser hook
  const postsRef = useRef(null);
  const activitiesRef = useRef(null);

  if (!user) {
    return <h1>loading...</h1>;
  }

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className={styles.container}>
      <div className={styles.body}>
        <Header destinationPath="/" />
        <UserProfileHeader user={user} />
        
        <div className={styles.navButtons}>
          <button onClick={() => scrollToSection(postsRef)}>My Posts</button>
          <button onClick={() => scrollToSection(activitiesRef)}>Followed Activities</button>
        </div>
        
        <section ref={postsRef} className={styles.postsSection}>
          <UserPosts posts={userPosts} /> {/* Pass userPosts to UserPosts component */}
        </section>

        <section ref={activitiesRef} className={styles.activitiesSection}>
          {/* Add your Followed Activities component here */}
          <div>Followed Activities will be displayed here</div>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;

import styles from "./Profile.module.css";
import ProfileHeader from "./components/ProfileHeader";
import ProfilePosts from "./components/ProfilePosts";
import ProfileTabs from "./components/ProfileTabs";

const ProfilePage = () => {
  return <main className={styles.container}>
    ProfilePage
    <div className={styles.header}>
      <ProfileHeader />

    </div>
    <div className={styles.body}>
      <ProfileTabs />
      <ProfilePosts />
    </div>
  </main>
};
export default ProfilePage
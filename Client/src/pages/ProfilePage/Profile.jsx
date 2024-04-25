import styles from "./Profile.module.css";
import ProfileHeader from "./components/ProfileH/ProfileHeader";
import { useParams } from "react-router-dom";
import useUser from "../../hooks/useUser";

const ProfilePage = () => {
  const { id } = useParams();
  const user = useUser(id);
  if (!user) {
    return <h1>loading...</h1>;
  }
  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <ProfileHeader user={user} />
      </div>
    </main>
  );
};
export default ProfilePage;

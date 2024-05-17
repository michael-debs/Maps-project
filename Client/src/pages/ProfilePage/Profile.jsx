import styles from "./Profile.module.css";
import UserProfileHeader from "./components/ProfileHeader/UserProfileHeader";
import { useParams } from "react-router-dom";
import useUser from "../../hooks/useUser.js";
import Header from "../../components/common/Header/Header.jsx";

const ProfilePage = () => {
  const { id } = useParams();
  const { user } = useUser(id);
  if (!user) {
    return <h1>loading...</h1>;
  }
  return (
    <main className={styles.container}>
      <div className={styles.body}>
      <Header destinationPath="/" />
        <UserProfileHeader user={user} />
      </div>
    </main>
  );
};
export default ProfilePage;

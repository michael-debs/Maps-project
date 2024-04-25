import styles from "./ProfileHeader.module.css";
import profile from "./profile.png";
import edit from "./edit.png";

function ProfileHeader({ user }) {
  return (
    <div className={styles.container}>
      <img className={styles.picture} src={profile} />
      <div className={styles.info}>
        <div className={styles.name}>
          {user.firstName} {user.lastName}
        </div>
        <div className={styles.username}>{user.username}</div>
        <div className={styles.bio}>{user.bio}</div>
      </div>
      <div className={styles.editProfile}>
        <div className={styles.editText}>Edit Profile</div>
        <img className={styles.editIcon} src={edit} alt="Edit Icon" />
      </div>
    </div>
  );
}

export default ProfileHeader;

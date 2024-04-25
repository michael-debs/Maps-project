import styles from "./ProfileHeader.module.css";
import profile from "./profile.png";
import edit from "./edit.png";
import PropTypes from "prop-types";
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

ProfileHeader.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    bio: PropTypes.string,
    profilePicture: PropTypes.string,
  }),
};

export default ProfileHeader;

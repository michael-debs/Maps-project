import { userPropTypes } from "../../../../constants/PropTypes";
import styles from "./UserProfile.module.css";
import defaultProfile from "../../../../assets/images/defaultProfile.png";
import { Link } from "react-router-dom";

function UserProfile({ user }) {
  return (
    <Link to={`/user/${user.id}`}>
      <div className={styles.container}>
        <img
          src={user.profilePicture ? user.profilePicture : defaultProfile}
          alt="profile picture"
          className={styles.profilePicture}
        />
        <span className={styles.name}>
          <span>{user.firstName}</span>
          <span>{user.lastName}</span>
        </span>
      </div>
    </Link>
  );
}

UserProfile.propTypes = userPropTypes;

export default UserProfile;

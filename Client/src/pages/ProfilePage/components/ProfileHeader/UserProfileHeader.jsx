import { Link } from "react-router-dom";
import styles from "./UserProfileHeader.module.css";
import defaultProfile from "../../../../assets/images/defaultProfile.png";
import editPencil from "../../../../assets/images/editPencil.png";
import PropTypes from "prop-types";
import { useAuth } from "../../../../contexts/AuthContext";

function UserProfileHeader({ user }) {
  const { isAuthenticated, user: authenticatedUser } = useAuth();
  console.log("Is Authenticated:", isAuthenticated);

  const renderBio = () => {
    return user.bio ? user.bio : <i>No bio</i>;
  };

  const renderEditProfileLink = () => {
    return (
      <Link to={`/user/${user.id}/edit`} className={styles.editProfile}>
        <div className={styles.editText}>Edit Profile</div>
        <img className={styles.editIcon} src={editPencil} alt="Edit Icon" />
      </Link>
    );
  };

  return (
    <div className={styles.container}>
      <img
        className={styles.picture}
        src={user.profilePicture || defaultProfile}
        alt="Profile"
      />
      <div className={styles.info}>
        <div className={styles.name}>
          {user.firstName} {user.lastName}
        </div>
        <div className={styles.bio}>{renderBio()}</div>
      </div>
      {isAuthenticated &&
        authenticatedUser.id == user.id &&
        renderEditProfileLink()}
    </div>
  );
}

UserProfileHeader.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    bio: PropTypes.string,
    profilePicture: PropTypes.string,
  }),
};

export default UserProfileHeader;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../../services/UserService";
import { updateUserProfile } from "../../services/updateUser";
import styles from "./EditUserProfileHeader.module.css"; 

function EditUserProfileHeader() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserProfile(id);
        setUser(userData);
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    try {
      await updateUserProfile(id, formData);
      // Optionally, you can redirect the user or show a success message
    } catch (error) {
      console.error("Failed to update user profile:", error);
      // Handle error
    }
  };

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <img
        className={styles.picture}
        src={user.profilePicture || defaultProfile}
        alt="Profile"
      />
      <div className={styles.info}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={handleChangeFirstName}
            className={styles.input}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={handleChangeLastName}
            className={styles.input}
          />
        </label>
        <label>
          Profile Picture:
          <input
            type="file"
            onChange={handleProfilePictureChange}
            className={styles.input}
          />
        </label>
      </div>
      <button type="submit" className={styles.saveButton}>
        Save Changes
      </button>
    </form>
  );
}

export default EditUserProfileHeader;
// EditUserProfileHeader.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile, updateUserProfile } from "../../services/UserService";
import styles from "./EditUserProfileHeader.module.css";
import Form from "../../components/common/FormComponents/Form/Form";
import defaultProfile from "../../assets/images/defaultProfile.png";
import editPencil from "../../assets/images/editPencil.png";

function EditUserProfileHeader() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserProfile(id);
        setUser(userData);
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setBio(userData.bio || "");
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("bio", bio);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    try {
      await updateUserProfile(id, formData);
    } catch (error) {
      console.error("Failed to update user profile:", error);
    }
  };

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Edit Profile</h2>
      </div>
      <div className={styles.pictureContainer}>
        <img
          className={styles.picture}
          src={user.profilePicture || defaultProfile}
          alt="Profile"
        />
        <div className={styles.editPicture}>
          <label htmlFor="profilePictureInput">
            <img src={editPencil} alt="Edit Icon" />
          </label>
          <input
            id="profilePictureInput"
            type="file"
            onChange={(e) => setProfilePicture(e.target.files[0])}
            hidden
          />
        </div>
      </div>
      <Form
        className={styles.form}
        onSubmit={handleSubmit}
        submitButtonProps={{
          className: styles.saveButton,
          children: "Save Changes",
        }}
        fields={[
          {
            label: "First Name",
            name: "firstName",
            type: "text",
            value: firstName,
            onChange: (e) => setFirstName(e.target.value),
            required: true,
            placeholder: "Enter your first name",
          },
          {
            label: "Last Name",
            name: "lastName",
            type: "text",
            value: lastName,
            onChange: (e) => setLastName(e.target.value),
            required: true,
            placeholder: "Enter your last name",
          },
          {
            label: "Bio",
            name: "bio",
            type: "textarea",
            value: bio,
            onChange: (e) => setBio(e.target.value),
            placeholder: "Enter a short bio",
          },
        ]}
      />
    </div>
  );
}
export default EditUserProfileHeader;

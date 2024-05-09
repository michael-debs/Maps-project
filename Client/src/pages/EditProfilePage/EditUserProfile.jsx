import { useParams } from "react-router-dom";
import styles from "./EditUserProfile.module.css";
import Form from "../../components/common/FormComponents/Form/Form";
import defaultProfile from "../../assets/images/defaultProfile.png";
import editPencil from "../../assets/images/editPencil.png";
import useUser from "../../hooks/useUser";


function EditUserProfile() {
  const { id } = useParams();
  const { user, updateProfile } = useUser(id);


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };
  

  return (
    <div className={styles.container}>
      <div className={styles.pictureContainer}>
        <img
          className={styles.picture}
          src={user?.profilePicture || defaultProfile}
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
        onSubmit={handleFormSubmit} 
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
            value: user.bio || "",
            onChange: (e) => setBio(e.target.value),
            placeholder: "Enter a short bio",
          },
        ]}
      />
    </div>
  );
}

export default EditUserProfile;
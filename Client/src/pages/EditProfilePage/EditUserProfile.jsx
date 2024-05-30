import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EditUserProfile.module.css";
import Form from "../../components/common/FormComponents/Form/Form";
import defaultProfile from "../../assets/images/defaultProfile.png";
import PencilIcon from "../../components/Icons/PencilIcon";
import useUser from "../../hooks/useUser";
import { toast } from "react-toastify";
import GoBackButton from "../../components/common/GoBackButton/GoBackButton";
import DeleteButton from "../../components/common/DeleteButton/DeleteButton";
import Header from "../../components/common/Header/Header";

function EditUserProfile() {
  const { id } = useParams();
  const { user, updateProfile, deleteAccount } = useUser(id);
  const navigate = useNavigate();

  const { profilePicture, changeProfilePicture } = useProfilePicture(user);

  const handleFormSubmit = async (formData) => {
    try {
      formData.profilePicture = profilePicture;
      const result = await updateProfile(formData);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Profile updated successfully");
        navigate(`/user/${id}`);
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleDeleteUser = async () => {
    const result = await deleteAccount();
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Account deleted successfully");
    }
  };

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.rectangle}>
        <h2 className={styles.header}>Edit Profile</h2>
        <section className={styles.updateProfileSection}>
          <div className={styles.pictureContainer}>
            <img
              className={styles.picture}
              src={profilePicture || defaultProfile}
              alt="Profile"
            />
            <div className={styles.editPicture}>
              <label className={styles.label} htmlFor="profilePictureInput">
                <PencilIcon />
              </label>
              <input
                id="profilePictureInput"
                type="file"
                onChange={(e) => changeProfilePicture(e.target.files[0])}
                hidden
              />
            </div>
          </div>
          <Form
            className={styles.form}
            onSubmit={handleFormSubmit}
            submitButtonProps={{
              className: styles.saveButton,
              variant: "secondary",
              children: "Save Changes",
            }}
            fields={[
              {
                label: "First Name",
                name: "firstName",
                type: "text",
                value: user.firstName,
                required: true,
                placeholder: "Enter your first name",
              },
              {
                label: "Last Name",
                name: "lastName",
                type: "text",
                value: user.lastName,
                required: true,
                placeholder: "Enter your last name",
              },
              {
                label: "Bio",
                name: "bio",
                type: "textarea",
                value: user.bio || "",
                placeholder: "Enter a short bio",
              },
            ]}
          />
        </section>
        <DeleteButton onDelete={handleDeleteUser}>Delete User</DeleteButton>
      </div>
    </div>
  );
}

export default EditUserProfile;

const useProfilePicture = (user) => {
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    if (user) {
      setProfilePicture(user.profilePicture);
    }
  }, [user]);

  const changeProfilePicture = (file) => {
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setProfilePicture(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  return { profilePicture, changeProfilePicture };
};

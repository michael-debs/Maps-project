import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateActivity.module.css";
import Form from "../../components/common/FormComponents/Form/Form";
import { toast } from "react-toastify";
import defaultActivityImage from "../../assets/images/defaultActivity.png";
import PencilIcon from "../../components/Icons/PencilIcon";
import useActivity from "../../hooks/useActivity";

function CreateActivity() {
  const { createActivity } = useActivity();
  const navigate = useNavigate();
  const { activityPicture, changeActivityPicture } = useActivityPicture();

  const handleFormSubmit = async (formData) => {
    try {
      formData.picture = activityPicture;
      const result = await createActivity(formData);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Activity created successfully");
        navigate(`/activity/:id`);
      }
    } catch (error) {
      console.error("Failed to create activity:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.rectangle}>
        <h2 className={styles.header}>Create Activity</h2>
        <section className={styles.createActivitySection}>
          <div className={styles.pictureContainer}>
            <img
              className={styles.picture}
              src={activityPicture || defaultActivityImage}
              alt="Activity"
            />
            <div className={styles.editPicture}>
              <label className={styles.label} htmlFor="activityPictureInput">
                <PencilIcon />
              </label>
              <input
                id="activityPictureInput"
                type="file"
                onChange={(e) => changeActivityPicture(e.target.files[0])}
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
              children: "Create Activity",
            }}
            fields={[
              {
                label: "Activity Name",
                name: "name",
                type: "text",
                required: true,
                placeholder: "Enter activity name",
              },
              {
                label: "Pin Color",
                name: "pinColor",
                type: "color",
                required: true,
                placeholder: "Select pin color",
              },
              {
                label: "Description",
                name: "description",
                type: "textarea",
                placeholder: "Enter a description",
              },
            ]}
          />
        </section>
      </div>
    </div>
  );
}

export default CreateActivity;

const useActivityPicture = (activity) => {
  const [activityPicture, setActivityPicture] = useState(null);

  useEffect(() => {
    if (activity) {
      setActivityPicture(activity.activityPicture);
    }
  }, [activity]);

  const changeActivityPicture = (file) => {
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setActivityPicture(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  return { activityPicture, changeActivityPicture };
};

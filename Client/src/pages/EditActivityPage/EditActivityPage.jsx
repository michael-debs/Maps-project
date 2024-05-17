
import styles from "./EditActivityPage.module.css";
import Form from "../../components/common/FormComponents/Form/Form";

function EditActivityPage() {
  const handleSubmit = (formData) => {

    console.log("Form data:", formData);
  };

  return (
    <div className={styles.editcontainer}>
      <Form
        onSubmit={handleSubmit}
        fields={[
          {
            name: "activityName",
            label: "Activity Name",
            type: "text",
            required: true,
            placeholder: "Enter activity name",
          },
          {
            name: "activityProfile",
            label: "Activity Profile",
            type: "file",
            required: true,
          },
          {
            name: "activityColor",
            label: "Choose a color for you pin",
            type: "color",
            required: true,
          },
          {
            name: "activityDescription",
            label: "Activity Description",
            type: "textarea",
            required: true,
            placeholder: "Enter activity description",
          },
        ]}
        submitButtonProps={{
          children: "Create Activity",
          variant: "gradient",
        }}
      />
    </div>
  );
}

export default EditActivityPage;
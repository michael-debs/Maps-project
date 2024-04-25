import { useState } from "react";
import Input from "../Input/Input";
import Button from "../../Button/Button";
import { formPropTypes } from "../../../../constants/PropTypes";
import ErrorIcon from "../../../Icons/ErrorIcon";

function Form({
  onSubmit,
  fields,
  className,
  submitButtonProps,
  globalValidation,
}) {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: undefined,
    });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    const formErrors = {};

    fields.forEach((field) => {
      if (field.validation) {
        // Check for custom validation function
        const error = field.validation(formData[field.name]);
        if (error) {
          formErrors[field.name] = error;
        }
      }
      if (field.required && !formData[field.name]) {
        // Basic validation: check if required fields are filled
        formErrors[field.name] = `${field.label} is required`;
      }
    });

    if (globalValidation) {
      globalValidation(formData, formErrors);
    }

    if (Object.keys(formErrors).length === 0) {
      await onSubmit(formData);
    } else {
      setErrors(formErrors);
    }
    setIsLoading(false)
  };
  return (
    <form className={className} onSubmit={handleSubmit}>
      {fields.map((field, i) => (
        <div
          style={{
            maxWidth: "min-content",
          }}
          key={i}
        >
          <Input
            onChange={handleChange}
            label={field.label}
            type={field.type}
            id={field.name}
            name={field.name}
            value={formData[field.name] || ""}
            placeholder={field.placeholder}
          />
          {errors[field.name] && (
            <div
              style={{
                color: "red",
                marginTop: "4px",
                marginLeft: "4px",
                fontSize: "0.8rem",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <ErrorIcon />
              {errors[field.name]}
            </div>
          )}
        </div>
      ))}
      <Button {...submitButtonProps} disabled={isLoading}>
        {submitButtonProps.children}
      </Button>
    </form>
  );
}

Form.propTypes = formPropTypes;

export default Form;

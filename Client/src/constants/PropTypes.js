import PropTypes from "prop-types";

export const buttonPropTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["primary", "secondary", "danger", "gradient"]),
  size: PropTypes.oneOf(["s", "l", "xl", ""]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export const formPropTypes = {
  onSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
  submitButtonProps: PropTypes.shape(buttonPropTypes),
  globalValidation: PropTypes.func,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      required: PropTypes.bool,
      id: PropTypes.string,
      value: PropTypes.string,
      validation: PropTypes.func,
    })
  ).isRequired,
};

export const userPropTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    bio: PropTypes.string,
    profilePicture: PropTypes.string,
    email: PropTypes.string.isRequired,
  }),
};

import PropTypes from "prop-types";
import styles from "./Input.module.css";

function Input({
  type,
  placeholder,
  value,
  onChange,
  size,
  name,
  label,
  ...rest
}) {
  const inputClasses = [
    styles.input,
    size === "l" && styles.large,
    size === "s" && styles.small,
    size === "xs" && styles.extraSmall,
  ].join(" ");

  return (
    <div>
      <label htmlFor={name} className={styles.title}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={inputClasses}
        name={name}
        {...rest}
      />
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.oneOf(["l", "", "s", "xl"]),
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
};

export default Input;

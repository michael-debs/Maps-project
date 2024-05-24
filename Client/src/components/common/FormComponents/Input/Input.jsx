import PropTypes from "prop-types";
import styles from "./Input.module.css";
import { useEffect, useRef } from "react";

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
  const inputRef = useRef();

  useEffect(() => {
    if (type === "color" && inputRef.current) {
      inputRef.current.style.backgroundColor = value;
    }
  }, [type, value]);

  const inputClasses = [
    styles.input,
    size === "l" && styles.large,
    size === "s" && styles.small,
    size === "xs" && styles.extraSmall,
  ].join(" ");

  return (
    <div className={styles.container}>
      <label htmlFor={name} className={styles.title}>
        {label}
      </label>
      <input
        ref={inputRef}
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
  size: PropTypes.oneOf(["l", "s", "xs"]),
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
};

export default Input;

import React from "react";
import PropTypes from "prop-types";
import styles from "./TextArea.module.css";

function TextArea({ value, onChange, placeholder, name, label, ...rest}) {
  return (
    <div>
      <label htmlFor={name} className={styles.title}>{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.textarea}
        { ...rest }
      />
    </div>
  );
}

TextArea.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default TextArea;

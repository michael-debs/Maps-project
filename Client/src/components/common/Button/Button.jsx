import styles from "./Button.module.css";
import { buttonPropTypes } from "../../../constants/PropTypes";

function Button({ children, onClick, variant, size, disabled, className, ...rest }) {
  const buttonClasses = [
    styles.button,
    variant === "secondary" && styles.secondary,
    variant === "danger" && styles.danger,
    variant === "gradient" && styles.gradient,
    size === "s" && styles.small,
    size === "l" && styles.large,
    size === "xl" && styles.extraLarge,
    className
  ].join(" ");

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...rest}
      style={{
        opacity: disabled ? 0.7 : 1
      }}
    >
      {children}
    </button>
  );
}

Button.propTypes = buttonPropTypes

Button.defaultProps = {
  onClick: () => {},
  variant: "primary",
  size: "",
  disabled: false,
};


export default Button;

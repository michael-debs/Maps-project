import X from "../Icons/X";
import styles from "./modal.module.css";
import PropTypes from "prop-types";

const Modal = ({ show, handleClose, children }) => {
  const showHideClassName = show ? styles.displayBlock : styles.displayNone;

  return (
    <div className={`${styles.modal} ${showHideClassName}`}>
      <section className={styles.modalMain}>
        {children}
        <div className={styles.button} onClick={handleClose}>
          <X />
        </div>
      </section>
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Modal;

import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./DeleteButton.module.css";
import removeUser from "../../../assets/images/removeUser.png";
import redX from "../../../assets/images/redX.png";

function DeleteButton({ onDelete, children }) {
  const [confirming, setConfirming] = useState(false);

  const handleDelete = () => {
    setConfirming(true);
  };

  const confirmDelete = () => {
    onDelete();
    setConfirming(false);
  };

  const cancelDelete = () => {
    setConfirming(false);
  };

  return (
    <div className={styles.Container}>
      <button
        className={`${styles.deleteButton} ${confirming ? styles.confirming : ""}`}
        onClick={handleDelete}
      >
        <i>{children}{" "}</i>
        <img src={removeUser} className={styles.removeUserPicture} alt="Remove User" />
      </button>
      {confirming && (
        <>
          <div className={styles.confirmContainer}>
            <div className={styles.imageContainer}>
              <img src={redX} className={styles.redX} alt="Red X" />
            </div>
            <h2 className={styles.question}> Are You Sure? </h2>
            <p>Do you really want to delete this?</p>
            <p>This process cannot be undone.</p>
            <div className={styles.buttonContainer}>
              <button onClick={confirmDelete} className={styles.Delete}>
                Delete
              </button>
              <button onClick={cancelDelete} className={styles.cancel}>
                Cancel
              </button>
            </div>
          </div>
          <div className={styles.overlay}></div>
        </>
      )}
    </div>
  );
}

DeleteButton.propTypes = {
  onDelete: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default DeleteButton;

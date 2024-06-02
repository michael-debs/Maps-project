import PlusIcon from "../../../../components/Icons/PlusIcon";
import styles from "./AddPostButton.module.css"

function AddPostButton() {
  return (
    <a href="/posts/add" className={styles.container}>
      <PlusIcon />
    </a>
  );
}

export default AddPostButton;

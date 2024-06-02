import styles from "./LoginButton.module.css";
import {Link} from "react-router-dom";

function LoginButton() {
  return (
    <div className={styles.container}>
      <Link to="/login" className={styles.button}>
        Login
      </Link>
    </div>
  );
}

export default LoginButton;

import styles from "./RegisterButton.module.css"
import {Link} from "react-router-dom"

function RegisterButton() {
  return (
    <div className={styles.container}>
        <Link to="/register" className={styles.button}>Register</Link>
    </div>
  )
}

export default RegisterButton
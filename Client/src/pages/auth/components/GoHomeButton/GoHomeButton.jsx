import { Link } from "react-router-dom"
import styles from "./GoHomeButton.module.css"

function GoHomeButton() {
  return (
    <Link to={"/"} className={styles.button}>Go Home</Link>
  )
}

export default GoHomeButton
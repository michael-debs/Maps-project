import useMap from "../../../../hooks/useMap"
import styles from "./Map.module.css"

function Map() {
    useMap("map")
  return (
    <div id="map" className={styles.map}></div>
  )
}

export default Map
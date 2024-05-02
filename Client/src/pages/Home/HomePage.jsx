import Map from "./components/Map/Map";
import styles from "./HomePage.module.css";
import Ui from "./components/Ui/Ui";
function HomePage() {
  return (
    <>
      <Ui />
      <div className={styles.mapContainer}>
        <Map />
      </div>
    </>
  );
}

export default HomePage;

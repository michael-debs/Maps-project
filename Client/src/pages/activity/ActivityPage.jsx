import { useParams } from "react-router-dom";
import styles from "./ActivityPage.module.css";
import { useEffect, useState } from "react";
import { getActivityById } from "../../services/ActivityService";

function ActivityPage() {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    getActivityById(id).then((activity) => {
      setActivity(activity);
    });
  }, [id]);

  if (!activity) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <img className={styles.image} src={activity.profile}></img>
      <h2 className={styles.title}>{activity.name}</h2>
      <p className={styles.paragraph}>{activity.description}</p>
    </div>
  );
}

export default ActivityPage;

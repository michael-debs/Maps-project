import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import Modal from "../../components/modal/modal";
import useMap from "../../hooks/useMap";
import styles from "./CreatePostPage.module.css";
import Form from "../../components/common/FormComponents/Form/Form";
import { toast } from "react-toastify";
import { createPost } from "../../services/PostService";
import { useNavigate } from "react-router-dom";
import useActivity from "../../hooks/useActivity";
import { getActivities } from "../../services/ActivityService";

export default function CreatePostPage() {
  const map = useMap("map");
  const [showModal, setShowModal] = useState(false);
  const [lngLat, setLngLat] = useState(null);
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const activityId = useRef(null)

  useEffect(() => {
    if (!map.current) {
      return;
    }

    map.current.on("load", () => {
      map.current.on("click", (e) => {
        setLngLat(e.lngLat);
        setShowModal(true);
      });
    });
  }, [map]);

  useEffect(() => {
    getActivities()
      .then((activities) => {
        setActivities(activities);
        activityId.current = activities[0].id
      })
      .catch((err) => {
        console.error(err);
        toast.error(err);
      });
  }, []);

  return (
    <>
      <Header />
      <div className={styles.mapContainer}>
        <div id="map" className={styles.map}></div>{" "}
      </div>
      <div className={styles.message}>Choose the location of your post!</div>
      <Modal show={showModal} handleClose={() => setShowModal(false)}>
        <div className={styles.activities}>
          <label htmlFor="activity">Choose an activity</label>
          {activities ? (
            <select name="activity" id="activity" onChange={e => activityId.current = e.target.value}>
              {activities.map((activity) => (
                <option key={activity.id} value={activity.id}>
                  {activity.name}
                </option>
              ))}
            </select>
          ) : (
            "Loading Activities..."
          )}
        </div>
        <Form
          fields={[
            {
              name: "title",
              label: "Post Title",
              required: true,
              type: "text",
            },
            {
              name: "body",
              label: "Post Body",
              required: true,
              type: "textarea",
            },
          ]}
          onSubmit={async (formData) => {
            try {
              const promise = createPost(
                formData.title,
                formData.body,
                lngLat.lng,
                lngLat.lat,
                activityId.current
              );
              toast.promise(promise, {
                pending: "Loading",
                success: "Post Added Successfully",
                error: {
                  render({ data }) {
                    return data.message;
                  },
                },
              });
              navigate("/");
            } catch (error) {
              console.error("Error: ", error);
            }
          }}
          submitButtonProps={{
            children: "Submit",
            variant: "secondary",
            className: styles.submitButton,
          }}
          className={styles.form}
        />
      </Modal>
    </>
  );
}

import styles from "./HomePage.module.css";
import Ui from "./Ui/Ui";
import { useEffect, useState } from "react";
import useMap from "../../hooks/useMap";
import { shortenParagraph } from "../../utils/helper";
import { createZones, nodeInZone } from "../../utils/mapHelper";
import usePosts from "../../hooks/usePosts";

function HomePage() {
  const map = useMap("map");
  useMapState(map);

  return (
    <>
      <div className={styles.mapContainer}>
        <div id="map" className={styles.map}></div>{" "}
      </div>
      <Ui />
    </>
  );
}

function useMapState(map) {
  const { posts } = usePosts();
  const { zones, addPostToZone } = useZones({ map, zoneWidth: 135, zoneHeight: 90, debug: true });

  function init() {
    // Add each post to its zone
    if (posts && zones) {
      posts.forEach((post) => {
        zones.forEach((zone) => {
          if (
            nodeInZone([post.lng, post.lat], zone.x1, zone.x2, zone.y1, zone.y2)
          ) {
            addPostToZone(zone.id, post);
          }
        });
      });
    }
  }

  const render = (posts) => {
    if (posts) {
      zones.forEach((zone) => {
        if (zone.posts) {
          renderPost(zone.posts[0]);
        }
      });
    }
  };

   const renderPost = (post) => {
    post.content = shortenParagraph(post.content, 160);
    map.addPopup(
      [post.lng, post.lat],
      post.id,
      { closeButton: false, className: "popup" },
      `
          <div class="post">
            <div class="header">
              <img class="activityPicture" src="${post.activity.profile}" />
              <div>
                <div class="activityName">
                  ${post.activity.name} 
                </div>
                <div class="username">
                  ${post.user.firstName} ${post.user.lastName} 
                </div>
              </div>
            </div>
            <div class="postContent">
              <h1>${post.title}</h1><br>
              <p>${post.content}</p>
              <a href="/posts/${post.id}">Read More</a>
            </div>
          </div>
        `
    );
  }
  useEffect(() => {
    init();
    render(posts);
  }, [posts]);
}

function useZones(params) {
  const [zones, setZones] = useState();

  useEffect(() => {
    setZones(createZones(params));
  }, [])
  

  function addPostToZone(zoneId, post) {
    setZones((prevZones) => {
      return prevZones.map((zone) => {
        if (zoneId == zone.id) {
          if (!prevZones.posts) {
            prevZones.posts = [];
          }
          return { ...zone, posts: [...prevZones.posts, post] };
        }
        return zone;
      });
    });
  }

  return { zones, addPostToZone };
}

export default HomePage;

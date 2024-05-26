import styles from "./HomePage.module.css";
import Ui from "./Ui/Ui";
import { useCallback, useEffect, useRef, useState } from "react";
import useMap from "../../hooks/useMap";
import { createZones, nodeInZone, renderPost } from "../../utils/mapHelper";
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
  const maxWH = useRef([135, 90]);
  const initialized = useRef(false);
  const [zoneWH, setZoneWH] = useState(maxWH);
  const [zones, setZones] = useState();
  const zoom = useRef(0);

  useEffect(() => {
    if (posts && !initialized.current) {
      zoom.current = map.current.getZoom()
      registerEvents();

      initialized.current = true;
    }
  }, [posts]);

  useEffect(() => {
    if (!initialized.current) {
      return;
    }
    map.clearPopups();
    const newZones = createZones({
      map,
      zoneWidth: zoneWH[0],
      zoneHeight: zoneWH[1],
    });
    // Merge posts into their respective zones
    posts.forEach((post) => {
      newZones.forEach((zone) => {
        if (
          nodeInZone([post.lng, post.lat], zone.x1, zone.x2, zone.y1, zone.y2)
        ) {
          zone.posts = zone.posts || [];
          zone.posts.push(post);
        }
      });
    });

    setZones(newZones);
    renderPosts(newZones)
  }, [zoneWH]);

  function registerEvents() {
    map.current.on("load", onLoad);
    map.current.on("zoomend", onZoomEnd);
  }

  const renderPosts = (zones) => {
    zones.forEach((zone) => {
      if (zone.posts && zone.posts.length > 0) {
        renderPost({ map, post: zone.posts[0] });
      }
    });
  };

  const onZoomEnd = (e) => {
    const newZoom = parseInt(e.target.transform._zoom);
    if (Math.floor(newZoom) !== zoom.current) {
      zoom.current = newZoom;
      setZoneWH([
        maxWH.current[0] / Math.pow(2, zoom.current),
        maxWH.current[1] / Math.pow(2, zoom.current),
      ]);
    }
  };

  const onLoad = () => {
    setTimeout(() => {
      
      const newZones = createZones({
        map,
        zoneWidth: maxWH.current[0] / Math.pow(2, zoom.current),
        zoneHeight: maxWH.current[1] / Math.pow(2, zoom.current),
      });
      // Merge posts into their respective zones
      posts.forEach((post) => {
        newZones.forEach((zone) => {
          if (
            nodeInZone([post.lng, post.lat], zone.x1, zone.x2, zone.y1, zone.y2)
          ) {
            zone.posts = zone.posts || [];
            zone.posts.push(post);
          }
        });
      });
  
      setZones(newZones);
      renderPosts(newZones);
    }, 1000);
  };
}

export default HomePage;

import { useRef, useEffect, useState } from "react";
import * as maptiler from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

const apiKey = import.meta.env.VITE_MAPTILER_KEY;

const useMap = (container) => {
  const map = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [popups, setPopups] = useState([]);

  const addMarker = (lngLat, options, id) => {
    const marker = new maptiler.Marker(options)
      .setLngLat(lngLat)
      .addTo(map.current);

    setMarkers((prevMarkers) => [...prevMarkers, { marker, id }]);
    return marker;
  };

  const addPopup = (lngLat, id, options, html) => {
    const popup = new maptiler.Popup({ closeOnClick: false, ...options })
      .setLngLat(lngLat)
      .setHTML(html)
      .addTo(map.current);
    setPopups((prevMarkers) => [...prevMarkers, { popup, id }]);
    return popup;
  };

  useEffect(() => {
    if (!map.current) {
      map.current = new maptiler.Map({
        container: container,
        apiKey: apiKey,
        geolocate: "POINT",
        style: "https://demotiles.maplibre.org/style.json",
        // style: maptiler.MapStyle.SATELLITE,
        zoom: 1,
        draggable: true,
        // minZoom: 8,
      });
    }
  }, [container]);

  return { addMarker, addPopup };
};

export default useMap;

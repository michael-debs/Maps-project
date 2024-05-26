import { useRef, useEffect, useState } from "react";
import * as maptiler from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { createZones } from "../utils/mapHelper";

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

  const clearPopups = () => {
    setPopups((prevPopups) => {
      prevPopups.forEach((popup) => {
        popup.popup.remove();
      });
      return [];
    });
    setMarkers((prevMarkers) => {
      prevMarkers.forEach((marker) => {
        marker.marker.remove();
      });
      return [];
    });
  };

  const addPopup = (lngLat, id, options, html) => {
    const popup = new maptiler.Popup({
      closeOnClick: false,
      ...options,
      anchor: "bottom",
    })
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
        style: "https://demotiles.maplibre.org/style.json",
        // style: maptiler.MapStyle.SATELLITE,
        draggable: true,
        maxZoom: 13,
        zoom: 1
      });

    }
  }, [container]);

  return {
    addMarker,
    addPopup,
    clearPopups,
    current: map.current,
    markers,
    popups,
  };
};

export default useMap;

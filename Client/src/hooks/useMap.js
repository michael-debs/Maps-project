import * as maptiler from "@maptiler/sdk";
import { useEffect, useRef } from "react";

const apiKey = import.meta.env.VITE_MAPTILER_KEY;

function useMap(container) {
  const map = useRef(null);
  useEffect(() => {
    if (map.current) return;

    map.current = new maptiler.Map({
      container: container,
      apiKey: apiKey,
      geolocate: "POINT",
      style: "https://demotiles.maplibre.org/style.json",
      zoom: 8,
    });
  }, [container]);
}

export default useMap;

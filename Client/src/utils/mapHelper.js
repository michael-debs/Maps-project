export function createZones({
  debug,
  map,
  zoneWidth = 20,
  zoneHeight = 32,
}) {
  let zones = [];
  let width = zoneWidth;
  let height = zoneHeight;
  for (let i = -180; i <= 180; i = i + width) {
    for (let j = -85; j <= 85; j = j + height) {
      let x1, x2, y1, y2;
      if (j + height >= 85) {
        x1 = i;
        x2 = i + width;
        y1 = j;
        y2 = 85;
      } else {
        x1 = i;
        x2 = i + width;
        y1 = j;
        y2 = j + height;
      }
      zones.push({ x1, x2, y1, y2, id: zones.length });
      if (debug) {
        console.log(
          "i: ",
          i,
          "i + width: ",
          i + width,
          "J: ",
          j,
          "j + height: ",
          j + height
        );
        addZone(map, x1, x2, y1, y2, "black");
      }
    }
  }
  if (debug) {
    console.log(zones);
  }
  return zones;
}

export function addZone(map, x1, x2, y1, y2, color) {
  let m1 = map.addMarker([x1, y1], { color: color, draggable: true }, 1);
  let m2 = map.addMarker([x2, y1], { color: color, draggable: true }, 2);
  let m3 = map.addMarker([x1, y2], { color: color, draggable: true }, 1);
  let m4 = map.addMarker([x2, y2], { color: color, draggable: true }, 4);
  return { m1, m2, m3, m4 };
}

export function nodeInZone(node, x1, x2, y1, y2) {
  return (
    node[0] > Math.min(x1, x2) &&
    node[0] < Math.max(x1, x2) &&
    node[1] > Math.min(y1, y2) &&
    node[1] < Math.max(y1, y2)
  );
}

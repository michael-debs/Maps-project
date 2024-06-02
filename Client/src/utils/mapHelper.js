import { shortenParagraph } from "./helper";

export function createZones({ debug, map, zoneWidth = 20, zoneHeight = 32 }) {
  let zones = [];
  let width = zoneWidth;
  let height = zoneHeight;
  const viewportBounds = map.current.getBounds();

  for (let i = -180; i <= 180; i = i + width) {
    for (let j = -85; j <= 85; j = j + height) {
      let x1 = i;
      let x2 = Math.min(i + width, 180);
      let y1 = j;
      let y2 = Math.min(j + height, 85);

      let zone = { x1, x2, y1, y2, id: zones.length };
      if (!isZoneInViewport(zone, viewportBounds)) {
        continue;
      }

      zones.push(zone);
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

export function isZoneInViewport(zone, viewportBounds) {
  return (
    zone.x2 >= viewportBounds.getWest() &&
    zone.x1 <= viewportBounds.getEast() &&
    zone.y2 >= viewportBounds.getSouth() &&
    zone.y1 <= viewportBounds.getNorth()
  );
}

export function renderPost({ map, post }) {
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
                  <a href="/activity/${post.activity.id}" class="resetA">
                    ${post.activity.name} 
                  </a>
                </div>
                <div class="username">
                  <a href="/user/${post.user.id}" class="resetA">
                    ${post.user.firstName} ${post.user.lastName} 
                  </a>
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

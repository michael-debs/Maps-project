import styles from "./HomePage.module.css";
import Ui from "./components/Ui/Ui";
import { useEffect } from "react";
import useMap from "../../hooks/useMap";
import { getAllPosts } from "../../services/PostService";
import { shortenParagraph } from "../../utils/helper"

function HomePage() {
  const map = useMap("map");
  useCurrent(map);

  return (
    <>
      <div className={styles.mapContainer}>
        <div id="map" className={styles.map}></div>{" "}
      </div>
      <Ui />
    </>
  );
}

function useCurrent(map) {
  useEffect(() => {
    async function fetch() {
      const posts = await getAllPosts()
      posts.forEach(post => {
        post.content = shortenParagraph(post.content, 60)
        const popup = map.addPopup(
          [post.lng, post.lat],
          post.id,
          { closeButton: false },
          // `<a class="resetA" href="/posts/${post.id}"><div class="post"><h1>${post.title}</h1><br><p>${post.content}</p></div></a>`
          `<div class="post"><h1>${post.title}</h1><br><p>${post.content}</p> <a href="/posts/${post.id}">Read More</a> </div>`
        );
        const htmlElement = popup.getElement()
        console.log(htmlElement);
      });
    }
    fetch()
  }, []);
}

export default HomePage;


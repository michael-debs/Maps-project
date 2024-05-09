import { useParams } from "react-router-dom";
import usePost from "../../hooks/usePost";
import defaultProfile from "../../assets/images/defaultProfile.png";
import styles from "./PostPage.module.css";

function PostPage() {
  const { id } = useParams();
  const { post } = usePost(id);

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.picandname}>
            <img className={styles.Picture} src={defaultProfile} alt="User" />
            <div className={styles.Name}>Riman Minawi</div>
          </div>
          <div className={styles.datePosted}>1.11.2024</div>
        </header>

        <section className={styles.titleSection}>
          {/* Post title */}
          <h2 className={styles.title}>Why I Love Winter</h2>
        </section>
        <section className={styles.contentSection}>
          {/* Post content */}
          <p className={styles.content}>
            I like winter because it is a wonderful season. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Integer sit amet leo nec
            justo ullamcorper ultricies. Nullam rhoncus odio at interdum
            tristique. Aenean aliquam condimentum felis, sit amet consectetur
            turpis pellentesque vel. Aliquam ut vehicula sem. Suspendisse vitae
            suscipit nisl. Fusce vestibulum, elit nec feugiat fermentum, lectus
            justo scelerisque ligula, eget molestie orci risus sed nunc. Donec
            eget neque nec nisl ultrices consequat. Vestibulum et nunc
            ultricies, dignissim arcu sit amet, gravida sapien. Vivamus
            malesuada magna a fermentum pharetra. Nulla facilisi. Fusce aliquet
            sapien id ex varius suscipit. Quisque nec sem erat. Cras maximus
            massa vitae finibus placerat. Phasellus vehicula orci ac libero
            ultricies, eget accumsan velit ultricies.
          </p>
        </section>
      </div>
    </div>
  );
}

export default PostPage;

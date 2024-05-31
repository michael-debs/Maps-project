import { useEffect, useState } from "react";
import { getAllPosts, getPostWithId } from "../services/PostService";

const usePosts = (id) => {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        if (id) {
          const postData = await getPostWithId(id);
          setPosts([postData]);
        } else {
          const allPosts = await getAllPosts();
          setPosts(allPosts);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [id]);

  return { posts, isLoading, error };
};

export default usePosts;

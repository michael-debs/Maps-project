import { useEffect, useState } from "react";
import { getAllPosts } from "../services/PostService";

const usePosts = (postId) => {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
       const posts = await getAllPosts();
        setPosts(posts);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  return { posts, isLoading, error };
};

export default usePosts;

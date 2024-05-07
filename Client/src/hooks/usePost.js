import { useEffect, useState } from "react";
import { getPostWithId } from "../services/PostService";

const usePost = (postId) => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const postData = await getPostWithId(postId);
        setPost(postData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  return { post, isLoading, error };
};

export default usePost;
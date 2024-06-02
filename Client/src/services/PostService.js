import axios from "../utils/axiosWithAuth";

export async function getAllPosts() {
  const response = await axios.get(`/posts/`);
  if (response.status != 200) {
    throw new Error(`Failed to fetch posts`);
  }
  const postData = await response.data;
  return postData;
}

export async function getPostWithId(id) {
  const response = await axios.get(`/posts/${id}`);
  if (response.status != 200) {
    throw new Error(`Failed to get post with id ${id}`);
  }
  const postData = await response.data;
  return postData;
}

export async function createPost(title, content, lng, lat, activityId,  parentPostId) {
  const response = await axios.post("/posts/", {
    title: title,
    content: content,
    lng,
    lat,
    parentPostId: parentPostId,
    activityId
  });

  if (response.status !== 201) {
    throw new Error("Failed to create post");
  }

  return await response.data;
}

// export async function deleteUser(userId) {
//   const response = await axios.delete(`/posts/${userId}`);
//   if (response.status !== 200) {
//     throw new Error(`Failed to delete user with ID ${userId}`);
//   }
// }

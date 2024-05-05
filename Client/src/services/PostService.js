import axios from "../utils/axiosWithAuth";

export async function getAllPosts() {
  const response = await axios.get(`/posts/`);
  if (response.status != 200) {
    throw new Error(`Failed to fetch posts`);
  }
  const userData = await response.data;
  return userData;
}

// export async function getPostWithId(id) {
//   const response = await axios.put(`/posts/${userId}`, data);
//   if (response.status != 200) {
//     throw new Error(`Failed to update user profile for user ID ${userId}`);
//   }
//   const userData = await response.data;
//   return userData;
// }

// export async function deleteUser(userId) {
//   const response = await axios.delete(`/posts/${userId}`);
//   if (response.status !== 200) {
//     throw new Error(`Failed to delete user with ID ${userId}`);
//   }
// }

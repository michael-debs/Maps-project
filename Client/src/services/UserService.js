import axios from "../utils/axiosWithAuth";

export async function getUserProfile(userId) {
  const response = await axios.get(`/user/${userId}`);
  if (response.status != 200) {
    throw new Error(`Failed to fetch user profile for user ID ${userId}`);
  }
  const userData = await response.data;
  return userData;
}

export async function updateUserProfile(userId, data) {
  const response = await axios.put(`/user/${userId}`, data);
  if (response.status != 200) {
    throw new Error(`Failed to update user profile for user ID ${userId}`);
  }
  const userData = await response.data;
  return userData;
}

export async function deleteUser(userId) {
  try {
    const response = await axios.delete(`/user/${userId}`);
    if (response.status !== 204) {
      throw new Error(`Failed to delete user profile for user ID ${userId}`);
    }
    return true; 
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getUserPostsByUserId(userId) {
  const response = await axios.get(`/user/${userId}/posts`);
  if (response.status != 200) {
    throw new Error(`Failed to fetch posts for user with id ${userId}`);
  }
  const postData = await response.data;
  return postData;
}
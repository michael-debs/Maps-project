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
  const response = await axios.delete(`/user/${userId}`);
  if (response.status !== 200) {
    throw new Error(`Failed to delete user with ID ${userId}`);
  }
}

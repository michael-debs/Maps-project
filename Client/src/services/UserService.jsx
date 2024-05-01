  import axios from "axios";

  export async function getUserProfile(userId) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/${userId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch user profile for user ID ${userId}`);
    }
  }

  export async function updateUserProfile(userId, data) {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/user/${userId}`,
        data
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update user profile for user ID ${userId}`);
    }
  }

  export async function deleteUser(userId) {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/user/${userId}`
      );
      if (response.status !== 200) {
        throw new Error(`Failed to delete user with ID ${userId}`);
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
      throw error;
    }
  }

import axios from "../utils/axiosWithAuth";

export async function getUserActivities(userId) {
  activity.userId = userId;
  const response = await axios.get(`/user/${userId}/activities`);
  if (response.status !== 200) {
    throw new Error(`Failed to fetch activities for user ID ${userId}`);
  }
  return response.data;
}

export async function getActivityById(activityId) {
  const response = await axios.get(`/activity/${activityId}`);
  if (response.status !== 200) {
    throw new Error(`Failed to fetch activity with ID ${activityId}`);
  }
  return response.data;
}

export async function addActivity(activity) {
  const response = await axios.post(`/activity`, activity);
  if (response.status !== 201) {
    throw new Error(`Failed to add activity`);
  }
  return response.data;
}

export async function updateActivity(userId, activityId, activity) {
  activity.userId = userId;
  const response = await axios.put(`/activity/${activityId}`, activity);
  if (response.status !== 200) {
    throw new Error(`Failed to update activity for user ID ${userId} and activity ID ${activityId}`);
  }
  return response.data;
}

export async function deleteActivity(userId, activityId) {
  try {
    const response = await axios.delete(`/user/${userId}/activity/${activityId}`);
    if (response.status !== 204) {
      throw new Error(`Failed to delete activity for user ID ${userId} and activity ID ${activityId}`);
    }
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
}

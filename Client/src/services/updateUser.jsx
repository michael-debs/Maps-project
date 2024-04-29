export async function updateUserProfile(userId, data) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/user/${userId}`,
    {
      method: "PUT",
      body: data,
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to update user profile for user ID ${userId}`);
  }
  const userData = await response.json();
  return userData;
}

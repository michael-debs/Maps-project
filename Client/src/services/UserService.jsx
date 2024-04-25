export async function getUserProfile(userId) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/user/${userId}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch user profile for user ID ${userId}`);
  }
  const userData = await response.json();
  return userData;
}

import { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "../services/UserService.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import { toast } from "react-toastify";

const useUser = (userId) => {
  const {
    user: authenticatedUser,
    updateUser,
    isAuthenticated,
    authIsLoading,
  } = useAuth();
  const [workingState, setWorkingState] = useState({
    isWorking: false,
    action: "",
  });
  const [user, setUser] = useState(null);
  const [isAuthUser, setIsAuthUser] = useState(false);

  useEffect(() => {
    if (authIsLoading) {
      return;
    }
    if (isAuthenticated && authenticatedUser.id == userId) {
      setIsAuthUser(true);
      setUser(authenticatedUser);
    } else {
      fetchUserData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, authenticatedUser]);

  const fetchUserData = async () => {
    if (workingState.isWorking) {
      console.log(workingState);
      throw new Error(`Already working on: ${workingState.action}`);
    }
    setWorkingState({ isWorking: true, action: "fetchUserData" });

    setWorkingState(true);
    try {
      const userData = await getUserProfile(userId);
      setUser(userData);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      toast.error(error);
    } finally {
      setWorkingState({ isWorking: false, action: "" });
    }
  };

  const updateProfile = async (data) => {
    try {
      if (!isAuthUser) {
        throw new Error(
          `The current authenticated user is not authorized to update the profile of user with id ${userId}`
        );
      }
      if (workingState.isWorking) {
        throw new Error(`Already working on: ${workingState.action}`);
      }
      setWorkingState({ isWorking: true, action: "updateProfile" });

      const user = await updateUserProfile(userId, data);
      updateUser(user);
    } catch (error) {
      console.error("Failed to update user profile:", error);
      toast.error(error);
    } finally {
      setWorkingState({ isWorking: false, action: "" });
    }
  };

  return { workingState, user, updateProfile };
};

export default useUser;

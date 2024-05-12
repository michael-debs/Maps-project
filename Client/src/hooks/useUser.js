import { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile, deleteUser } from "../services/UserService.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const useUser = (userId) => {
  const {
    user: authenticatedUser,
    updateUser,
    isAuthenticated,
    authIsLoading,
    logout,
  } = useAuth();
  const navigate = useNavigate();
  const [workingState, setWorkingState] = useState({
    isWorking: false,
    action: "",
  });
  const [user, setUser] = useState(null);
  const [isAuthUser, setIsAuthUser] = useState(false);

  useEffect(() => {
    if (isAuthenticated && authenticatedUser.id == userId) {
      setIsAuthUser(true);
      setUser(authenticatedUser);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticatedUser]);

  useEffect(() => {
    if (!authIsLoading && !isAuthUser) {
      fetchUserData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, isAuthUser]);

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
      return { error: error.message }
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
      return user
    } catch (error) {
      console.error("Failed to update user profile:", error);
      return { error: error.message }
    } finally {
      setWorkingState({ isWorking: false, action: "" });
    }
  };

  const deleteAccount = async () => {
    try {
      if (!isAuthUser) {
        throw new Error(
          `The current authenticated user is not authorized to delete the profile of user with id ${userId}`
        );
      }
      if (workingState.isWorking) {
        throw new Error(`Already working on: ${workingState.action}`);
      }
      setWorkingState({ isWorking: true, action: "deleteAccount" });

      await deleteUser(userId);
      logout();
      navigate('/');
      return true;
    } catch (error) {
      console.error("Failed to delete user profile:", error);
      return { error: error.message };
    } finally {
      setWorkingState({ isWorking: false, action: "" });
    }
  };

  return { workingState, user, updateProfile, deleteAccount };
};


export default useUser;

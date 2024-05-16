import { useEffect, useState } from "react";
import {
  getUserActivities,
  addActivity,
  updateActivity,
  deleteActivity,
} from "../services/ActivityService.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const useActivity = (userId) => {
  const { user: authenticatedUser, isAuthenticated, authIsLoading } = useAuth();
  const navigate = useNavigate();
  const [workingState, setWorkingState] = useState({
    isWorking: false,
    action: "",
  });
  const [activities, setActivities] = useState([]);
  const [isAuthUser, setIsAuthUser] = useState(false);

  useEffect(() => {
    if (isAuthenticated && authenticatedUser.id === userId) {
      setIsAuthUser(true);
    }
  }, [authenticatedUser]);

  useEffect(() => {
    if (!authIsLoading && isAuthUser) {
      fetchUserActivities();
    }
  }, [userId, isAuthUser]);

  const fetchUserActivities = async () => {
    if (workingState.isWorking) {
      console.log(workingState);
      throw new Error(`Already working on: ${workingState.action}`);
    }
    setWorkingState({ isWorking: true, action: "fetchUserActivities" });

    try {
      const activitiesData = await getUserActivities(userId);
      setActivities(activitiesData);
    } catch (error) {
      console.error("Failed to fetch user activities:", error);
      return { error: error.message };
    } finally {
      setWorkingState({ isWorking: false, action: "" });
    }
  };

  const createActivity = async (activityData) => {
    try {
      if (workingState.isWorking) {
        throw new Error(`Already working on: ${workingState.action}`);
      }
      setWorkingState({ isWorking: true, action: "createActivity" });

      const activity = await addActivity(activityData);
      setActivities((prevActivities) => [...prevActivities, activity]);
      return activity;
    } catch (error) {
      console.error("Failed to create activity:", error);
      return { error: error.message };
    } finally {
      setWorkingState({ isWorking: false, action: "" });
    }
  };

  const editActivity = async (activityId, activityData) => {
    try {
      if (workingState.isWorking) {
        throw new Error(`Already working on: ${workingState.action}`);
      }
      setWorkingState({ isWorking: true, action: "editActivity" });

      const updatedActivity = await updateActivity(
        userId,
        activityId,
        activityData
      );
      setActivities((prevActivities) =>
        prevActivities.map((activity) =>
          activity.id === activityId ? updatedActivity : activity
        )
      );
      return updatedActivity;
    } catch (error) {
      console.error("Failed to update activity:", error);
      return { error: error.message };
    } finally {
      setWorkingState({ isWorking: false, action: "" });
    }
  };

  const removeActivity = async (activityId) => {
    try {
      if (workingState.isWorking) {
        throw new Error(`Already working on: ${workingState.action}`);
      }
      setWorkingState({ isWorking: true, action: "removeActivity" });

      await deleteActivity(userId, activityId);
      setActivities((prevActivities) =>
        prevActivities.filter((activity) => activity.id !== activityId)
      );
      return true;
    } catch (error) {
      console.error("Failed to delete activity:", error);
      return { error: error.message };
    } finally {
      setWorkingState({ isWorking: false, action: "" });
    }
  };

  return {
    workingState,
    activities,
    createActivity,
    editActivity,
    removeActivity,
  };
};

export default useActivity;

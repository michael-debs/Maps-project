import { useEffect, useState } from "react";
import {
  getUserActivities,
  getActivityById,
  addActivity,
  updateActivity,
  deleteActivity,
} from "../services/ActivityService.js";
import { useAuth } from "../contexts/AuthContext.jsx";

const useActivity = (activityId) => {
  const { user: authenticatedUser, isAuthenticated, authIsLoading } = useAuth();
  const [workingState, setWorkingState] = useState({
    isWorking: false,
    action: "",
  });
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState(null);
  const [isAuthUser, setIsAuthUser] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setIsAuthUser(true);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!authIsLoading && isAuthUser) {
      if (activityId) {
        fetchActivity();
      } else {
        fetchUserActivities();
      }
    }
  }, [authIsLoading, isAuthUser, activityId]);

  const fetchUserActivities = async () => {
    if (workingState.isWorking) {
      throw new Error(`Already working on: ${workingState.action}`);
    }
    setWorkingState({ isWorking: true, action: "fetchUserActivities" });

    try {
      const activitiesData = await getUserActivities(authenticatedUser.id);
      setActivities(activitiesData);
    } catch (error) {
      console.error("Failed to fetch user activities:", error);
      return { error: error.message };
    } finally {
      setWorkingState({ isWorking: false, action: "" });
    }
  };

  const fetchActivity = async () => {
    if (workingState.isWorking) {
      throw new Error(`Already working on: ${workingState.action}`);
    }
    setWorkingState({ isWorking: true, action: "fetchActivity" });

    try {
      const activityData = await getActivityById(activityId);
      setActivity(activityData);
    } catch (error) {
      console.error("Failed to fetch activity:", error);
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

      const updatedActivity = await updateActivity(authenticatedUser.id, activityId, activityData);
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

      await deleteActivity(authenticatedUser.id, activityId);
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
    activity,
    createActivity,
    editActivity,
    removeActivity,
  };
};

export default useActivity;

import { useEffect, useState } from "react";
import {
  getUserActivities,
  getActivityById,
  addActivity,
  updateActivity,
  deleteActivity,
} from "../services/ActivityService.js";
import { useAuth } from "../contexts/AuthContext.jsx";

const useActivity = ({ activityId = null, create = false } = {}) => {
  const { user: authenticatedUser, isAuthenticated, authIsLoading } = useAuth();
  const [workingState, setWorkingState] = useState({
    isWorking: false,
    action: "",
  });
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState(null);
  const [isAuthUser, setIsAuthUser] = useState(false);

  useEffect(() => {
    if (
      isAuthenticated &&
      authenticatedUser &&
      activity &&
      authenticatedUser.id === activity.userId
    ) {
      setIsAuthUser(true);
    } else {
      setIsAuthUser(false);
    }
  }, [isAuthenticated, authenticatedUser, activity]);

  useEffect(() => {
    if (!authIsLoading && isAuthenticated && authenticatedUser) {
      if (create) {
        return; // Don't fetch activities if creating a new one
      }
      if (activityId) {
        fetchActivity();
      } else {
        // fetchUserActivities();
      }
    }
  }, [authIsLoading, isAuthenticated, authenticatedUser, activityId, create]);

  // const fetchUserActivities = async () => {
  //   if (workingState.isWorking) {
  //     throw new Error(`Already working on: ${workingState.action}`);
  //   }
  //   setWorkingState({ isWorking: true, action: "fetchUserActivities" });

  //   try {
  //     const activitiesData = await getUserActivities(authenticatedUser.id);
  //     setActivities(activitiesData);
  //   } catch (error) {
  //     console.error("Failed to fetch user activities:", error);
  //     return { error: error.message };
  //   } finally {
  //     setWorkingState({ isWorking: false, action: "" });
  //   }
  // };

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
    if (!isAuthUser) {
      throw new Error("User must be the activity admin to edit the activity.");
    }

    if (workingState.isWorking) {
      throw new Error(`Already working on: ${workingState.action}`);
    }
    setWorkingState({ isWorking: true, action: "editActivity" });

    try {
      const updatedActivity = await updateActivity(
        authenticatedUser.id,
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
    if (!isAuthUser) {
      throw new Error(
        "User must be the activity admin to delete the activity."
      );
    }

    if (workingState.isWorking) {
      throw new Error(`Already working on: ${workingState.action}`);
    }
    setWorkingState({ isWorking: true, action: "removeActivity" });

    try {
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

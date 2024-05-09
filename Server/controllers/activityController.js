const activityService = require("../services/activityService");

const activityController = {
  async getAllActivities(req, res) {
    try {
      const activities = await activityService.getAllActivities();
      res.json(activities);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      console.error(error)
    }
  },

  async getActivityById(req, res) {
    try {
      const { id } = req.params;
      const activity = await activityService.getActivityById(Number(id));
      if (!activity) {
        return res.status(404).json({ error: "Activity not found" });
      }
      res.json(activity);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      console.error(error)
    }
  },

  async createActivity(req, res) {
    try {
        const requiredFields = [
          "name",
          "description",
          "profile",
          "color",
        ];
        const missingFields = requiredFields.filter(
          (field) => !req.body[field]
        );

        if (missingFields.length > 0) {
          return res.status(400).json({
            error:
              "One or more required fields are missing in the request body",
            missingFields: missingFields,
          });
        }

      const { name, description, profile, color } = req.body;
      const activity = await activityService.createActivity({
        name,
        description,
        profile,
        color,
        userId: Number(req.user.id),
      });
      res.json(activity);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      console.error(error)
    }
  },

  async updateActivity(req, res) {
    try {
      const { id } = req.params;
      const { name, description, profile, color, userId } = req.body;

      const activity = await activityService.getActivityById(Number(id));

      if (!activity) {
        return res.status(404).json({ error: "Activity not found" });
      }
      if (activity.userId != req.user.id) {
        return res.status(403).json({
          message: "Forbidden: You are not authorized to do this action",
        });
      }

      const updatedActivity = await activityService.updateActivity(Number(id), {
        name,
        description,
        profile,
        color,
        userId,
      });
      res.json(updatedActivity);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      console.error(error)
    }
  },

  async deleteActivity(req, res) {
    try {
      const { id } = req.params;

      const activity = await activityService.getActivityById(Number(id));

      if (!activity) {
        return res.status(404).json({ error: "Activity not found" });
      }
      if (activity.userId != req.user.id) {
        return res.status(403).json({
          message: "Forbidden: You are not authorized to do this action",
        });
      }
      
      const deletedActivity = await activityService.deleteActivity(Number(id));
      if (!deletedActivity) {
        return res.status(404).json({ error: "Activity not found" });
      }
      res.json({ message: "Activity deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      console.error(error)
    }
  },
};

module.exports = activityController;

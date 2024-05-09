const prisma = require("./prismaService");

const activityService = {
  async getAllActivities() {
    try {
      return await prisma.activity.findMany();
    } catch (error) {
      throw new Error(`Error fetching activities: ${error.message}`);
    }
  },

  async getActivityById(id) {
    try {
      return await prisma.activity.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new Error(
        `Error fetching activity with id ${id}: ${error.message}`
      );
    }
  },

  async createActivity(data) {
    try {
      return await prisma.activity.create({ data });
    } catch (error) {
      throw new Error(`Error creating activity: ${error.message}`);
    }
  },

  async updateActivity(id, data) {
    try {
      return await prisma.activity.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new Error(
        `Error updating activity with id ${id}: ${error.message}`
      );
    }
  },

  async deleteActivity(id) {
    try {
      return await prisma.activity.delete({
        where: { id },
      });
    } catch (error) {
      // Check if the error is due to the record not found
      if (error.code === "P2025") {
        return;
      }

      throw new Error(
        `Error deleting activity with id ${id}: ${error.message}`
      );
    }
  },
};

module.exports = activityService;

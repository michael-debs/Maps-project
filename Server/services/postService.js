const prisma = require("./prismaService");

const postService = {
  getAllParentPosts: async () => {
    try {
      return await prisma.post.findMany({
        where: {
          parentPostId: null,
        },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              profilePicture: true,
            },
          },
          activity: {
            select: {
              id: true,
              name: true,
              profile: true
            }
          }
        },
      });
    } catch (error) {
      throw new Error(`Error fetching posts: ${error.message}`);
    }
  },

  getPostById: async (id) => {
    try {
      const post = await prisma.post.findUnique({
        where: { id },
        include: { user: true },
      });
      return {
        ...post,
        user: {
          firstName: post.user.firstName,
          lastName: post.user.lastName,
          email: post.user.email,
          profilePicture: post.user.profilePicture,
        },
      };
    } catch (error) {
      throw new Error(`Error fetching post with id ${id}: ${error.message}`);
    }
  },

  createPost: async (data) => {
    try {
      return await prisma.post.create({
        data: {
          title: data.title,
          content: data.content,
          lng: data.lng,
          lat: data.lat,
          userId: data.userId,
          parentPostId: data.parentPostId || null,
         activityId: data.activityId,
         likes: data.likes
        },
      });
    } catch (error) {
      throw new Error(`Error creating post: ${error.message}`);
    }
  },

  updatePost: async (id, data) => {
    try {
      return await prisma.post.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new Error(`Error updating post with id ${id}: ${error.message}`);
    }
  },

  deletePost: async (id) => {
    try {
      return await prisma.post.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === "P2025") {
        return; // Record not found
      }
      throw new Error(`Error deleting post with id ${id}: ${error.message}`);
    }
  },
};

module.exports = postService;

const postService = require("../services/postService");

const postController = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await postService.getAllParentPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      console.error(error);
    }
  },

  getPostById: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await postService.getPostById(parseInt(id));
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      console.error(error);
    }
  },

  createPost: async (req, res) => {
    try {
      const postData = req.body;
      const user = req.user;
      const post = await postService.createPost({
        title: postData.title,
        content: postData.content,
        lng: postData.lng,
        lat: postData.lat,
        userId: user.id,
        parentPostId: postData.parentPostId,
      });
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      console.error(error);
    }
  },

  updatePost: async (req, res) => {
    try {
      const { id } = req.params;
      const postData = req.body;
      await postService.updatePost(parseInt(id), postData);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      console.error(error);
    }
  },

  deletePost: async (req, res) => {
    try {
      const { id } = req.params;
      await postService.deletePost(parseInt(id));
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      console.error(error);
    }
  },
};

module.exports = postController;

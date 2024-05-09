async function authorizeUserAction(req, res, next) {
  const userIdFromToken = req.user.id;
  const userIdFromParams = req.params.userId; // Assuming userId is in params
  const userIdFromBody = req.body.userId; // Assuming userId is in body

  if (
    userIdFromToken != userIdFromParams &&
    userIdFromToken != userIdFromBody
  ) {
    return res.status(403).json({
      message: "Forbidden: You are not authorized to do this action",
    });
  }
  next();
}

module.exports = {
  authorizeUserAction,
};

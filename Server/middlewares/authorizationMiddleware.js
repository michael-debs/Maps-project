async function authorizeUserAction(req, res, next) {
  const userIdFromToken = req.user.id;
  const userIdFromParams = req.params.id;

  if (userIdFromToken != userIdFromParams) {
    return res.status(403).json({
      message: "Forbidden: You are not authorized to do this action",
    });
  }
  next();
}

module.exports = {
  authorizeUserAction,
};

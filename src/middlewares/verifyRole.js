/* eslint-disable consistent-return */
const isAdmin = (req, res, next) => {
  if (req.payload.user.role === 'ADMIN') {
    return next();
  }
  res.json({ message: 'Only admin can access' });
};

module.exports = isAdmin;

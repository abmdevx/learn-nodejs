// Must be used AFTER the `protect` middleware, since it relies on req.user
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Access denied: admin privileges required' });
};

export { admin };

/**
 * Role-based authorization middleware factory.
 *
 * Usage (always chain AFTER isLoggedIn):
 *   router.get('/admin-only', isLoggedIn, authorizeRole('ADMIN'), handler)
 *   router.get('/shared',     isLoggedIn, authorizeRole('ADMIN', 'ANALYST'), handler)
 *
 * Roles available in the system: 'ADMIN' | 'ANALYST' | 'WORKER'
 */

const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    // isLoggedIn must have already populated req.user
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: You must be logged in to access this resource.',
      });
    }

    const userRole = user.role;

    if (!userRole) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Your account has no role assigned. Contact an administrator.',
      });
    }

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Role '${userRole}' is not permitted to access this resource. Required: [${allowedRoles.join(', ')}]`,
      });
    }

    // Role is valid — proceed
    next();
  };
};

module.exports = authorizeRole;

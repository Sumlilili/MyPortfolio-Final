import express from 'express';
import userCtrl from '../controllers/user.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

// 🚪 Public route: Sign up
router.route('/api/users')
  .post(userCtrl.create);

// 🛡️ Optional: Admin-only list and removeAll
router.route('/api/users')
  .get(authCtrl.requireSignin, userCtrl.list)       // You can restrict this further by role
  .delete(authCtrl.requireSignin, userCtrl.removeAll); // Admins only in future

// 👤 Get/Update/Delete by userId (requires login + auth)
router.route('/api/users/:userId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

// 📨 Update by email (for example: activate admin role from frontend button)
router.route('/api/users/byemail/:email')
  .put(authCtrl.requireSignin, userCtrl.update);

// Param middleware
router.param('userId', userCtrl.userByID);

export default router;

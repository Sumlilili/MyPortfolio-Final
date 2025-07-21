import express from 'express';
import * as educationCtrl from '../controllers/education.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const { requireSignin, isAdmin } = authCtrl;
const router = express.Router();

router.route('/')
  .get(educationCtrl.list)
  .post(requireSignin, isAdmin, educationCtrl.create)
  .delete(requireSignin, isAdmin, educationCtrl.removeAll);

router.route('/:qualificationId')
  .get(educationCtrl.read)
  .put(requireSignin, isAdmin, educationCtrl.update)
  .delete(requireSignin, isAdmin, educationCtrl.remove);

router.param('qualificationId', educationCtrl.qualificationByID);

export default router;

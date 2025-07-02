import express from 'express';
import * as educationCtrl from '../controllers/education.controller.js';

const router = express.Router();

router.route('/')
  .get(educationCtrl.list)
  .post(educationCtrl.create)
  .delete(educationCtrl.removeAll);

router.route('/:qualificationId')
  .get(educationCtrl.read)
  .put(educationCtrl.update)
  .delete(educationCtrl.remove);

router.param('qualificationId', educationCtrl.qualificationByID);

export default router;

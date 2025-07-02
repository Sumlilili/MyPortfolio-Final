import express from 'express';
import * as projectCtrl from '../controllers/project.controller.js'; // ✅


const router = express.Router();

router.route('/')
  .get(projectCtrl.list)
  .post(projectCtrl.create)
  .delete(projectCtrl.removeAll);

router.route('/:projectId')
  .get(projectCtrl.read)
  .put(projectCtrl.update)
  .delete(projectCtrl.remove);

router.param('projectId', projectCtrl.projectByID);

export default router;

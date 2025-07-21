import express from "express";
import * as contactCtrl from "../controllers/contact.controller.js";
import authCtrl from "../controllers/auth.controller.js";


const router = express.Router();

// Public: Users can only create
router.post("/", contactCtrl.create);

// Admin-only routes
router.route("/")
  .get(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.list)
  .post(contactCtrl.create); // public

router.route("/:contactId")
  .get(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.remove);


router.param("contactId", contactCtrl.contactByID);

export default router;

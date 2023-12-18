// import Express from "express";
// import {getPathologists, getUserPerformance} from '../controllers/management.js'
// const router = Express.Router();

// router.get("/pathologists", getPathologists)
// router.get("/performance/:id", getUserPerformance)
// export default router;

import Express from "express";
import {
  getUserPerformance,
  getPathologists,
  addPathologist,
  updatePathologist,
  deletePathologist,
  getAdmins,
  addAdmin,
  updateAdmin,
  deleteAdmin,
} from "../controllers/management.js";

const router = Express.Router();

router.get("/pathologists", getPathologists);
router.post("/pathologists", addPathologist); // New route for adding pathologists
router.put("/pathologists/:id", updatePathologist); // New route for updating pathologists
router.delete("/pathologists/:id", deletePathologist); // New route for deleting pathologists

router.get("/admins", getAdmins);
router.post("/admins", addAdmin);
router.put("/admins/:id", updateAdmin);
router.delete("/admins/:id", deleteAdmin);

router.get("/performance/:id", getUserPerformance);

export default router;

import { addTeam,getTeam,updateSingle,deleteSingle } from "../controllers/team.controller.js";
import express, { application } from "express";
import teamValid from "../validators/team.valid.js";
import up from "../validators/up.js";
import { upload } from "../middlwares/team.middlware.js";
import varifyToken from "../middlwares/authe.js";

const router = express.Router();

router.use(varifyToken);
router.route("/teams")
.get(getTeam)
.post(upload.single("avatar"),teamValid,addTeam)
.put(upload.single("avatar"),up,updateSingle);

router.route("/teams/:id").delete(deleteSingle);

export default router;

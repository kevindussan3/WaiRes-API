import {Router} from "express";
const router = Router();
import * as authCtrl from "../controllers/auth.controller";
import * as Verficacion from "../middlewares/verifySignup";



router.post('/signup', Verficacion.checkDuplicateIdentificationAndEmail, authCtrl.signup)
router.post('/signin', authCtrl.signin)

export default router;
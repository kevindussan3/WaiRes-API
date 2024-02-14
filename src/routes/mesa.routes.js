import {Router} from "express";
const router = Router();
import * as mesaCtrl from "../controllers/mesa.controller";

router.get('/', mesaCtrl.findAll);
router.get('/:id', mesaCtrl.findOne);
router.post('/', mesaCtrl.create);
router.put('/:id', mesaCtrl.update);
router.delete('/:id', mesaCtrl.deleteOne);


export default router;

import {Router} from "express";
const router = Router();
import * as productoCtrl from "../controllers/producto.controller";

router.get('/', productoCtrl.findAll);
router.get('/:id', productoCtrl.findOne);
router.post('/', productoCtrl.create);
router.put('/:id', productoCtrl.update);
router.delete('/:id', productoCtrl.deleteOne);


export default router;

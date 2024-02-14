import {Router} from "express";
const router = Router();
import * as categoriaCtrl from "../controllers/categoria.controller";

router.get('/', categoriaCtrl.findAll);
router.get('/:id', categoriaCtrl.findOne);
router.post('/', categoriaCtrl.create);
// router.put('/:id', categoriaCtrl.update);
router.delete('/:id', categoriaCtrl.deleteOne);

export default router;
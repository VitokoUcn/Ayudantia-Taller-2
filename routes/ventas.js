import express from 'express';
import { validateVenta } from '../middlewares/validateVenta.js';
import { crearVenta } from '../controllers/ventaController.js';

const router = express.Router();
router.post('/', validateVenta, crearVenta);

export default router;
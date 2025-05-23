import { Router } from 'express';
import {
  obtenerClientes,
  obtenerClientePorId,
  registrarCliente,
  actualizarCliente,
  eliminarCliente
} from '../controllers/clienteController.js';

const router = Router();

router.get('/', obtenerClientes);
router.get('/:id', obtenerClientePorId);
router.post('/', registrarCliente);
router.put('/:id', actualizarCliente);
router.delete('/:id', eliminarCliente);


export default router;


// src/controllers/clienteController.js
import {
  getAllClientes,
  getClientesNormales,
  getClientesPremium,
  getClienteById,
  createCliente,
  updateCliente,
  updateEstadoCliente,
  deleteCliente
} from '../models/clienteModel.js';

/**
 * 11 / 9 / 10. Listar clientes:
 * - Todos:      GET /api/cliente
 * - Normales:   GET /api/cliente?type=normal  o bien GET /api/cliente/normales
 * - Premium:    GET /api/cliente?type=premium o bien GET /api/cliente/premium
 */
export const obtenerClientes = (req, res) => {
  const type = req.query.type; // '1', '2' o undefined

  const cb = (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  };

  if (type === '1') {
    getClientesNormales(cb);
  } else if (type === '2') {
    getClientesPremium(cb);
  } else {
    getAllClientes(cb);
  }
};

/**
 * Obtener un cliente por su ID
 */
export const obtenerClientePorId = (req, res) => {
  const { id } = req.params;
  getClienteById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.json(results[0]);
  });
};

/**
 * 7. Registrar un nuevo cliente
 */
export const registrarCliente = (req, res) => {
  createCliente(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res
      .status(201)
      .json({ message: 'Cliente creado', cliente_id: result.insertId });
  });
};

/**
 * 2. Actualizar datos completos de un cliente
 */
export const actualizarCliente = (req, res) => {
  const { id } = req.params;
  const { nombre, ciudad, tipo } = req.body;
  updateCliente(id, { nombre, ciudad, tipo }, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.json({ message: 'Cliente actualizado' });
  });
};

/**
 * 6. Actualizar sólo el estado/tipo de un cliente
 */
export const actualizarEstadoCliente = (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // espera { status: 'premium' } o 'normal' o 'inactive'
  updateEstadoCliente(id, status, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.json({ message: 'Estado del cliente actualizado' });
  });
};

/**
 * 5. Eliminar (desactivar) un cliente
 */
export const eliminarCliente = (req, res) => {
  const { id } = req.params;
  deleteCliente(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.json({ message: 'Cliente desactivado' });
  });
};

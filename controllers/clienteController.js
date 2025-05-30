// Controlador de Clientes:
// Define las funciones que manejan la lógica de negocio para las rutas de clientes,
// conectando las peticiones con el modelo (base de datos).

// Importamos las funciones del modelo que interactúan con la base de datos.
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
 * Listar clientes.
 * - Si se pasa query type=1: solo clientes normales.
 * - Si type=2: solo clientes premium.
 * - Si no hay type: todos los clientes.
 * Endpoint: GET /api/cliente?type={1|2}
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
 * Obtener un cliente por ID.
 * - Lee el parámetro :id de la ruta.
 * - Devuelve 404 si no existe.
 * Endpoint: GET /api/cliente/:id
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
 * Registrar un nuevo cliente.
 * - Espera en req.body un objeto { nombre, ciudad, tipo }.
 * - Inserta el registro y devuelve el insertId.
 * Endpoint: POST /api/cliente
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
 * Actualizar datos de un cliente.
 * - Lee :id de req.params y { nombre, ciudad, tipo } de req.body.
 * - Devuelve 404 si no encuentra el cliente.
 * Endpoint: PUT /api/cliente/:id
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
 * Actualizar solo el estado/tipo de un cliente.
 * - Lee :id y espera { status } en req.body.
 * - Útil para cambiar cliente a 'premium', 'normal' o 'inactive'.
 * Endpoint: PUT /api/cliente/:id/estado
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
 * Desactivar (eliminar) un cliente.
 * - Lee :id de la ruta.
 * - Implementa un soft delete (flag de desactivación) o eliminación física.
 * Endpoint: DELETE /api/cliente/:id
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

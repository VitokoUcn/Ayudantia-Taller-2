import {
    getAllClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente
  } from '../models/clienteModel.js';
  
  export const obtenerClientes = (req, res) => {
    getAllClientes((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  };
  
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
  
  export const registrarCliente = (req, res) => {
    createCliente(req.body, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res
        .status(201)
        .json({ message: 'Cliente creado', cliente_id: result.insertId });
    });
  };
  
  /**
   * Actualiza la información de un cliente existente.
   *
   * @function
   * @param {Object} req - Objeto de solicitud HTTP, debe contener el ID del cliente en params y los datos a actualizar en body.
   * @param {Object} res - Objeto de respuesta HTTP.
   * @returns {void}
   *
   * @description
   * Busca un cliente por su ID y actualiza sus datos con la información proporcionada en el cuerpo de la solicitud.
   * Si el cliente no existe, responde con un error 404.
   * Si ocurre un error en la actualización, responde con un error 500.
   * Si la actualización es exitosa, responde con un mensaje de confirmación.
   */
  export const actualizarCliente = (req, res) => {
    const { id } = req.params;
    updateCliente(id, req.body, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }
      res.json({ message: 'Cliente actualizado' });
    });
  };
  
  export const eliminarCliente = (req, res) => {
    const { id } = req.params;
    deleteCliente(id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }
      res.json({ message: 'Cliente eliminado' });
    });
  };
  
import db from '../config/db.js';

export const getAllVentas = (callback) => {
  db.query('SELECT * FROM ventas', callback);
};

export const getVentaById = (id, callback) => {
  db.query('SELECT * FROM ventas WHERE id = ?', [id], callback);
};

/**
 * Crea una nueva venta en la base de datos.
 *
 * @param {Object} ventaData - Datos de la venta a registrar.
 * @param {number} ventaData.Clienteid - ID del cliente asociado a la venta.
 * @param {number} ventaData.total - Monto total de la venta.
 * @param {function} callback - Función de callback que maneja la respuesta de la consulta.
 */
export const createVenta = (ventaData, callback) => {
  const { Clienteid, total } = ventaData;
  db.query(
    'INSERT INTO ventas (Clienteid, fecha, total) VALUES (?, NOW(), ?)',
    [Clienteid, total],
    callback
  );
};

/**
 * Crea un nuevo registro en la tabla detalleVenta.
 *
 * @param {Object} detalleData - Datos del detalle de la venta.
 * @param {number} detalleData.Ventasid - ID de la venta asociada.
 * @param {number} detalleData.Productosid - ID del producto vendido.
 * @param {number} detalleData.cantidad - Cantidad de productos vendidos.
 * @param {number} detalleData.subtotal - Subtotal de la venta para este producto.
 * @param {function} callback - Función de callback que maneja el resultado de la consulta.
 */
export const createDetalleVenta = (detalleData, callback) => {
  const { Ventasid, Productosid, cantidad, subtotal } = detalleData;
  db.query(
    'INSERT INTO detalleVenta (Ventasid, Productosid, cantidad, subtotal) VALUES (?, ?, ?, ?)',
    [Ventasid, Productosid, cantidad, subtotal],
    callback
  );
};

export const updateVenta = (id, ventaData, callback) => {
  const { total } = ventaData;
  db.query(
    'UPDATE ventas SET total = ? WHERE id = ?',
    [total, id],
    callback
  );
};

export const deleteVenta = (id, callback) => {
  db.query(
    'DELETE FROM ventas WHERE id = ?',
    [id],
    callback
  );
};

import * as ventaModel from '../models/ventaModel.js';

/**
 * 7. Registrar un nuevo pedido/venta
 * POST /api/venta
 */
export const crearVenta = (req, res) => {
  const { clienteId, productos } = req.body;
  if (!clienteId || !Array.isArray(productos) || productos.length === 0) {
    return res.status(400).json({ error: 'clienteId y productos son obligatorios' });
  }

  // Calcula el total
  const total = productos.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  // Inserta cabecera de venta
  ventaModel.createVenta({ clienteId, total }, (err, result) => {
    if (err) {
      console.error('Error creando venta:', err);
      return res.status(500).json({ error: 'Error interno al crear la venta' });
    }
    const ventaId = result.insertId;

    // Inserta cada línea de detalleVenta
    productos.forEach(item => {
      const subtotal = item.precio * item.cantidad;
      ventaModel.createDetalleVenta(
        {
          ventaId,
          productoId: item.id,
          cantidad: item.cantidad,
          subtotal
        },
        errDet => {
          if (errDet) {
            console.error(`Error al crear detalle para venta ${ventaId}:`, errDet);
          }
        }
      );
    });
    // Responde con el id de la venta y el total
    res.status(201).json({ ventaId, total });
  });
};
/**
 * 8. Consultar detalle de pedidos de un cliente específico para una fecha determinada
 * GET /api/venta/cliente/:clienteId/fecha/:fecha
 */
export const obtenerVentasPorClienteFecha = (req, res) => {
  const { clienteId, fecha } = req.params;
  if (!clienteId || !fecha) {
    return res
      .status(400)
      .json({ error: 'Se requieren clienteId y fecha en la ruta (YYYY-MM-DD)' });
  }

  ventaModel.getVentasPorClienteFecha(clienteId, fecha, (err, rows) => {
    if (err) {
      console.error('Error consultando ventas:', err);
      return res.status(500).json({ error: 'Error interno al consultar ventas' });
    }
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: 'No se encontraron ventas para ese cliente y fecha' });
    }
    res.json(rows);
  });
};
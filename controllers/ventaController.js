import * as ventaModel from '../models/ventaModel.js';

export function crearVenta(req, res) {
  // Extrae Clienteid y productos del cuerpo de la petición
  const { Clienteid, productos } = req.body;

  // Calcula el total sumando (precio * cantidad) de cada producto, redondeado a 2 decimales
  const total = Math.round(
    productos.reduce((sum, item) => sum + item.precio * item.cantidad, 0) * 100
  ) / 100;

  // Crea la venta en la base de datos usando el modelo ventaModel
  ventaModel.createVenta({ Clienteid, total }, (err, result) => {
    if (err) {
      // Si hay error al crear la venta, lo muestra y responde con error 500
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    // Obtiene el ID de la venta recién creada
    const Ventasid = result.insertId;

    // Por cada producto, crea un detalle de venta asociado a la venta principal
    productos.forEach(item => {
      // Calcula el subtotal de cada producto (precio * cantidad), redondeado a 2 decimales
      const subtotal = Math.round(item.precio * item.cantidad * 100) / 100;
      // Inserta el detalle de la venta en la base de datos
      ventaModel.createDetalleVenta(
        { Ventasid, Productosid: item.id, cantidad: item.cantidad, subtotal },
        (errDet) => {
          // Si hay error al insertar el detalle, lo muestra en consola
          if (errDet) console.error('Error detalleVenta:', errDet);
        }
      );
    });

    // Responde al cliente con el ID de la venta y el total calculado
    res.status(201).json({ Ventasid, total });
  });
}

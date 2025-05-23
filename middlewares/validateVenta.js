/**
 * Middleware que valida el cuerpo de la solicitud para registrar una venta.
 * 
 * Verifica que el campo `productos` sea un arreglo no vacío y que cada producto tenga:
 * - `id`: cadena de texto.
 * - `cantidad`: número mayor o igual a 1.
 * - `precio`: número mayor o igual a 0.
 * 
 * Si hay errores de validación, responde con estado 400 y detalles de los errores.
 * Si no hay errores, continúa con el siguiente middleware.
 * 
 * @param {import('express').Request} req - Objeto de solicitud HTTP.
 * @param {import('express').Response} res - Objeto de respuesta HTTP.
 * @param {import('express').NextFunction} next - Función para pasar al siguiente middleware.
 */
export function validateVenta(req, res, next) {
  const {  productos } = req.body;
  const errors = [];

  
  if (!Array.isArray(productos) || productos.length === 0) {
    errors.push({ field: 'productos', message: 'Debe listar al menos un ítem.' });
  } else {
    productos.forEach((item, idx) => {
      if (typeof item.id !== 'string') errors.push({ field: `productos[${idx}].id`, message: 'El id debe ser una cadena.' });
      if (typeof item.cantidad !== 'number' || item.cantidad < 1) errors.push({ field: `productos[${idx}].cantidad`, message: 'La cantidad debe ser un número mayor o igual a 1.' });
      if (typeof item.precio !== 'number' || item.precio < 0) errors.push({ field: `productos[${idx}].precio`, message: 'El precio debe ser un número mayor a 0.' });
    });
  }

  if (errors.length) {
    return res.status(400).json({ error: 'Bad Request', details: errors });
  }
  next();
}
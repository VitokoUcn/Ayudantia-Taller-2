# Ayudantia-Taller-2
# Backend - Vitoko's Coffee API

Bienvenido al repositorio del backend de Vitoko’s Coffee, construido con **Node.js**, **Express.js** y **MySQL**. Este proyecto ofrece una API RESTful amigable para quienes se inician en el desarrollo de backend con Node.

---

## 📝 Descripción

Vitoko’s Coffee es una cafetería que ofrece cafés especiales, tés, pastelería y snacks. Esta API permite:

* Gestionar productos (CRUD).
* Gestionar clientes (normales y Premium).
* Registrar ventas con cálculo de descuentos y propinas.
* Consultar detalles de pedidos por cliente y fecha.

---

## 🚀 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

* [Node.js](https://nodejs.org/) (versión 16 o superior)
* [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
* [MySQL 8.0](https://dev.mysql.com/downloads/mysql/)

---

## 🛠️ Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/VitokoUcn/Ayudantia-Taller-2.git
   cd vitoko-coffee-backend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. En config/db.js asegurate de ajustar las siguientes variables:
```
  host: 'localhost',
  user: 'tu usuario',
  password: 'tu contraseña',
  database: 'nombre de tu database'

```
4. Asegúrate de crear la base de datos y ejecutar los scripts de esquema y datos de prueba (ubicados en `/database`).

---

## 📂 Estructura de carpetas

```
vitoko-coffee-backend/
├── src/
│   ├── config/        # Configuración de base de datos y variables de entorno
│   ├── controllers/   # Lógica que recibe y responde solicitudes HTTP
│   ├── routes/        # Definición de rutas y vinculación con controladores
│   ├── models/        # Definición de tablas y consultas SQL
│   └── server.js      # Punto de entrada de la aplicación
├── .env.example       # Ejemplo de variables de entorno
├── package.json
└── README.md
```

---

## ⚙️ Scripts disponibles

* `npm run dev`: Inicia el servidor en modo desarrollo (con `nodemon`).
* `npm start`: Inicia el servidor en modo producción.
* `npm test`: Ejecuta pruebas automatizadas (si las hubiere).

---

## 📡 Uso

Arranca el servidor:

```bash
npm run dev
```

Luego abre tu cliente HTTP (Postman) y prueba (Asegurate que las rutas coincidan):

### Productos

* **Listar todos**

  ```http
  GET http://localhost:3000/api/productos
  ```
* **Crear producto**

  ```http
  POST http://localhost:3000/api/productos
  Content-Type: application/json

  {
    "codigo": "1'",
    "nombre": "Espresso",
    "precio": 1200,
    "stock": 50
  }
  ```

### Clientes

* **Listar clientes normales**

  ```http
  GET http://localhost:3000/api/cliente/normales
  ```
* **Listar clientes Premium**

  ```http
  GET http://localhost:3000/api/cliente/premium
  ```
* **Registrar cliente**

  ```http
  POST http://localhost:3000/api/clientes
  Content-Type: application/json

  {
    "nombre": "Ana",
    "ciudad": "Santiago",
    "tipo": "2"
  }
  ```

### Ventas

* **Registrar venta**

  ```http
  POST http://localhost:3000/api/ventas
  Content-Type: application/json

  {
    "clienteId": "1",
    "productos": [
      { "id": "1", "cantidad": 2, "precio": 1500 },
      { "id": "2", "cantidad": 1, "precio": 2500 }
    ]
  }
  ```
* **Consultar ventas de un cliente en una fecha**

  ```http
  GET http://localhost:3000/api/venta/clienteId/1/fecha/2025-05-29
  ```

---

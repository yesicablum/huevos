# 🥚 Avícola Llano Grande SAS - Sistema de Gestión

Sistema web para gestionar el inventario y ventas de huevos de la Avícola Llano Grande SAS. Desarrollado con React y Vite para proporcionar una interfaz moderna y eficiente.

## 📋 Características

- **Gestión de Inventario**: Seguimiento en tiempo real del stock de huevos por color (rojos y blancos) y tamaño (A, AA, B, EXTRA).
- **Registro de Huevos**: Interfaz para añadir nuevos huevos al inventario clasificados por tipo y cantidad.
- **Sistema de Ventas**: Proceso completo para generar ventas a clientes, con opciones de venta por cubeta (30 unidades) o docena (12 unidades).
- **Interfaz Intuitiva**: Diseño moderno y responsive para facilitar la navegación y operación del sistema.

## 🚀 Inicio Rápido

### Requisitos previos

- Node.js (versión 18.x o superior)
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/yesicablum/huevos.git

# Navegar al directorio del proyecto
cd huevos

# Instalar dependencias
npm install
# o
yarn
```

### Ejecución para desarrollo

```bash
# Iniciar el servidor de desarrollo
npm run dev
# o
yarn dev
```

La aplicación estará disponible en `http://localhost:5173` por defecto.

### Compilación para producción

```bash
# Construir la aplicación para producción
npm run build
# o
yarn build

# Previsualizar la versión de producción
npm run preview
# o
yarn preview
```

## 🛠️ Tecnologías

- **React 19**: Biblioteca de UI para construir interfaces de usuario
- **React Router 7**: Sistema de enrutamiento para aplicaciones React
- **Vite 6**: Empaquetador y servidor de desarrollo ultrarrápido
- **Axios**: Cliente HTTP para realizar peticiones a APIs
- **Font Awesome**: Biblioteca de iconos vectoriales

## 📁 Estructura del proyecto

```
huevos/
├── public/            # Archivos estáticos
├── src/
│   ├── assets/        # Recursos como imágenes, SVGs
│   ├── components/    # Componentes reutilizables
│   │   ├── Card.jsx  
│   │   └── Navbar.jsx
│   ├── pages/         # Páginas/vistas de la aplicación
│   │   ├── Home.jsx
│   │   ├── Inventory.jsx
│   │   ├── Register.jsx
│   │   └── Sales.jsx
│   ├── App.css        # Estilos principales
│   ├── App.jsx        # Componente principal
│   └── main.jsx       # Punto de entrada
├── .gitignore
├── index.html         # Plantilla HTML
├── package.json       # Dependencias y scripts
├── vite.config.js     # Configuración de Vite
└── README.md          # Este archivo
```

## 🔧 Configuración del backend

Esta aplicación frontend está diseñada para conectarse a un backend mediante API REST. Asegúrate de configurar correctamente las URLs de API en los archivos:

- `src/pages/Inventory.jsx`
- `src/pages/Register.jsx`

Por defecto, se conecta a `http://localhost:8000/api/`.

## 🤝 Contribución

1. Haz un Fork del proyecto
2. Crea una rama para tu función (`git checkout -b feature/amazing-feature`)
3. Realiza tus cambios y haz commit (`git commit -m 'Add some amazing feature'`)
4. Sube tus cambios (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia [especificar licencia]. Consulta el archivo `LICENSE` para más detalles.

## 📧 Contacto

Yesica Blum - [yesicablum@example.com](mailto:yesicablum@example.com)

Enlace del proyecto: [https://github.com/yesicablum/huevos](https://github.com/yesicablum/huevos)

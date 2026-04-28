# Fullstack Challenge E-commerce

**Autor:** Paula Andrea Calderon

Proyecto de e-commerce desarrollado con React, Vite y Tailwind CSS. Incluye catálogo con búsqueda, carrito persistente, checkout simulado y autenticación local.

## Tecnologías y lenguajes
- React + Vite
- JavaScript (ES6+)
- Tailwind CSS
- React Router
- Zustand
- Axios

## Estructura del proyecto
```text
src/
├── components/
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── templates/
├── pages/
├── mockdata/
├── store/
└── styles/
```

## Funcionalidades
- Catálogo de productos con FakeStore API
- Búsqueda en tiempo real
- Paginación de productos
- Carrito con cantidades, totales y persistencia
- Checkout simulado
- Login/Registro local con localStorage
- Rutas protegidas

## Scripts
```bash
npm install
npm run dev
npm run build
npm run preview
npm run deploy
```

## Deploy (GitHub Pages)
1. Configurar GitHub Pages para publicar desde la rama `gh-pages`.
2. Ejecutar el deploy:
```bash
npm run deploy
```

Live: https://paucq.github.io/E-commerce-React/

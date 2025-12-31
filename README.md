# ☕ El Rincón del Café Aromático

E-commerce completo para una tienda de café de especialidad.

## 📋 Descripción

El Rincón del Café Aromático es una aplicación web de comercio electrónico para una cafetería especializada. Permite a los usuarios explorar el catálogo de cafés, agregar productos al carrito, realizar pedidos y gestionar su perfil. Incluye un panel de administración completo.

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático
- **Vite** - Build tool
- **React Router DOM** - Navegación SPA
- **Tailwind CSS** - Framework de estilos

## 📁 Estructura del Proyecto

```
el-rincón-del-café-aromático/
├── components/
│   ├── auth/           # Componentes de autenticación
│   └── layout/         # Layouts (Main y Admin)
├── contexts/
│   ├── AuthContext.tsx # Contexto de autenticación
│   └── CartContext.tsx # Contexto del carrito
├── data/
│   └── products.ts     # Datos de productos
├── hooks/              # Custom hooks
├── pages/
│   ├── admin/          # Páginas de administración
│   │   ├── Dashboard.tsx
│   │   ├── ProductManagement.tsx
│   │   ├── OrderManagement.tsx
│   │   └── CustomerManagement.tsx
│   ├── About.tsx       # Sobre nosotros
│   ├── Cart.tsx        # Carrito
│   ├── Checkout.tsx    # Proceso de pago
│   ├── Contact.tsx     # Contacto
│   ├── Home.tsx        # Inicio
│   ├── Login.tsx       # Iniciar sesión
│   ├── Menu.tsx        # Catálogo
│   ├── ProductDetail.tsx # Detalle de producto
│   ├── Profile.tsx     # Perfil de usuario
│   └── Register.tsx    # Registro
├── services/           # Servicios de datos
├── App.tsx             # Componente principal
├── index.tsx           # Punto de entrada
└── types.ts            # Definiciones de tipos
```

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Node.js (v18 o superior)
- npm o yarn

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd el-rincón-del-café-aromático
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

## ✨ Funcionalidades

### Para Clientes
- **Catálogo de productos** - Explorar cafés por categoría
- **Carrito de compras** - Agregar, modificar y eliminar productos
- **Proceso de checkout** - Finalizar pedido con dirección de envío
- **Perfil de usuario** - Ver historial de pedidos

### Para Administradores
- **Dashboard** - Vista general de métricas
- **Gestión de productos** - CRUD completo de cafés
- **Gestión de pedidos** - Cambiar estados de órdenes
- **Gestión de clientes** - Ver información de usuarios

## 📦 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run preview` | Previsualiza el build |

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

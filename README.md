# Vue E-commerce Store

Modern e-commerce application built with Vue.js 3, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Product Catalog** - Browse and search products
- **Shopping Cart** - Add/remove items, quantity management
- **User Authentication** - Login, registration, user profiles
- **Payment Integration** - Secure checkout process
- **Order Management** - Order history and tracking
- **Responsive Design** - Works on all devices

## 🛠️ Tech Stack

- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Pinia** for state management
- **Vue Router** for navigation
- **Tailwind CSS** for styling
- **Vite** for build tooling

## 📦 Installation

```bash
npm install
npm run dev
```

## 🌐 Deployment

Ready for deployment on Netlify:

1. Push to GitHub
2. Connect to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

## 🎯 Key Components

- Product grid with filtering and sorting
- Shopping cart with persistent storage
- User authentication system
- Checkout flow with form validation
- Order confirmation and tracking

## 🔧 Environment Variables

Create `.env` file:
```
VITE_API_URL=your_api_endpoint
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```
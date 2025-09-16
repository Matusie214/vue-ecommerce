# Vue E-commerce Store

A modern e-commerce application built with Vue 3, TypeScript, and Supabase.

## Features

- **Product Catalog**: Browse products with search, filtering, and sorting
- **Shopping Cart**: Add/remove items, update quantities
- **User Authentication**: Register, login, logout with Supabase Auth
- **Order Management**: Create and track orders
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Database Integration**: Real-time data with Supabase PostgreSQL

## Tech Stack

- **Frontend**: Vue 3, TypeScript, Vite
- **State Management**: Pinia
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/ecommerce-vue-store.git
cd ecommerce-vue-store
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up the database:
   - Go to your Supabase project
   - Run the SQL commands from `database.sql` in the SQL editor

5. Start the development server:
```bash
npm run dev
```

## Deployment

### Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variables in Netlify dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## Demo Credentials

When Supabase is not configured, the app runs in demo mode with these credentials:

- **Email**: demo@example.com
- **Password**: demo123

## Features Overview

### Authentication
- User registration and login
- Protected routes
- Session persistence
- Row Level Security (RLS) policies

### Products
- Product listing with pagination
- Search by name/description
- Filter by category and price range
- Sort by various criteria

### Shopping Cart
- Add/remove products
- Update quantities
- Persistent cart state
- Cart summary

### Orders
- Checkout flow with billing information
- Mock payment processing
- Order history
- Order tracking

## Database Schema

- **users**: User profiles
- **products**: Product catalog
- **orders**: Order records
- **order_items**: Order line items

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
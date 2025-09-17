# Vue E-commerce Store

A modern e-commerce application built with Vue 3, TypeScript, and Supabase with advanced inventory management and product galleries.

## Features

- **Product Catalog**: Browse products with search, filtering, and sorting
- **Advanced Inventory Management**: Real-time stock tracking with conditional purchase flows
- **Product Galleries**: Multi-image product galleries with professional photography
- **Stock Notifications**: Email alerts when out-of-stock items become available
- **Smart Shopping Cart**: Add to cart when in stock, order requests when out of stock
- **User Authentication**: Register, login, logout with Supabase Auth
- **Review System**: Customer reviews and star ratings
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

## Supabase Setup

This application requires a Supabase project for authentication and data storage.

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Wait for the project to be set up (usually takes 2-3 minutes)

### 2. Configure Environment Variables

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy your project URL and anon key
3. Update your `.env` file:

```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**Important**: Use the `anon` key, NOT the `service_role` key for security.

### 3. Set Up Database

1. In your Supabase project, go to **SQL Editor**
2. Copy and paste the entire contents of `database.sql` 
3. Click "Run" to create all tables and policies

### 4. Create Admin User

After setting up the database, you can create an admin user:

1. Register a new account through the app's signup page
2. In Supabase dashboard, go to **Table Editor** → **users**
3. Find your user record and change the `role` from `user` to `admin`
4. Now you'll have access to the Admin Panel in the application

## Features Overview

### Authentication & Authorization
- User registration and login with Supabase Auth
- Role-based access control (user/admin)
- Protected routes and admin-only features
- Session persistence
- Row Level Security (RLS) policies
- Admin panel for managing products, orders, and notifications

### Products
- Product listing with advanced filtering and search
- Search by name/description
- Filter by category, price range, and stock availability
- Sort by various criteria (name, price, category)
- Product image galleries with multiple high-quality photos
- Detailed product specifications and descriptions
- Real-time stock quantity display

### Shopping Cart & Inventory
- **In Stock Products**: Standard add to cart functionality
- **Out of Stock Products**: "Notify Me" form for stock alerts
- Update quantities for available items
- Persistent cart state
- Cart summary with real-time stock validation
- Visual stock indicators (green/red status dots)

### Orders
- Checkout flow with billing information
- Mock payment processing
- Order history
- Order tracking

## Database Schema

- **users**: User profiles linked to Supabase Auth
- **products**: Product catalog with stock tracking, images, and specifications
- **product_reviews**: Customer reviews with ratings and comments
- **stock_notifications**: Email notifications for out-of-stock products
- **orders**: Order records with status tracking
- **order_items**: Order line items with quantity and pricing

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
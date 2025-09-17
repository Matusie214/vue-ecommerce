-- MINIMAL DATABASE SETUP - NO TRIGGERS
-- This version creates tables without automatic user profile creation
-- Users will be created manually by the application

-- Users table (extends Supabase auth.users)
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    avatar_url VARCHAR(500),
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table with enhanced features
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100),
    image VARCHAR(500),
    emoji VARCHAR(10),
    stock_quantity INTEGER DEFAULT 0,
    images JSONB DEFAULT '[]'::jsonb,
    specifications JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product reviews table
CREATE TABLE product_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    user_name VARCHAR(255) NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Stock notifications table
CREATE TABLE stock_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    user_email VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    message TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'notified', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    total DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

-- Insert sample products
INSERT INTO products (name, description, price, category, image, emoji, stock_quantity, images, specifications) VALUES
('Wireless Headphones', 'Premium noise-cancelling headphones with superior sound quality', 199.00, 'electronics', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', '🎧', 15, '["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500", "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500", "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=500"]'::jsonb, '{"Battery Life": "30 hours", "Wireless Range": "10 meters", "Noise Cancellation": "Active", "Weight": "250g"}'::jsonb),
('Smart Watch', 'Advanced fitness tracking and notifications on your wrist', 299.00, 'electronics', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', '⌚', 8, '["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500", "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500", "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500"]'::jsonb, '{"Display": "1.4\" AMOLED", "Battery Life": "7 days", "Water Resistance": "5ATM", "GPS": "Built-in"}'::jsonb),
('Coffee Maker', 'Automatic drip coffee maker with programmable timer', 149.00, 'home', 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=500', '☕', 12, '["https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=500", "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500"]'::jsonb, '{"Capacity": "12 cups", "Material": "Stainless Steel", "Auto Shut-off": "2 hours", "Filter Type": "Permanent"}'::jsonb),
('Backpack', 'Durable travel backpack with multiple compartments', 79.00, 'accessories', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500', '🎒', 0, '["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500", "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=500"]'::jsonb, '{"Capacity": "30L", "Material": "Waterproof Nylon", "Laptop Compartment": "15.6 inch", "Weight": "1.2kg"}'::jsonb),
('Smartphone', 'Latest flagship smartphone with advanced camera system', 699.00, 'electronics', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500', '📱', 3, '["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500", "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500", "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500"]'::jsonb, '{"Screen Size": "6.1 inch", "Storage": "128GB", "Camera": "48MP Triple", "Battery": "4000mAh"}'::jsonb),
('Sunglasses', 'UV protection sunglasses with polarized lenses', 89.00, 'accessories', 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500', '🕶️', 0, '["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500", "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"]'::jsonb, '{"UV Protection": "100% UV400", "Lens Type": "Polarized", "Frame Material": "Titanium", "Style": "Aviator"}'::jsonb);

-- Enable RLS with very permissive policies for testing
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Very permissive policies for initial testing
CREATE POLICY "Allow all for authenticated users" ON users FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Public read access to products" ON products FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Authenticated can manage products" ON products FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can manage reviews" ON product_reviews FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can manage notifications" ON stock_notifications FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can manage orders" ON orders FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can manage order items" ON order_items FOR ALL TO authenticated USING (true) WITH CHECK (true);
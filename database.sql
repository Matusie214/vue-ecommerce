-- Create tables for E-commerce application

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

-- Create admin user function
CREATE OR REPLACE FUNCTION create_admin_user(
    admin_email TEXT,
    admin_password TEXT,
    admin_full_name TEXT
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    new_user_id UUID;
BEGIN
    -- This function should be called from a secure environment
    -- Create auth user (this would normally be done via Supabase Auth API)
    INSERT INTO users (id, email, full_name, role)
    VALUES (
        gen_random_uuid(),
        admin_email,
        admin_full_name,
        'admin'
    )
    RETURNING id INTO new_user_id;
    
    RETURN new_user_id;
END;
$$;

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
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    user_name VARCHAR(255) NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Stock notifications table
CREATE TABLE stock_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    user_email VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    message TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'notified', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    total DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

-- Insert sample products with enhanced data and gallery images
INSERT INTO products (name, description, price, category, image, emoji, stock_quantity, images, specifications) VALUES
('Wireless Headphones', 'Premium noise-cancelling headphones with superior sound quality', 199.00, 'electronics', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', '🎧', 15, '["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500", "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500", "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=500"]'::jsonb, '{"Battery Life": "30 hours", "Wireless Range": "10 meters", "Noise Cancellation": "Active", "Weight": "250g"}'::jsonb),
('Smart Watch', 'Advanced fitness tracking and notifications on your wrist', 299.00, 'electronics', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', '⌚', 8, '["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500", "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500", "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500"]'::jsonb, '{"Display": "1.4\" AMOLED", "Battery Life": "7 days", "Water Resistance": "5ATM", "GPS": "Built-in"}'::jsonb),
('Coffee Maker', 'Automatic drip coffee maker with programmable timer', 149.00, 'home', 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=500', '☕', 12, '["https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=500", "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500"]'::jsonb, '{"Capacity": "12 cups", "Material": "Stainless Steel", "Auto Shut-off": "2 hours", "Filter Type": "Permanent"}'::jsonb),
('Backpack', 'Durable travel backpack with multiple compartments', 79.00, 'accessories', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500', '🎒', 0, '["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500", "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=500"]'::jsonb, '{"Capacity": "30L", "Material": "Waterproof Nylon", "Laptop Compartment": "15.6 inch", "Weight": "1.2kg"}'::jsonb),
('Smartphone', 'Latest flagship smartphone with advanced camera system', 699.00, 'electronics', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500', '📱', 3, '["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500", "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500", "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500"]'::jsonb, '{"Screen Size": "6.1 inch", "Storage": "128GB", "Camera": "48MP Triple", "Battery": "4000mAh"}'::jsonb),
('Sneakers', 'Comfortable running shoes with advanced cushioning', 129.00, 'fashion', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500', '👟', 20, '["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500", "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500"]'::jsonb, '{"Material": "Mesh Upper", "Sole Type": "Rubber", "Cushioning": "Air Cushion", "Sizes": "36-46"}'::jsonb),
('Laptop', 'High-performance laptop for work and gaming', 999.00, 'electronics', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500', '💻', 5, '["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500", "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500", "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500"]'::jsonb, '{"Processor": "Intel i7", "RAM": "16GB", "Storage": "512GB SSD", "Graphics": "NVIDIA GTX"}'::jsonb),
('Sunglasses', 'UV protection sunglasses with polarized lenses', 89.00, 'accessories', 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500', '🕶️', 0, '["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500", "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"]'::jsonb, '{"UV Protection": "100% UV400", "Lens Type": "Polarized", "Frame Material": "Titanium", "Style": "Aviator"}'::jsonb),
('Gaming Mouse', 'High-precision gaming mouse with customizable buttons', 59.00, 'electronics', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500', '🖱️', 25, '["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500", "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500"]'::jsonb, '{"DPI": "16000", "Buttons": "8 Programmable", "Sensor": "Optical", "Cable Length": "1.8m"}'::jsonb),
('Plant Pot', 'Ceramic decorative plant pot with drainage holes', 25.00, 'home', 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500', '🪴', 30, '["https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500", "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500"]'::jsonb, '{"Material": "Ceramic", "Size": "15cm diameter", "Drainage": "Yes", "Color": "Terracotta"}'::jsonb),
('Wallet', 'Leather bi-fold wallet with RFID protection', 45.00, 'accessories', 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500', '👛', 18, '["https://images.unsplash.com/photo-1627123424574-724758594e93?w=500", "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500"]'::jsonb, '{"Material": "Genuine Leather", "Card Slots": "8", "RFID Protection": "Yes", "Dimensions": "11x9x2 cm"}'::jsonb),
('T-Shirt', 'Cotton crew neck t-shirt in various colors', 29.00, 'fashion', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500', '👕', 50, '["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500", "https://images.unsplash.com/photo-1583743089695-4b816a340f82?w=500", "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500"]'::jsonb, '{"Material": "100% Cotton", "Fit": "Regular", "Care": "Machine Washable", "Sizes": "S, M, L, XL"}'::jsonb);

-- Insert sample reviews
INSERT INTO product_reviews (product_id, user_id, user_name, rating, comment) VALUES
(1, gen_random_uuid(), 'Demo User', 5, 'Excellent headphones! Great sound quality and comfortable to wear for long periods.'),
(1, gen_random_uuid(), 'John Doe', 4, 'Very good noise cancellation. Battery life is as advertised.'),
(2, gen_random_uuid(), 'Demo User', 5, 'Perfect smartwatch for fitness tracking. Love the heart rate monitor!'),
(5, gen_random_uuid(), 'Alice Smith', 4, 'Great camera quality and fast performance. Highly recommended!');

-- Row Level Security policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Users can only see their own orders
CREATE POLICY "Users can view own orders" ON orders
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders" ON orders
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only see order items for their orders
CREATE POLICY "Users can view own order items" ON order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM orders 
            WHERE orders.id = order_items.order_id 
            AND orders.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create order items for own orders" ON order_items
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM orders 
            WHERE orders.id = order_items.order_id 
            AND orders.user_id = auth.uid()
        )
    );

-- Products policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Everyone can view products
CREATE POLICY "Products are viewable by everyone" ON products
    FOR SELECT TO authenticated, anon USING (true);

-- Only admins can manage products
CREATE POLICY "Admins can insert products" ON products
    FOR INSERT TO authenticated WITH CHECK (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'admin'
        )
    );

CREATE POLICY "Admins can update products" ON products
    FOR UPDATE TO authenticated USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'admin'
        )
    );

CREATE POLICY "Admins can delete products" ON products
    FOR DELETE TO authenticated USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'admin'
        )
    );

-- Reviews and notifications policies for admins
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_notifications ENABLE ROW LEVEL SECURITY;

-- Everyone can view reviews
CREATE POLICY "Reviews are viewable by everyone" ON product_reviews
    FOR SELECT TO authenticated, anon USING (true);

-- Authenticated users can add reviews
CREATE POLICY "Authenticated users can add reviews" ON product_reviews
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Users can only delete their own reviews, admins can delete any
CREATE POLICY "Users can delete own reviews, admins can delete any" ON product_reviews
    FOR DELETE TO authenticated USING (
        auth.uid() = user_id OR
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'admin'
        )
    );

-- Stock notifications - authenticated users can add, admins can manage
CREATE POLICY "Anyone can add stock notifications" ON stock_notifications
    FOR INSERT TO authenticated USING (true);

CREATE POLICY "Admins can view all notifications" ON stock_notifications
    FOR SELECT TO authenticated USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'admin'
        )
    );

CREATE POLICY "Admins can update notifications" ON stock_notifications
    FOR UPDATE TO authenticated USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'admin'
        )
    );
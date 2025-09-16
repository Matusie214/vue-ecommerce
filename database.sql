-- Create tables for E-commerce application

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100),
    image VARCHAR(255),
    emoji VARCHAR(10),
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

-- Insert sample products
INSERT INTO products (name, description, price, category, image, emoji) VALUES
('Wireless Headphones', 'Premium noise-cancelling headphones', 199.00, 'electronics', '', '🎧'),
('Smart Watch', 'Fitness tracking and notifications', 299.00, 'electronics', '', '⌚'),
('Coffee Maker', 'Automatic drip coffee maker', 149.00, 'home', '', '☕'),
('Backpack', 'Durable travel backpack', 79.00, 'accessories', '', '🎒'),
('Smartphone', 'Latest flagship smartphone', 699.00, 'electronics', '', '📱'),
('Sneakers', 'Comfortable running shoes', 129.00, 'fashion', '', '👟'),
('Laptop', 'High-performance laptop', 999.00, 'electronics', '', '💻'),
('Sunglasses', 'UV protection sunglasses', 89.00, 'accessories', '', '🕶️'),
('Gaming Mouse', 'High-precision gaming mouse', 59.00, 'electronics', '', '🖱️'),
('Plant Pot', 'Ceramic decorative plant pot', 25.00, 'home', '', '🪴'),
('Wallet', 'Leather bi-fold wallet', 45.00, 'accessories', '', '👛'),
('T-Shirt', 'Cotton crew neck t-shirt', 29.00, 'fashion', '', '👕');

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

-- Products are public (read-only)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are viewable by everyone" ON products
    FOR SELECT TO authenticated, anon USING (true);
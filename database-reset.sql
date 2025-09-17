-- COMPLETE DATABASE RESET SCRIPT
-- This will drop all existing tables and recreate them from scratch
-- Run this in Supabase SQL Editor if you need to start fresh

-- First, drop all policies
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
DROP POLICY IF EXISTS "Users can create own orders" ON orders;
DROP POLICY IF EXISTS "Users can view own order items" ON order_items;
DROP POLICY IF EXISTS "Users can create order items for own orders" ON order_items;
DROP POLICY IF EXISTS "Products are viewable by everyone" ON products;
DROP POLICY IF EXISTS "Admins can insert products" ON products;
DROP POLICY IF EXISTS "Admins can update products" ON products;
DROP POLICY IF EXISTS "Admins can delete products" ON products;
DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON product_reviews;
DROP POLICY IF EXISTS "Authenticated users can add reviews" ON product_reviews;
DROP POLICY IF EXISTS "Users can delete own reviews, admins can delete any" ON product_reviews;
DROP POLICY IF EXISTS "Anyone can add stock notifications" ON stock_notifications;
DROP POLICY IF EXISTS "Admins can view all notifications" ON stock_notifications;
DROP POLICY IF EXISTS "Admins can update notifications" ON stock_notifications;

-- Drop all functions
DROP FUNCTION IF EXISTS create_admin_user(TEXT, TEXT, TEXT);

-- Drop all tables (in correct order due to foreign key constraints)
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS stock_notifications CASCADE;
DROP TABLE IF EXISTS product_reviews CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Clear any existing data from auth.users if needed (be careful with this!)
-- DELETE FROM auth.users WHERE email NOT LIKE '%@supabase.io';

-- Now run the complete database.sql script after this reset
-- Copy and paste the entire database.sql content in a new SQL editor tab
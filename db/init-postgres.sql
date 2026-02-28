-- =============================================
-- PostgreSQL Seed Data for Node.js Examples
-- =============================================

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    product_name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    total_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed users
INSERT INTO users (email, name, role) VALUES
    ('alice@example.com', 'Alice Johnson', 'admin'),
    ('bob@example.com', 'Bob Smith', 'user'),
    ('charlie@example.com', 'Charlie Brown', 'user'),
    ('diana@example.com', 'Diana Prince', 'moderator'),
    ('eve@example.com', 'Eve Davis', 'user');

-- Seed orders
INSERT INTO orders (user_id, product_name, quantity, total_price, status) VALUES
    (1, 'Mechanical Keyboard', 2, 259.98, 'completed'),
    (1, 'USB-C Hub', 1, 49.99, 'shipped'),
    (2, 'Monitor Stand', 1, 89.99, 'pending'),
    (3, 'Wireless Mouse', 3, 119.97, 'completed'),
    (4, 'Laptop Sleeve', 1, 34.99, 'processing'),
    (5, 'Webcam HD', 1, 79.99, 'pending'),
    (2, 'Desk Lamp', 2, 59.98, 'completed');

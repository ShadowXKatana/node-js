// =============================================
// MongoDB Seed Data for Node.js Examples
// =============================================

db = db.getSiblingDB('node_example');

// Products collection
db.products.drop();
db.products.insertMany([
    {
        name: 'Mechanical Keyboard',
        description: 'RGB mechanical keyboard with Cherry MX switches',
        price: 129.99,
        category: 'peripherals',
        stock: 50,
        tags: ['keyboard', 'mechanical', 'rgb'],
        specifications: {
            brand: 'KeyTech',
            weight: '1.2kg',
            connectivity: 'USB-C / Bluetooth',
        },
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with 20000 DPI sensor',
        price: 39.99,
        category: 'peripherals',
        stock: 120,
        tags: ['mouse', 'wireless', 'ergonomic'],
        specifications: {
            brand: 'MousePro',
            weight: '85g',
            connectivity: '2.4GHz / Bluetooth',
        },
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        name: '4K Monitor',
        description: '27-inch 4K IPS monitor with HDR support',
        price: 449.99,
        category: 'displays',
        stock: 25,
        tags: ['monitor', '4k', 'hdr', 'ips'],
        specifications: {
            brand: 'ViewMax',
            weight: '5.8kg',
            resolution: '3840x2160',
        },
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        name: 'USB-C Hub',
        description: '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader',
        price: 49.99,
        category: 'accessories',
        stock: 200,
        tags: ['hub', 'usb-c', 'adapter'],
        specifications: {
            brand: 'ConnectAll',
            weight: '120g',
            ports: '7',
        },
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        name: 'Webcam HD',
        description: '1080p webcam with built-in microphone and autofocus',
        price: 79.99,
        category: 'peripherals',
        stock: 75,
        tags: ['webcam', '1080p', 'microphone'],
        specifications: {
            brand: 'CamView',
            weight: '150g',
            resolution: '1920x1080',
        },
        createdAt: new Date(),
        updatedAt: new Date(),
    },
]);

// Reviews collection
db.reviews.drop();
db.reviews.insertMany([
    {
        productName: 'Mechanical Keyboard',
        reviewer: 'Alice Johnson',
        rating: 5,
        title: 'Best keyboard I have ever used!',
        comment: 'The Cherry MX switches feel amazing. Build quality is top-notch.',
        helpful: 42,
        verified: true,
        createdAt: new Date(),
    },
    {
        productName: 'Mechanical Keyboard',
        reviewer: 'Bob Smith',
        rating: 4,
        title: 'Great keyboard, minor issues',
        comment: 'Love the typing experience. RGB software could be better.',
        helpful: 15,
        verified: true,
        createdAt: new Date(),
    },
    {
        productName: 'Wireless Mouse',
        reviewer: 'Charlie Brown',
        rating: 5,
        title: 'Perfect for daily use',
        comment: 'Battery lasts forever and the ergonomic design is comfortable.',
        helpful: 28,
        verified: true,
        createdAt: new Date(),
    },
    {
        productName: '4K Monitor',
        reviewer: 'Diana Prince',
        rating: 4,
        title: 'Stunning display quality',
        comment: 'Colors are vibrant and the HDR is impressive. Stand could be sturdier.',
        helpful: 33,
        verified: false,
        createdAt: new Date(),
    },
    {
        productName: 'USB-C Hub',
        reviewer: 'Eve Davis',
        rating: 3,
        title: 'Works but gets warm',
        comment: 'All ports work fine but the hub heats up during extended use.',
        helpful: 8,
        verified: true,
        createdAt: new Date(),
    },
]);

print('MongoDB seed data inserted successfully!');

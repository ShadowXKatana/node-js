# Node.js Example Projects

ตัวอย่างการใช้งาน Node.js สำหรับ enterprise ด้วย **Express.js** (Clean Architecture) และ **NestJS** (Microservices) พร้อมฐานข้อมูล **PostgreSQL** และ **MongoDB**

## 📁 โครงสร้างโปรเจค

```
node/
├── db/                     # Database setup (Docker Compose + seed data)
├── express/                # Express.js — Clean Architecture
├── nest/                   # NestJS — Microservice Architecture
│   ├── api-gateway/        # HTTP gateway → TCP proxy
│   ├── users-service/      # TCP microservice (PostgreSQL)
│   ├── orders-service/     # TCP microservice (PostgreSQL)
│   ├── products-service/   # TCP microservice (MongoDB)
│   └── reviews-service/    # TCP microservice (MongoDB)
├── docker-compose.yml      # Run everything with Docker
└── README.md
```

## 🛠 Prerequisites

- **Node.js** 20+
- **Docker** & **Docker Compose**

---

## 🚀 Quick Start — Docker (แนะนำ)

รันทุกอย่างด้วยคำสั่งเดียว:

```bash
docker-compose up -d
```

| Service | URL |
|---|---|
| Express API | http://localhost:3000 |
| NestJS API Gateway | http://localhost:3001 |
| PostgreSQL | localhost:5432 |
| MongoDB | localhost:27017 |

---

## 📦 Run Manually

### 1. เริ่ม Databases

```bash
cd db
docker-compose up -d
```

### 2. Express.js (Clean Architecture)

```bash
cd express
npm install
npx prisma generate
npm run dev
```

Express จะรันที่ **http://localhost:3000**

### 3. NestJS (Microservices)

เปิด 5 terminal แยกกัน:

```bash
# Terminal 1 — Users Service (TCP port 4001)
cd nest/users-service && npm install && npm run start:dev

# Terminal 2 — Orders Service (TCP port 4002)
cd nest/orders-service && npm install && npm run start:dev

# Terminal 3 — Products Service (TCP port 4003)
cd nest/products-service && npm install && npm run start:dev

# Terminal 4 — Reviews Service (TCP port 4004)
cd nest/reviews-service && npm install && npm run start:dev

# Terminal 5 — API Gateway (HTTP port 3001)
cd nest/api-gateway && npm install && npm run start:dev
```

> ⚠️ **ต้องเริ่ม microservices ก่อน gateway** เพื่อให้ TCP connections พร้อมใช้งาน

NestJS จะรันที่ **http://localhost:3000** (หรือ port ที่กำหนดใน env)

---

## 📋 API Endpoints

ทั้ง Express และ NestJS มี endpoint เดียวกัน:

### Users (PostgreSQL)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users` | ดึง users ทั้งหมด |
| GET | `/api/users/:id` | ดึง user ตาม id |
| POST | `/api/users` | สร้าง user ใหม่ |
| PUT | `/api/users/:id` | อัปเดต user |
| DELETE | `/api/users/:id` | ลบ user |

### Orders (PostgreSQL)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/orders` | ดึง orders ทั้งหมด |
| GET | `/api/orders/:id` | ดึง order ตาม id |
| GET | `/api/orders/user/:userId` | ดึง orders ตาม user |
| POST | `/api/orders` | สร้าง order ใหม่ |
| PUT | `/api/orders/:id` | อัปเดต order |
| DELETE | `/api/orders/:id` | ลบ order |

### Products (MongoDB)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | ดึง products ทั้งหมด |
| GET | `/api/products/:id` | ดึง product ตาม id |
| GET | `/api/products/category/:category` | ดึง products ตาม category |
| POST | `/api/products` | สร้าง product ใหม่ |
| PUT | `/api/products/:id` | อัปเดต product |
| DELETE | `/api/products/:id` | ลบ product |

### Reviews (MongoDB)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/reviews` | ดึง reviews ทั้งหมด |
| GET | `/api/reviews/:id` | ดึง review ตาม id |
| GET | `/api/reviews/product/:productName` | ดึง reviews ตาม product |
| POST | `/api/reviews` | สร้าง review ใหม่ |
| PUT | `/api/reviews/:id` | อัปเดต review |
| DELETE | `/api/reviews/:id` | ลบ review |

### Health Check
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | ตรวจสอบสถานะ server |

---

## 🔧 ตัวอย่างการ Request

```bash
# สร้าง user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User","role":"user"}'

# ดึง users ทั้งหมด
curl http://localhost:3000/api/users

# สร้าง product
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"New Keyboard","description":"RGB keyboard","price":99.99,"category":"peripherals","stock":50}'

# สร้าง review
curl -X POST http://localhost:3000/api/reviews \
  -H "Content-Type: application/json" \
  -d '{"productName":"New Keyboard","reviewer":"John","rating":5,"title":"Great!","comment":"Love it"}'
```

---

## 🏗 Architecture

### Express — Clean Architecture

```
src/
├── domain/                 # 🟢 Enterprise Business Rules (ไม่มี dependency ใดๆ)
│   ├── entities/           # User, Order, Product, Review interfaces
│   └── repositories/       # Repository interfaces (ports)
├── application/            # 🔵 Application Business Rules
│   ├── use-cases/          # Business logic (CreateUser, GetOrders, etc.)
│   └── dtos/               # Zod validation schemas
├── infrastructure/         # 🟡 Frameworks & Drivers
│   ├── config/             # Database connections
│   ├── database/mongoose/  # Mongoose models
│   └── repositories/       # Concrete implementations (adapters)
│       ├── prisma/         # PostgreSQL adapters
│       └── mongoose/       # MongoDB adapters
└── presentation/           # 🔴 Interface Adapters
    ├── controllers/        # HTTP request handlers
    ├── routes/             # Express route definitions
    ├── middlewares/        # Error handler, validation, logging
    └── utils/              # Async handler wrapper
```

**Key principle:** Dependencies flow inward only. Domain has zero external dependencies.

### NestJS — Microservice Architecture

```
┌─────────────────────────────────────────────────────┐
│                  API Gateway (:3000)                 │
│     HTTP → ClientProxy (TCP) → Microservices        │
│  [Validation Pipe] [Exception Filter] [Interceptor] │
└────┬──────────┬──────────┬──────────┬───────────────┘
     │          │          │          │
     ▼          ▼          ▼          ▼
┌─────────┐ ┌─────────┐ ┌──────────┐ ┌──────────┐
│ Users   │ │ Orders  │ │ Products │ │ Reviews  │
│ :4001   │ │ :4002   │ │ :4003    │ │ :4004    │
│ TCP     │ │ TCP     │ │ TCP      │ │ TCP      │
│ TypeORM │ │ TypeORM │ │ Mongoose │ │ Mongoose │
│ PG      │ │ PG      │ │ MongoDB  │ │ MongoDB  │
└─────────┘ └─────────┘ └──────────┘ └──────────┘
```

**Key features:**
- Each service is independently deployable
- TCP transport for inter-service communication
- `@MessagePattern` for request/response
- `RpcException` for error propagation
- Global `AllExceptionsFilter` + `LoggingInterceptor` on gateway

---

## 🔒 Error Handling

### Express
- **Error handler middleware** — catches all errors, returns standardized JSON
- **Zod validation** — validates request body with detailed field-level errors
- **Async wrapper** — forwards async errors to error middleware

### NestJS
- **ValidationPipe** — validates DTOs with `class-validator` (whitelist + transform)
- **AllExceptionsFilter** — global catch-all filter with timestamped error responses
- **LoggingInterceptor** — logs request/response timing
- **RpcException** — microservice-level errors propagated to gateway

---

## ⚙️ Middleware

### Express
| Middleware | Description |
|---|---|
| `cors` | Cross-origin requests |
| `express.json()` | JSON body parser |
| `requestLogger` | Log incoming requests |
| `validate(schema)` | Zod validation per route |
| `errorHandler` | Global error catch |

### NestJS
| Middleware | Description |
|---|---|
| `ValidationPipe` | DTO validation (class-validator) |
| `AllExceptionsFilter` | Global exception handling |
| `LoggingInterceptor` | Request/response logging |
| `CORS` | Cross-origin requests |

---

## 🗃 Tech Stack

| | Express | NestJS |
|---|---|---|
| **Framework** | Express 4 | NestJS 10 |
| **Language** | TypeScript | TypeScript |
| **Architecture** | Clean Architecture | Microservices |
| **PostgreSQL** | Prisma ORM | TypeORM |
| **MongoDB** | Mongoose | @nestjs/mongoose |
| **Validation** | Zod | class-validator |
| **Error Handling** | Custom middleware | Exception filters |
| **Transport** | HTTP | TCP (inter-service) |

---

## 🐳 Docker

### Database only
```bash
cd db && docker-compose up -d
```

### Everything
```bash
docker-compose up -d
```

### Build individual services
```bash
docker build -t express-api ./express
docker build -t nest-gateway ./nest/api-gateway
docker build -t nest-users ./nest/users-service
```

---

## 📝 Environment Variables

### Express (`.env`)
```
PORT=3000
DATABASE_URL=postgresql://admin:password123@localhost:5432/node_example
MONGODB_URI=mongodb://admin:password123@localhost:27017/node_example?authSource=admin
```

### NestJS (environment per service)
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASS=password123
DB_NAME=node_example
MONGODB_URI=mongodb://admin:password123@localhost:27017/node_example?authSource=admin
```

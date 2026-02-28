# Error Handling — Express (Clean Architecture)

## ภาพรวม

ใน Express ทุก error ถูกจัดการผ่าน **middleware chain** — ถ้า error เกิดที่ไหน ก็จะวิ่งไปหา `errorHandler` ตัวสุดท้ายเสมอ

```
Request เข้า
    ↓
Middleware (cors, json, requestLogger)
    ↓
Route → Controller → Use Case → Repository
    ↓ (ถ้ามี Error)
errorHandler middleware  ← จุดรับ error ทั้งหมด
    ↓
Response { success: false, error: "..." }
```

---

## ไฟล์ที่เกี่ยวข้อง

| ไฟล์ | หน้าที่ |
|---|---|
| `src/presentation/middlewares/index.ts` | มี `errorHandler`, `validate`, `requestLogger` |
| `src/presentation/utils/` | `asyncHandler` — wrapper ป้องกัน async error หลุด |
| `src/app.ts` | ลงทะเบียน `errorHandler` เป็น middleware ตัวสุดท้าย |

---

## 1. `errorHandler` — Global Error Middleware

```typescript
// presentation/middlewares/index.ts
export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
    if (err.message.includes('not found')) {
        res.status(404).json({ success: false, error: err.message });
        return;
    }
    if (err.message.includes('already exists') || err.message.includes('must be')) {
        res.status(400).json({ success: false, error: err.message });
        return;
    }
    res.status(500).json({ success: false, error: err.message });
}
```

### กฎ mapping Error → HTTP Status

| ข้อความใน error | HTTP Status |
|---|---|
| contains `"not found"` | **404** Not Found |
| contains `"already exists"` หรือ `"must be"` | **400** Bad Request |
| อื่นๆ ทั้งหมด | **500** Internal Server Error |

ต้องลงทะเบียน **เป็น middleware ตัวสุดท้าย** ใน `app.ts` เสมอ:
```typescript
app.use(errorHandler); // ← ต้องอยู่หลัง routes ทั้งหมด
```

---

## 2. `validate(schema)` — Validation Middleware

ใช้ [Zod](https://zod.dev/) validate `req.body` ก่อนถึง Controller:

```typescript
export function validate(schema: ZodSchema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                success: false,
                errors: result.error.errors.map(e => ({
                    field: e.path.join('.'),
                    message: e.message,
                })),
            });
            return;
        }
        req.body = result.data; // ข้อมูลที่ผ่าน validate แล้ว
        next();
    };
}
```

ใช้งานในแต่ละ route:
```typescript
router.post('/', validate(CreateUserSchema), asyncHandler(controller.create));
```

---

## 3. `asyncHandler` — Async Error Wrapper

Express 4 **ไม่รับ async error อัตโนมัติ** ต้องใช้ wrapper ส่ง error ไปให้ `errorHandler`:

```typescript
// presentation/utils/async-handler.ts
export const asyncHandler = (fn: Function) =>
    (req: Request, res: Response, next: NextFunction) =>
        Promise.resolve(fn(req, res, next)).catch(next); // .catch(next) ← ส่ง error ไป errorHandler
```

ถ้าไม่ใช้ wrapper นี้ `throw new Error(...)` ใน async function จะทำให้ server crash โดยไม่ส่ง response

---

## Response Format

### สำเร็จ
```json
{ "success": true, "data": { ... } }
```

### Error (validation)
```json
{
  "success": false,
  "errors": [
    { "field": "email", "message": "Invalid email" }
  ]
}
```

### Error (ทั่วไป)
```json
{ "success": false, "error": "User with id 99 not found" }
```

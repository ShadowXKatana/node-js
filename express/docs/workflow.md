# 0 Request

- Request วิ่งเข้ามา: ข้อมูล HTTP ยิงมาที่เซิร์ฟเวอร์ Express ของคุณที่ Port (เช่น 3000)

# 1 Express App & Router

- Request วิ่งเข้ามา: ข้อมูล HTTP ยิงมาที่เซิร์ฟเวอร์ Express ของคุณที่ Port (เช่น 3000)
- ผ่าน Middleware: Express จะเอา req ไปผ่านด่านตรวจก่อน เช่น express.json() เพื่อแปลงบอดี้ที่ส่งมาให้แกะอ่านได้ง่ายๆ
- Routing: Express จะดูว่า URL คืออะไร (เช่น /orders) แล้วชี้เป้าส่งต่อให้ Controller ที่รับผิดชอบเรื่องนี้

# 2 Controller

- รับคำสั่ง: Controller (รับ req, ส่ง res)
- สั่ง Use Case: สั่งให้ Use Case ทำงานตามที่ขอ
- ส่งผลลัพธ์: เอาผลลัพธ์ที่ได้จาก Use Case ส่งกลับ (res.json)

# 3 Use Case

- รับคำสั่ง: รับคำสั่งจาก Controller
- เช็คกฎ (Business Logic): เช็คกฎของบริษัทก่อน เช่น "ยอดเงินต้องมากกว่า 0", "สินค้าต้องมีในสต็อกไหม"
- สั่ง Repository: สั่งให้ Repository ไปจัดการฐานข้อมูล (เช่น "บันทึกข้อมูลลง DB")
- ส่งผลลัพธ์: ส่งผลลัพธ์กลับไปให้ Controller

# 4 Repository

- รับคำสั่ง: รับคำสั่งจาก Use Case (เช่น "ไปเอาข้อมูลสินค้าหน่อย")
- คุยกับ DB: คุยกับฐานข้อมูลโดยตรง (ไม่รู้เรื่องธุรกิจ ไม่รู้เรื่อง UI)
- ส่งผลลัพธ์: ส่งข้อมูลดิบๆ ที่ได้จาก DB กลับไปให้ Use Case

# 5 Database

- เก็บข้อมูล: เก็บข้อมูลลูกค้า, สินค้า, ออเดอร์ ไว้ในตารางต่างๆ
- ตอบคำถาม: ตอบคำถามจาก Repository (เช่น "นี่คือข้อมูลสินค้าที่ขอมา")

# 6 Response

- Response วิ่งกลับไปหา Use Case
- Use Case ส่ง Response กลับไปหา Controller   
- Controller ส่ง Response กลับไปหา Express
- Express ส่ง Response กลับไปหา Client
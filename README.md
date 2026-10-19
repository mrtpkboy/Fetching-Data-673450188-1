# Streaming – Next.js (Loading, Suspense, Skeleton, Not Found, Error)

โปรเจกต์ตัวอย่างสำหรับเรียนรู้การทำ **Streaming และการจัดการสถานะหน้าเว็บ** ใน Next.js (App Router) ต่อยอดจากโปรเจกต์ CRUD นักศึกษา ประกอบด้วย

- ตรวจสอบข้อมูลฟอร์มด้วย **Zod** ก่อนบันทึกลงฐานข้อมูลผ่าน **Prisma**
- **Loading UI** ด้วย `loading.tsx`
- **Suspense** เพื่อโหลดข้อมูลเฉพาะส่วน (Streaming)
- **Skeleton** แสดงโครงหน้าระหว่างรอข้อมูล
- **not-found** สำหรับหน้าที่ไม่พบข้อมูล (404)
- **error / global-error** สำหรับจัดการข้อผิดพลาด

---

## สารบัญ

1. [สิ่งที่ต้องเตรียม](#สิ่งที่ต้องเตรียม)
2. [วิธีติดตั้ง](#วิธีติดตั้ง)
3. [วิธีใช้งาน](#วิธีใช้งาน)
4. [โครงสร้างไฟล์](#โครงสร้างไฟล์)
5. [รายละเอียดแต่ละฟีเจอร์](#รายละเอียดแต่ละฟีเจอร์)
6. [ปัญหาที่พบบ่อย](#ปัญหาที่พบบ่อย)

---

## สิ่งที่ต้องเตรียม

| เครื่องมือ | เวอร์ชันแนะนำ |
| ---------- | ------------- |
| Node.js    | 20 ขึ้นไป     |
| npm        | 10 ขึ้นไป     |
| Git        | เวอร์ชันล่าสุด |

ต้องต่ออินเทอร์เน็ตระหว่างใช้งาน เพราะหน้า Blogs ดึงข้อมูลจาก `https://api.vercel.app/blog`

---

## วิธีติดตั้ง

โปรเจกต์นี้เป็นโปรเจกต์ Next.js ที่รันได้ครบในตัว (ใช้ SQLite จึงไม่ต้องติดตั้งฐานข้อมูลเพิ่ม)

### 1. ดาวน์โหลดโปรเจกต์

```bash
git clone https://github.com/mrtpkboy/Fetching-Data-673450188-1.git
cd Fetching-Data-673450188-1
```

หรือกด **Code → Download ZIP** บน GitHub แล้วแตกไฟล์ จากนั้นเปิดโฟลเดอร์ใน VS Code

### 2. ติดตั้ง Dependencies

```bash
npm install
```

คำสั่งนี้ติดตั้ง Next.js, Prisma, Zod, Tailwind CSS และสร้าง Prisma Client ให้อัตโนมัติ

### 3. ตรวจสอบไฟล์ `.env`

ไฟล์ `.env` มีอยู่แล้วในโปรเจกต์ โดยมีค่า

```env
DATABASE_URL="file:./dev.db"
```

ถ้าไม่มีไฟล์นี้ ให้สร้างขึ้นมาเองตามตัวอย่างด้านบน

### 4. สร้างฐานข้อมูล

```bash
npx prisma migrate dev --name init
```

จะได้ไฟล์ฐานข้อมูล `prisma/dev.db` และตาราง `Student`

---

## วิธีใช้งาน

### เริ่มเซิร์ฟเวอร์สำหรับพัฒนา

```bash
npm run dev
```

เปิดเบราว์เซอร์ที่ <http://localhost:3000>

### คำสั่งอื่น ๆ

| คำสั่ง              | หน้าที่                          |
| ------------------- | -------------------------------- |
| `npm run dev`       | รันโหมดพัฒนา                     |
| `npm run build`     | สร้างไฟล์สำหรับ Production       |
| `npm run start`     | รันเซิร์ฟเวอร์ Production        |
| `npx prisma studio` | เปิดหน้าจัดการข้อมูลในฐานข้อมูล  |

### หน้าที่ใช้ทดสอบ

| URL                 | รายละเอียด                                              |
| ------------------- | ------------------------------------------------------- |
| `/students/create`  | ฟอร์มเพิ่มนักศึกษา พร้อมตรวจสอบข้อมูลด้วย Zod            |
| `/students`         | รายการนักศึกษา และปุ่มลบ                                 |
| `/blogs`            | รายการบทความ (Loading / Suspense / Skeleton)             |
| `/blogs/1`          | รายละเอียดบทความ                                         |
| `/blogs/999`        | ทดสอบหน้า not-found (ไม่พบบทความ)                        |
| `/skeleton`         | ตัวอย่าง Skeleton                                        |

### ทดสอบการหน่วงเวลา (เฉพาะตอนทดลอง)

เพิ่มบรรทัดนี้ในคอมโพเนนต์ที่ดึงข้อมูล เพื่อจำลองการโหลดช้า 3 วินาที แล้วลบออกเมื่อใช้งานจริง

```tsx
await new Promise((resolve) => setTimeout(resolve, 3000));
```

---

## โครงสร้างไฟล์

```
prisma/
└── schema.prisma                     # โมเดล Student (SQLite)
app/
├── layout.tsx / page.tsx             # เมนูและหน้าแรก
├── lib/prisma.ts                     # Prisma Client
├── students/
│   ├── page.tsx                      # รายการนักศึกษา + ลบ
│   ├── validation.ts                 # Zod schema
│   └── create/
│       ├── page.tsx                  # Server Action + หน้าเพิ่มนักศึกษา
│       └── create-student-form.tsx   # Form (Client Component)
├── blogs/
│   ├── page.tsx                      # หน้ารายการบทความ
│   ├── loading.tsx                   # Loading UI
│   ├── not-found.tsx                 # หน้า 404 ของ blogs
│   ├── error.tsx                     # Error เฉพาะส่วน blogs
│   └── [id]/
│       └── page.tsx                  # หน้ารายละเอียดบทความ
├── skeleton/
│   └── page.tsx                      # ตัวอย่าง Skeleton
├── ui/
│   ├── blogs.tsx                     # คอมโพเนนต์ดึงข้อมูลบทความ
│   ├── my-fallback.tsx               # Fallback สำหรับ Suspense
│   └── my-skeleton.tsx               # Skeleton สำหรับใช้งานจริง
└── global-error.tsx                  # Error ระดับทั้งเว็บ
```

---

## รายละเอียดแต่ละฟีเจอร์

### 1. Validation ด้วย Zod

ไฟล์ `app/students/validation.ts` กำหนดกติกาของข้อมูลนักศึกษา

| ฟิลด์         | กติกา                                  |
| ------------- | -------------------------------------- |
| `studentCode` | จำเป็นต้องกรอก ไม่เกิน 20 ตัวอักษร      |
| `name`        | จำเป็นต้องกรอก ไม่เกิน 100 ตัวอักษร     |
| `email`       | รูปแบบอีเมลถูกต้อง หรือเว้นว่างได้       |
| `major`       | จำเป็นต้องกรอก ไม่เกิน 100 ตัวอักษร     |
| `year`        | จำนวนเต็ม 1–8                           |

ฟอร์มใช้ `useActionState` แสดงข้อความ Error ใต้ช่องที่กรอกผิด และแจ้งเตือนเมื่อรหัสนักศึกษาซ้ำ

### 2. Loading UI

ไฟล์ `loading.tsx` ใน `app/blogs/` จะถูกแสดงอัตโนมัติระหว่างรอโหลดหน้า

### 3. Suspense (Streaming เฉพาะส่วน)

ครอบคอมโพเนนต์ที่โหลดช้าด้วย `<Suspense>` เพื่อให้ส่วนอื่นของหน้าแสดงผลได้ทันที

```tsx
import { Suspense } from "react";
import Blogs from "@/app/ui/blogs";
import MyFallback from "../ui/my-fallback";

<Suspense fallback={<MyFallback />}>
  <Blogs />
</Suspense>
```

### 4. Skeleton

เปลี่ยน fallback เป็นโครงหน้าที่เหมือนเนื้อหาจริง

```tsx
import { BlogListSkeleton } from "../ui/my-skeleton";

<Suspense fallback={<BlogListSkeleton />}>
  <Blogs />
</Suspense>
```

### 5. not-found

เรียก `notFound()` เมื่อไม่พบข้อมูล แล้ว Next.js จะแสดง `app/blogs/not-found.tsx`

```tsx
import { notFound } from "next/navigation";

if (!blog) {
  notFound();
}
```

### 6. Error และ Global Error

| ไฟล์                   | ขอบเขต                    |
| ---------------------- | ------------------------- |
| `app/blogs/error.tsx`  | ข้อผิดพลาดเฉพาะส่วน blogs |
| `app/global-error.tsx` | ข้อผิดพลาดระดับทั้งเว็บ   |

ทั้งสองไฟล์ต้องขึ้นต้นด้วย `"use client";`

---

## ปัญหาที่พบบ่อย

| อาการ | วิธีแก้ |
| ----- | ------- |
| `Cannot find module '@prisma/client'` | รัน `npx prisma generate` |
| `Environment variable not found: DATABASE_URL` | สร้างไฟล์ `.env` และกำหนดค่า `DATABASE_URL` |
| ตารางไม่มีในฐานข้อมูล | รัน `npx prisma migrate dev` |
| หน้า `/blogs` โหลดไม่ขึ้น | ตรวจสอบการเชื่อมต่ออินเทอร์เน็ต |
| Port 3000 ถูกใช้งานอยู่ | รัน `npm run dev -- -p 3001` |

---

## เทคโนโลยีที่ใช้

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [Prisma](https://www.prisma.io/)
- [Zod](https://zod.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

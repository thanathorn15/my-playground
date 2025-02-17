# ใช้ Node.js เป็น Base Image
FROM node:18

# ตั้งค่าโฟลเดอร์ทำงานใน Container
WORKDIR /app

# คัดลอกไฟล์ package.json และติดตั้ง dependencies
COPY package.json package-lock.json ./
RUN npm install

# คัดลอกโค้ดทั้งหมดไปยัง Container
COPY . .

# เปิดพอร์ต 5173 (Vite Dev Server)
EXPOSE 5173

# รัน Vite Dev Server และรองรับการเข้าถึงจากเครื่องอื่น
CMD ["npm", "run", "dev", "--", "--host"]

# ใช้ Node.js เป็น Base Image
FROM node:18

# ตั้งค่าโฟลเดอร์ทำงานใน Container
WORKDIR /app

# คัดลอกไฟล์ package.json และติดตั้ง dependencies
COPY package.json package-lock.json ./
RUN npm install

# คัดลอกโค้ดทั้งหมดไปยัง Container
COPY . .

# เปิดพอร์ตที่ใช้งาน (5400)
EXPOSE 5400

# คำสั่งเริ่มต้น
CMD ["npm", "start"]

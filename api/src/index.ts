import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from './routes/user.routes'
import multer from "multer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true })); // ใช้สำหรับรับข้อมูลแบบ form-urlencoded
app.use(multer({ dest: 'uploads/' }).single('img')); // ถ้าต้องการอัพโหลดไฟล์แบบ single field
app.use(cors());
app.use(express.json());

app.use('/user',userRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
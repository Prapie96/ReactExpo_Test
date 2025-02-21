import multer from "multer";
import path from "path";
import { Request } from "express";

// ตั้งค่า multer สำหรับการจัดเก็บไฟล์
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'img');  // กำหนดโฟลเดอร์ที่จะเก็บไฟล์
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now();
      cb(null, file.fieldname + "_" + uniqueSuffix + path.extname(file.originalname));
    }
  });
  
  //check file type
  const fileFilter = (req: Request, file: Express.Multer.File, cb: (error: any, acceptFile: boolean) => void) => {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Invalid file type Please Upload file image'), false);  // ถ้าไม่ใช่ประเภทที่อนุญาตจะส่งข้อผิดพลาด
      }
      cb(null, true);
    }

  const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },  // จำกัดขนาดไฟล์ที่อัปโหลดได้ (เช่น 5MB)
    fileFilter: fileFilter
  });
  
  export default upload;
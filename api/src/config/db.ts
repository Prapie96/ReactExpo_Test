//import mysql from 'mysql2';
import mysql from "mysql2/promise";//ทำงานในลักษณะ synchronous-style 
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,//, ถ้าหากไม่มีการเชื่อมต่อที่ว่างใน pool ระบบจะรอจนกว่าจะมีการเชื่อมต่อว่าง
    connectionLimit: 10, //จำนวนการเชื่อมต่อสูงสุดใน pool ซึ่งหมายถึงจำนวนการเชื่อมต่อพร้อมกันที่สามารถเกิดขึ้นได้ 
});

export default pool;
import {Request,Response } from 'express';
import pool from '../config/db'; // เชื่อมต่อกับฐานข้อมูล
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import Userinfo from '../models/user.models';
import Account from '../models/account.models';
import multer from 'multer';

// ตั้งค่าการอัพโหลดไฟล์
const upload = multer({ dest: 'uploads/' });

export const getUsers = async(req:Request,res:Response):Promise<void>=>{
    try{
        let sql = 'SELECT * FROM userinfo';
        const [row] = await pool.query<Userinfo[] & RowDataPacket[]>(sql);
        res.json(row);
    }catch(err){
        console.error(err);
        res.status(500).json({message:'Internal Server Error1'})
    }
}
export const regisUsers = async(req:Request,res:Response):Promise<any>=>{
    try{
        const { firstname, lastname, nickname, username, password } = req.body;
        const img = req.file ? req.file.filename : null;  // รับชื่อไฟล์รูปภาพ

        if (!firstname || !lastname || !nickname || !username || !password) {
            console.log("Some filed missing :",firstname,lastname,nickname,username,password)
            return res.status(400).json({ message: "Missing required fields",firstname:firstname });
          }
        // 1.Check if the username is a duplicate in the database.
        const checkUsernameQuery = "SELECT COUNT(*) AS count FROM account WHERE username = ?";
        const [checkUsername] = await pool.query<RowDataPacket[]>(checkUsernameQuery, [username]);
        if(checkUsername[0].count >0){
            console.log("Error: Username already exists in database");
            return res.status(400).json({ message: "Username already exists" });
        }
        // 2.Insert req.body into userinfo
        const insertuserinfo = "INSERT INTO userinfo (firstname, lastname, nickname, img) VALUES (?, ?, ?, ?)";
        const [insertResult] = await pool.query<ResultSetHeader>(insertuserinfo, [firstname, lastname, nickname, img]);
        if(insertResult.affectedRows !== 1){
            return res.status(400).json({ message: "Failed to insert user info" });
        }
        // 3.Insert userid into Account 
        const insertAccount = "INSERT INTO account (userid, username, password) VALUES (?, ?, ?)";
        const [resultAccountinsert] = await pool.query<ResultSetHeader>(insertAccount,[insertResult.insertId,username,password]);
        if(resultAccountinsert.affectedRows !== 1){
            return res.status(400).json({ message: "Failed to insert userid into account" });
        }
        // return success result data from insert userinfo and insert userid account
        console.log("Success to insert userinfo and account");
        res.status(200).json({message: "Success to insert userinfo and account",result: { userInfo: insertResult, accountInfo:resultAccountinsert }});
    }catch(err){
        res.status(500).json({message:'Internal Server Error'})
    }
}
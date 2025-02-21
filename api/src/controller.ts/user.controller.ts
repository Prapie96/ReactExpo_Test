import {Request,Response } from 'express';
import pool from '../config/db'; // เชื่อมต่อกับฐานข้อมูล
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import Userinfo from '../models/user.models';
import Account from '../models/account.models';
import multer from 'multer';
import path, { resolve } from 'node:path';
import fs, { existsSync } from 'node:fs';
import dotenv from 'dotenv';
dotenv.config();

export const getUsers = async(req:Request,res:Response):Promise<void>=>{
    try{
        const sql = 'SELECT * FROM userinfo';
        const [row] = await pool.query<Userinfo[] & RowDataPacket[]>(sql);
        res.json(row);
    }catch(err){
        console.error(err);
        res.status(500).json({message:'Internal Server Error'})
    }
}
export const getUserByid = async(req:Request,res:Response):Promise<void>=>{
    try{
        const {userid} = req.body;
        const sql = 'SELECT * FROM userinfo WHERE userid = ?';
        const [row] = await pool.query<Userinfo[] & RowDataPacket[]>(sql,[userid]);
        res.json(row);
    }catch(err){
        console.error(err);
        res.status(500).json({message:'Internal Server Error'})
    }
}
export const selectimg = async(req:Request,res:Response):Promise<void>=>{
   const {userid} = req.body;
   if(!userid){
    return console.error("userid missing",userid);
   }
   const filenameimg = "SELECT img FROM userinfo WHERE userid = ? ";
   try{
    const [row] = await pool.query<RowDataPacket[]>(filenameimg,[userid]);
    res.send({uri: 'http://192.168.1.57:3000/img/'+ row[0].img});
   }catch(err){
        console.error(err);
        res.status(500).json({message:'Internal Server Error'})
   }

}
export const getimgfromselect = async(req:Request,res:Response):Promise<void>=>{
    const filename = req.params.filename;
    const filepath = path.resolve(__dirname, '..', '..', 'img', filename);// use .. 2 times cause exit from user.controller.ts and src to go img

    console.log(`Filename get img: ${filename}`);
    console.log('FilePath :',filepath);
    if(fs.existsSync(filepath)){
        res.sendFile(filepath);
      }else{
        console.log('Img was deleted');
        res.status(404).json({error:'File Not Found'});
      } 
}
export const regisUsers = async(req:Request,res:Response):Promise<any>=>{
    try{
        const { firstname, lastname, nickname, username, password } = req.body;
        const img = req.file ? req.file.filename : null;  // รับชื่อไฟล์รูปภาพ
        console.log("Img:",img);

        if (!firstname || !lastname || !nickname || !username || !password) {
            console.log("Some filed missing :",firstname,lastname,nickname,username,password);
            //Delete File if some filed missing
            if (img) {
                fs.unlinkSync(path.resolve(__dirname, '..', '..', 'img', img));
                console.log('Delete File img in img folder');
            }
            return res.status(400).json({ message: "Missing required fields"});
          }

        // 1.Check if the username is a duplicate in the database.
        const checkUsernameQuery = "SELECT COUNT(*) AS count FROM account WHERE username = ?";
        const [checkUsername] = await pool.query<Account[]&RowDataPacket[]>(checkUsernameQuery, [username]);
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
            return  res.status(400).json({ message: "Failed to insert userid into account" });
        }

        // return success result data from insert userinfo and insert userid account
        console.log("Success to insert userinfo and account");
        return  res.status(200).json({message: "Success to insert userinfo and account",result: { userInfo: insertResult, accountInfo:resultAccountinsert }});
    
    }catch(err){
        return res.status(500).json({message:'Internal Server Error'})
    }
}
export const deleteUSer = async(req:Request,res:Response):Promise<void>=>{
    try{
        const {userid} = req.body;
        if(!userid){
            console.log("userid missing:",userid);
        }
        const imgsqldelete = "SELECT img FROM userinfo WHERE userid = ?";
        const [row] = await pool.query<RowDataPacket[]>(imgsqldelete,[userid]);
        if(row.length === 0 || !row){
            console.log("Result error",row);
        }
        else{
            const imagepath = process.env.IMAGE_PATH;//ใช้ env เปลี่ยนค่าชื่อ path ที่อยู่ file img เผื่อใช้หลายที่
            const filepath = path.resolve(imagepath as string,row[0].img);//ใช้ resolve แทน join เพราะ__dirname เป็น path ของไฟล์ที่กำลังทำงานในโฟลเดอร์นั้น
            console.log(`filepath :${filepath}`);
            if(filepath){
                fs.unlink(filepath,(err)=>{
                    if(err)console.error(`Error removing file: ${err}`);
                    else{
                        console.log(`File has been successfully removed.`);
                    }
                })
            }
        }
       
        const sqldelete = 'DELETE FROM  userinfo WHERE userid = ?';
        const [resultdelete] = await pool.query<ResultSetHeader>(sqldelete,[userid]);
        if(resultdelete.affectedRows === 0){
            console.error("Delete Failed");
            res.status(400).json({messsage: false})
        }
        res.status(200).json({message:"Success Delete User"});
    }catch(err){
        res.status(500).json({message:'Internal Server Error'})
    }
}
export const editUSer = async(req:Request,res:Response):Promise<any>=>{
    const { firstname, lastname, nickname, userid, username, password } = req.body;
    const img = req.file ? req.file.filename : null;

    if(!firstname && !lastname && !nickname && !userid || !username || !password){
        console.error('firstname, lastname, nickname, or userid is missing',firstname,lastname,nickname,userid,username,password);
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try{
         // ลบรูปเก่าหากมีการอัปโหลดใหม่
    if(img){
        const selectOldImg = "SELECT img FROM userinfo WHERE userid = ?";
        const [row] =await pool.query<Userinfo[]&RowDataPacket[]>(selectOldImg,[userid]);
        if(row.length === 0){
            console.error("error with Select img from user");
            return res.status(400).json({message:'Error Select img from user'});
        }
        const filePath = path.join(__dirname,'..','..','img', row[0].img);// ระบุที่อยู่ของไฟล์เก่า
        if(existsSync(filePath)){
            fs.unlinkSync(path.resolve(filePath));
            console.log("Success Delete old image");
        }
    }
    //Update user infomation
    const updateUser = img
    ? "UPDATE userinfo SET firstname = ?, lastname = ?, nickname = ?, img = ? WHERE userid = ?"
    : "UPDATE userinfo SET firstname = ?, lastname = ?, nickname = ? WHERE userid = ?";

    const queryParams = img
            ? [firstname, lastname, nickname, img, userid]
            : [firstname, lastname, nickname, userid];

    const [resultupdate] = await pool.query<ResultSetHeader>(updateUser,queryParams);
    if(resultupdate.affectedRows === 0){
        console.log('Error with Update User');
       return res.status(400).json({message:'Internal Server Error'});
    }

    //Update Username and Password
    const updateAccount =  "UPDATE account SET username=?, password=? WHERE userid=?"; 
    const [resultupdateAcc] = await pool.query<ResultSetHeader>(updateAccount,[username,password,userid]);
    if(resultupdateAcc.affectedRows === 0){
        console.log('Error with Update Account ');
        return res.status(400).json({message:'Internal Server Error'});
    }
    return res.status(200).json({message:'Success Update User',resultuser:resultupdate,resultacc:resultupdateAcc})
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:'Imternal Server Error'});
    }
}
import {Request,Response } from 'express';
import pool from '../config/db'; // เชื่อมต่อกับฐานข้อมูล
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import Userinfo from '../models/user.models';
import Account from '../models/account.models';
import dotenv from 'dotenv';
dotenv.config();

export const loginUser = async(req:Request,res:Response):Promise<void>=>{
    const {username,password} = req.body;
    const loginsql = 'SELECT * account WHERE username = ? '
    const [row] = await pool.query<Account[]&RowDataPacket[]>(loginsql,[username]);
    
}
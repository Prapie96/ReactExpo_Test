import con from './connection.js';
import bodyPasrser from 'body-parser';
import express from 'express';
const port = 3000;
import cors from 'cors'; 
const app = express();
import multer from 'multer';
import path, { dirname } from "path";
import { fileURLToPath } from 'url';
import { url } from 'inspector';
import fs from 'fs';
import { error } from 'console';
// const req = require('express/lib/request');
// const res = require('express/lib/response');
app.use(bodyPasrser.json());
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,'img')
  },
  filename: function(req,file,cb){
    const uniqueSuffix = Date.now();
    cb(null,file.fieldname +"_"+uniqueSuffix+file.originalname);
    
  }
});
const upload = multer({storage: storage});

app.post("/getuser", async(req,res)=>{
  const sql = "SELECT * FROM userinfo";
  try{
        con.query(sql,(err,data)=>{
        res.json(data)
      })
  }catch(error){
    console.error("Something Wrong with sql database");
  }
  });
  app.post("/getuserbyid",upload.none(),async(req,res)=>{
    const {userid} = req.body;
    console.log(`User id by: ${userid}`);
    const sql = "SELECT * FROM userinfo WHERE userid = ?";
    if(userid){
          con.query(sql,[userid],(err,result)=>{
            if(err)throw err;
            if(result.length === 0){
              res.status(404).json({message: 'User not found'});
            }
            else{
              console.log("Get user by id",result);
              res.status(200).json(result);
            }
        })
    }else{
      console.error("User id is missing");
    }
    });
  
  app.post("/img",async(req,res)=>{
    const {userid} = req.body;
    console.log('/img userid:',userid)
    const filenameimg = "SELECT img FROM userinfo WHERE userid = ? ";
    // console.log(`Sow pat join in /img:${path.join()} `)
    if(userid){
      con.query(filenameimg,[userid],(err,result)=>{
        if(err)throw(err);
        res.send({uri: 'http://192.168.1.57:3000/img/'+ result[0].img});
      })
     
    }
    else{
      console.log(`User id Error : ${userid}`);
    }

  })

  app.get("/img/:filename",async(req,res)=>{
    const filename = req.params.filename;
    const filepath = path.join(__dirname,'img',filename);
    console.log(`Filename get img: ${filename}`);
    if(fs.existsSync(filepath)){
      res.sendFile(filepath);
    }else{
      res.status(404).json({error:'File Not Found'});
      console.warn('Img was deleted');
    }

  })

  app.post("/find", async(req,res)=>{
    const {firstname,lastname,nickname} = req.body;
    const sql = "SELECT * FROM userinfo WHERE firstname = ?";
    console.log('Into post find')
    try{
          con.query(sql,[firstname,lastname,nickname],(err,data)=>{
          console.log(data);
          res.json(data)
        })
    }catch(error){
      console.error("Something Wrong with sql database");
    }
  });

  app.listen(port, () => {
    console.log(`Example app listening on port http:localhost:${port}`);
    console.log("Connect to Data");
    
  })


  app.post('/regisuser', upload.single("img"), async (req, res) => {
    const { firstname, lastname, nickname, username, password } = req.body;
    const img = req.file ? req.file.filename : null;

    if (!firstname || !lastname || !nickname || !username || !password) {
        return res.status(400).json({ message: "Missing required fields" }); // Early return for missing fields
    }

    const insertuserinfo = "INSERT INTO userinfo (firstname, lastname, nickname, img) VALUES (?, ?, ?, ?)";

    try {
        con.query(insertuserinfo, [firstname, lastname, nickname, img], (err, result) => {
            if (err) {
                console.error("Error while INSERT USERINFO", err);
                return res.status(500).json({ message: "Error inserting user info" }); 
            }

            if (result.affectedRows !== 1) {
                return res.status(400).json({ message: "Failed to insert user info" }); 
            }

            const insertaccount = "INSERT INTO account (userid, username, password) VALUES (?, ?, ?)";
            con.query(insertaccount, [result.insertId, username, password], (err, data) => {
                if (err) {
                    console.error("Error while INSERT account", err);
                    return res.status(500).json({ message: "Error inserting account" }); 
                }

                if (data.affectedRows !== 1) {
                    return res.status(400).json({ message: "Failed to insert account" }); 
                }

                // Only send ONE success response after both inserts are successful
                console.log(`Success to insert userinfo and account`)
                return res.status(200).json({ message: "Success to insert userinfo and account", result: { userInfo: result, accountInfo: data } });
            });
        });
    } catch (err) {
        console.error("General error", err);
        return res.status(500).json({ message: "An error occurred" });  // Catch any unexpected errors
    }
});
  
  
  

app.put('/edit', upload.single("img"), async (req, res) => {
  const { firstname, lastname, nickname, userid, username, password } = req.body;
  const img = req.file ? req.file.filename : null; // ตรวจสอบว่ามีการอัปโหลดรูปใหม่หรือไม่

  if (firstname && lastname && nickname && userid) {
      console.log("Get user input:", firstname, lastname, nickname, userid, img);
      console.log("Get user input2:", username, password);

      // ลบรูปเก่าหากมีการอัปโหลดใหม่
      if (img) {
          const selectOldImg = "SELECT img FROM userinfo WHERE userid = ?";
          con.query(selectOldImg, [userid], async (err, result) => {
              if (err) {
                  console.error(`Error fetching old image: ${err}`);
              } else {
                  const filePath = path.join(__dirname, 'img', result[0].img);// ระบุที่อยู่ของไฟล์เก่า
                  console.log(`File path: ${filePath}`);
                  if(fs.existsSync(filePath)) {// ตรวจสอบว่าไฟล์เก่ามีอยู่หรือไม่
                      try{
                          await fs.promises.unlink(filePath);//ลบไฟล์เก่า
                          console.log('File has been successfully removed.');
                      }catch(err){
                          console.error(`Error removing file: ${err}`);
                      }
                  }
              }
          });
      }

      // อัปเดตข้อมูลผู้ใช้
      const changeUser = img 
          ? "UPDATE userinfo SET firstname = ?, lastname = ?, nickname = ?, img = ? WHERE userid = ?"
          : "UPDATE userinfo SET firstname = ?, lastname = ?, nickname = ? WHERE userid = ?";

      const queryParams = img 
          ? [firstname, lastname, nickname, img, userid]
          : [firstname, lastname, nickname, userid];

      try {
          const updateUserInfo = new Promise((resolve, reject) => { //Promise รอการทำงานจนเสร็จมีโดยfucntionข้างใน
              con.query(changeUser, queryParams, (err, result) => {
                  if (err) reject(err);// หากเกิดข้อผิดพลาดให้ reject
                  else resolve(result); // ส่งผลลัพธ์กลับ
              });
          });

          const result = await updateUserInfo;//รอจน result ของ query changeUser ทำงานเสร็จ
          if (result.affectedRows === 1) {
              console.log('Success Edit User Info');
          } else {
              console.error("Can't Edit User Info");
              return res.status(400).json({ message: false });
          }

          // หากมีการเปลี่ยนแปลง username และ password
          if (username && password) {
              const changeUserPass = "UPDATE account SET username=?, password=? WHERE userid=?"; 
              const updateUserPass = new Promise((resolve, reject) => {//สร้าง promise เพื่อ update ข้อมูลในตาราง account
                  con.query(changeUserPass, [username, password, userid], (err, result) => {
                      if (err) reject(err);
                      else resolve(result);
                  });
              });

              const passResult = await updateUserPass; //รอจน result ของ query changeUserPass ทำงานเสร็จ
              if (passResult.affectedRows === 1) {
                  console.log('Success Edit User Password');
              } else {
                  console.error("Can't Edit User Password");
                  return res.status(400).json({ message: false });
              }
          }

          // ส่งผลลัพธ์หลังจากการอัปเดตข้อมูลทั้งหมดสำเร็จ
          res.status(200).json({ message: "User information updated successfully." });//หลังจากทำ Promise ทั้งหมดเสร็จส่งข้อความกลับ

      } catch (err) {
          console.error(`Error: ${err}`);
          res.status(500).json({ message: 'Internal Server Error' });
      }
  } else {
      console.error('firstname, lastname, nickname, or userid is missing');
      res.status(400).json({ message: 'Missing required fields' });
  }
});


app.delete('/deleteuser',async(req,res)=>{
  const {userid} = req.body;
  console.log(userid);
 if(userid> 0){
    const imgsqldelete = "SELECT img FROM userinfo WHERE userid = ?";
    con.query(imgsqldelete,[userid],(err,result)=>{
        if(err){
            console.error(`Error fetching old image: ${err}`);
        }
        else{
          console.log(`Result imgsqldelete : ${result[0].img}`);
            const filepath = path.join(__dirname,'img',result[0].img);
            console.log(`filepath :${filepath}`);
             if(filepath){
                fs.unlink(filepath,(err)=>{
                    if(err){
                        console.error(`Error removing file: ${err}`);
                    }
                    else{
                        console.log(`File has been successfully removed.`);
                    }
                    
                })
            }
        }
    });
    
    const deletedata = "DELETE FROM  userinfo WHERE userid = ?";
    con.query(deletedata,[userid],(err,result) => {
    if (err){ 
      throw err;
    }
    //check result
    if(result.affectedRows === 0){
      console.error("Delete Failed");
      res.status(400).json({messsage: false})
    } 
    else{
      console.log("Success Delete")
      res.status(200).json({ result, messsage: true });
    }
    
  }); 
 }
 else{
    console.error("id Wrong : it less than 1")
 } 


});

app.post('/checkuser',async(req,res) =>{
  const sql ='SELECT * FROM status';
  try{
    con.query(sql,(err,result)=>{
      if(err)throw err;
      res.status(200).json(result);
    })
  }catch(err){
    console.error("Something Error when fetching from /checkuser",err);
  }
  
});
app.post('/checkattendance',async(req,res) =>{
  const sql ='SELECT * FROM attendance';
  try{
    con.query(sql,(err,result)=>{
      if(err)throw err;
      res.status(200).json(result);
    })
  }catch(err){
    console.error("Something Error when fetching from /checkattendence",err);
  }
  
});
app.post('/dashboarddata', async (req, res) => {
  const sql = `
    SELECT 
      (SELECT COUNT(*) FROM userinfo) AS totalStudents,
      (SELECT COUNT(*) FROM attendance WHERE statususer = 1) AS presentStudents,
      (SELECT COUNT(*) FROM attendance WHERE statususer = 2) AS lateStudents,
      (SELECT COUNT(*) FROM attendance WHERE statususer = 3) AS leavStudents,
      (SELECT COUNT(*) FROM attendance WHERE statususer = 4) AS absentStudents
  `;
  
  try {
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.status(200).json(result[0]);
    });
  } catch (err) {
    console.error("Error fetching dashboard data", err);
    res.status(500).json({ error: 'Error fetching data' });
  }
});


app.post('/statustext',async(req,res)=>{
  const {statusid} = req.body; 
  console.log(`status id: ${statusid}`);
  const getstatusname ='SELECT statusname FROM attendance INNER JOIN status ON attendance.statususer = status.statusid WHERE status.statusid = ? ';  
  con.query(getstatusname,[statusid],(err,result)=>{
    if(err)throw err;
    console.log(result);
    res.status(200).json(result);
  })
})


app.post('/attendance', upload.none(), async (req, res) => {
  console.log("Into attendance api");

  const { attendanceData } = req.body;
  if (attendanceData) {
      const attendanceArray = JSON.parse(attendanceData); // แปลงจาก string เป็น array ของ object
      console.log('Received data:', attendanceArray);
      attendanceArray.forEach(status => {
          const { userid, statususer } = status;
          if (userid && statususer) {
              const checkexistdata = "SELECT * FROM attendance WHERE userid = ?";
              con.query(checkexistdata,[userid],(err,result)=>{
                if(err){
                  console.error(err);
                  res.status(500).json({ error: 'Database Select failed' });
                }

                if(result.length > 0){
                  const updatesql = "UPDATE attendance SET statususer = ? WHERE userid = ? ";
                  con.query(updatesql,[status,userid]),(err,result) =>{
                    if(err){
                      console.error(err);
                      res.status(500).json({ error: 'Database Update failed' });
                    }
                  }
                }
                else{
                  const insertsql = 'INSERT INTO attendance (userid, statususer) VALUES (?, ?)';
              con.query(insertsql, [userid, statususer], (err, result) => {
                  if (err) {
                      console.error("Something error while inserting into SQL", err);
                      res.status(500).json({ error: 'Database insert failed' });
                  }
              });
                }
              })
          }
      });

      res.json({ message: 'Attendance saved successfully' });
  } else {
      res.status(400).json({ error: 'No attendance data provided' });
  }
});

app.post('/loginuser',upload.none(),async(req,res)=>{
  const {username,password} = req.body;
  console.log(`username : ${username} || password : ${password}`);
  if(username&&password){
    const sql = "SELECT * FROM account WHERE username = ?";
  con.query(sql,[username],(err,result)=>{
    if(err)throw err;
    if(result[0].password !== password){
      return res.status(400).json({message:`Password wrong not match in database`});
    }
    else{
      console.log("Success to login");
    return res.status(200).json({message: true,result});
    }
    
  }
  )
  }else{
    console.error("username or password is missing"); 
  }
})

app.post('/registeruser',upload.none(),async(req,res)=>{
  const {username,password} = req.body;
  console.log(username,password);
  if(username&&password){
    const sql = "INSERT INTO account (username,password) VALUES (?,?)";
    con.query(sql,[username,password,(err,result)=>{
      if(err)throw err;
      res.status(200).json({message: true,result});
    }])
  }
  else{
    console.error("username or password is missing");
  }
})

app.post('/getaccountuser',upload.none(),async(req,res)=>{
  const {userid} = req.body;
  console.log(`Userid get account: ${userid}`);
  if(userid){
    const sql = "SELECT * FROM account WHERE userid = ?";
    con.query(sql,[userid],(err,result)=>{
      if(err)throw err;
      return res.status(200).json({message:"Success",result});
    })
  }
  else{
    console.error("Userid is missing");
  }
})
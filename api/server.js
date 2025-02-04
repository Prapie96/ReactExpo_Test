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
  app.post("/getuserbyid", async(req,res)=>{
    const {userid} = req.body;
    const sql = "SELECT * FROM userinfo WHERE userid = ?";
    try{
          con.query(sql,[userid],(err,data)=>{
            res.status(200).json(data);
        })
    }catch(error){
      console.error("Something Wrong with sql database");
    }
    });
  const storage = multer.diskStorage({
    destination: function(req,file,cb){
      cb(null,'img')
    },
    filename: function(req,file,cb){
      const uniqueSuffix = Date.now();
      cb(null,file.fieldname +"_"+uniqueSuffix+file.originalname);
      
    }
  })
  app.post("/img",async(req,res)=>{
    const {userid} = req.body;
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
  const upload = multer({storage: storage})



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


app.post('/regisuser', upload.single("img"),async (req, res) => {
  let { firstname,lastname,nickname} = req.body;
   const img = req.file.filename;
  // console.log(firstname, lastname,nickname,img);
  console.dir(img,{depth:null});
  if(firstname && lastname && nickname && img){
    const insert = "INSERT INTO userinfo (firstname, lastname,nickname,img) VALUES (?,?,?,?)";
  con.query(insert, [firstname, lastname,nickname,img], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
  }
  else{
    console.log('firstname lastname  nickname img something missing)');
  }
  
});


app.put('/edit', upload.single("img"), async (req, res) => {
  const { firstname, lastname, nickname, userid, uri } = req.body;
  const img = req.file ? req.file.filename : null; // ตรวจสอบว่ามีการอัปโหลดรูปใหม่หรือไม่

  if (firstname && lastname && nickname && userid) {
      console.log("Get user input:", firstname, lastname, nickname, userid, img);

      if (img) {
          // ถ้ามีการอัปโหลดรูปใหม่ ให้ลบรูปเก่า
          const selectOldImg = "SELECT img FROM userinfo WHERE userid = ?";
          con.query(selectOldImg, [userid], (err, result) => {
              if (err) {
                  console.error(`Error fetching old image: ${err}`);
              } else {
                  const filePath = path.join(__dirname, 'img', result[0].img);
                  console.log(`File path: ${filePath}`);
                  if (fs.existsSync(filePath)) {
                      fs.unlink(filePath, (err) => {
                          if (err) {
                              console.error(`Error removing file: ${err}`);
                          } else {
                              console.log(`File has been successfully removed.`);
                          }
                      });
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

      con.query(changeUser, queryParams, (err, result) => {
          if (err) {
              throw err;
          }
          if (result.affectedRows === 1) {
              console.log('Success Edit');
              res.status(200).json(result);
          } else {
              console.error("Can't Edit User");
              res.status(400).json({ message: false });
          }
      });
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
  const sql ='SELECT * FROM attendance';
  con.query(sql,(err,result)=>{
    if(err)throw err;
    res.send(result);
  })
});

app.post('/attendance',async(req,res)=>{
  const {userid,statususer} = req.body;
  const insertsql = 'INSERT INTO attendance (userid,statususer) VALUES (?,?)';
  if(userid && statususer){
    con.query(insertsql,[userid,statususer],(err,result)=>{
      if(err){
        console.error("Someting error while insert into sql",err);
      }
      else{
        res.json({result})
      }
    })
  }
  else{
    console.log("Missing");
    console.log(userid,statususer)
  }
 
})
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Forminput from '@/components/Forminput'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router';
interface Inputprops {
    username:string;
    password:string;
    usertype:number;
    userid:number,
   
}
interface Userinfo{
    firstname:string,
    lastname:string,
    nickname:string,
    userid:number,
    img:string,
}
export default function loginUser() {
    const [input, setinput] = useState<Inputprops>({
        username: '',
        password: '',
        usertype: 0,
        userid: 0
      });
      
    // const [userinfo,setuserinfo] = useState<Inputprops>({} as Inputprops);
    const [userdata,setuserdata] = useState<Userinfo>({} as Userinfo);
    const handleChange = (fieldinput:string) =>(text:string)=>{
        setinput((prevState) => ({
            ...prevState,
            [fieldinput]: text,
          }));
    }
  
    const login=async()=>{
        console.log("Into login");
        const formdata = new FormData();
        formdata.append("username",input.username);
        formdata.append("password",input.password);
        console.log(`username : ${input.username} password : ${input.password}`);
        console.log(formdata);
        if(input.username && input.password){
        const api = `http://192.168.1.57:3000/loginuser`;
        await fetch(api,{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'content-Type': 'multipart/form-data',
            },
            body: formdata,
        }).then(response => response.json())
            .then(result =>{
                if(result){
                    console.log(result);
                    setinput(result.result[0]);
                    getinfouser(result.result[0]);
                }
            })
            .catch(err => console.error(err));
        }else{
            alert('กรุณากรอกข้อมูลให้ครบทุกช่องด้วยครับ');
        }
        
    }
    useEffect(()=>{
        if(userdata && userdata.firstname){
            checkRole();
        }
    },[userdata]);

    const getinfouser = async(result:any)=>{
        console.log("Into getinfo user");
        console.log(result.userid);
        const formmdata =new FormData();
        formmdata.append("userid", result.userid);
        console.log(formmdata);
        const api = `http://192.168.1.57:3000/getuserbyid`;
        await fetch(api,{
            method:'POST',
            headers:{
                "Accept": "application/json",
                'content-Type': 'multipart/form-data',
            },
            body: formmdata,
        }).then(response => response.json())
        .then(result =>{
            if(result){
                setuserdata(result[0]);
            }
        }).catch(err => console.error(err));
        
    }
    const checkRole = () =>{
        if(input.usertype === 1){
            console.log(`Admin:${userdata.firstname}`);
            router.push({pathname:'/welcomePage',params:{user:JSON.stringify(userdata)}});
            // router.push('/welcomePage');
        }
        else{
            console.log(`User:${userdata.firstname}`);
            router.push({pathname:'/(auth)/seeDetail',params:{user:JSON.stringify(userdata)}});
        }
    }
    
  return (
    <View>
        <Forminput label='Username' placeholder='Username...'values ={input.username } handleonchange={handleChange('username')}></Forminput>
        <Forminput label='Password' placeholder='Password...'values ={input.password } handleonchange={handleChange('password')}></Forminput>
        <CustomButton title='Login' Onpress={login}></CustomButton>
        <CustomButton title='Back' Onpress={()=>{console.log(input)}}></CustomButton>
    </View>
  )
}

const styles = StyleSheet.create({})
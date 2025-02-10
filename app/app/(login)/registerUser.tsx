import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Forminput from '@/components/Forminput'
import CustomButton from '@/components/CustomButton'

interface regisProps{
    username:string;
    password:string;
    confirmed_password:string;
    userid:number;
}
export default function registerUser() {
    const [input, setinput] = useState<regisProps>({
            username: '',
            password: '',
            confirmed_password: '',
            userid: 0
    });
    const handleChange = (fieldinput:string) =>(text:string)=>{
        setinput((prevState) => ({
            ...prevState,
            [fieldinput]: text,
          }));
    }
    const registerPress = async()=>{
        console.log("Into register");
        if(input.username && input.password && input.confirmed_password){
            if(input.password === input.confirmed_password){
                const formdata = new FormData();
                formdata.append("username",input.username);
                formdata.append("password",input.password);
                console.log(`username : ${input.username} password : ${input.password}`);
                console.log(formdata);
                const api = `http://192.168.1.57:3000/registeruser`;
                await fetch(api,{
                    method:'POST',
                    headers:{
                        'Accept': 'application/json',
                        'content-Type': 'multipart/form-data',
                    },
                    body: formdata,
                }).then(response =>response.json())
                    .then(result =>{
                        if(result){
                            console.log(result[0]);
                        }
                    }).catch((error)=>{
                        console.log(error);
                    });
            }
            else{
                alert("Password is not match");
            }

        }else{
           alert("Please fill all the form");
        }
    }
  return (
    <View>
        <Forminput label='Username' placeholder='Username...'values ={input.username } handleonchange={handleChange('username')}></Forminput>
        <Forminput label='Password' placeholder='Password...'values ={input.password } handleonchange={handleChange('password')}></Forminput>
        <Forminput label='Confirmed-Password' placeholder='Confirmed-Password...'values ={input.confirmed_password } handleonchange={handleChange('confirmed_password')}></Forminput>
        <CustomButton title='Register' Onpress={registerPress}></CustomButton>
        <CustomButton title='Back' Onpress={()=>{console.log(input)}}></CustomButton>
    </View>
  )
}

const styles = StyleSheet.create({})
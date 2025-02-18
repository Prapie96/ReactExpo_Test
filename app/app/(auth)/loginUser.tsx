import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Forminput from '@/components/Forminput'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router';
import { storeData,getData, getDataRole, storeRole } from '@/hooks/useAysnceStorage';
import { ThemedText } from '@/components/ThemedText';

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
                if(result.message){
                    console.log(result);
                    setinput(result.result[0]);
                    getinfouser(result.result[0]);
                }
                else{
                    alert("Username or Password Wrong !!!");
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
                storeData(result).then(getData);
            }
        }).catch(err => console.error(err));
        
    }
    const checkRole = () =>{
        if(input.usertype === 1){
            console.log(`Admin:${userdata.firstname}`);
            storeRole(input.usertype);
            console.log('nickname userdata:',userdata.nickname);
            router.push({pathname:'/(auth)/welcomePage',params:{user:JSON.stringify(userdata)}});
        
        }
        else{
            storeRole(input.usertype);
            console.log(`User:${userdata.firstname}`);
            router.push({pathname:'/(auth)/seeDetail',params:{user:JSON.stringify(userdata)}});
        }
    }
    
  return (
    <SafeAreaView style={{flex:1}}>
    <ImageBackground source={require('@/assets/images/Frame1.jpg')}style={styles.bgimg}>  
        <View style={styles.container}>  
            <View style={styles.contentcontainer}>
            <ThemedText type='title' darkColor='black'>Login User</ThemedText>
            <Forminput label='Username' placeholder='username...'values ={input.username } handleonchange={handleChange('username')} showtoggle={false}></Forminput>
            <Forminput label='Password' placeholder='password...'values ={input.password } handleonchange={handleChange('password')} showtoggle={true}></Forminput>
            <ThemedText type='link' style={{alignSelf:'flex-end',color:'grey'}}>Forget Password ?</ThemedText>
            <CustomButton title='Login' Onpress={login} style={{backgroundColor: '#C5BAFF'}} textstyle={{color:'white'}}></CustomButton>
            <CustomButton title='Back' Onpress={()=>{router.back()}}></CustomButton>    
           
            </View>
        </View>
  </ImageBackground>
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
    bgimg:{
       flex:1,
       resizeMode:'cover',
       
    },
    container:{
        flex:1,
        marginTop:'40%',
        backgroundColor:'#FFFFFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,   
            
    },
    texttitle:{
        fontSize:34,
        alignSelf:'center'
    },
    contentcontainer:{
       padding:20,
       marginTop:20,
       gap:15
    }
})
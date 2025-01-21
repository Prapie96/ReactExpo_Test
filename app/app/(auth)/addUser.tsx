import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from "@/components/CustomButton"
import Forminput from '@/components/Forminput'
import { router } from 'expo-router'
import { useState } from 'react'
export default function AddUser() {
  const [input,setinput] = useState({
        firstname:'',
        lastname:'',
        nickname:'',
    });
    const handleChange = (fieldinput:string) =>(text:string)=>{
        setinput((prevState) => ({
            ...prevState,
            [fieldinput]: text,
          }));
    }
    const handleSubmit=async () =>{
        console.log("ค่าที่กรอกในฟอร์ม: ", input);  
        if(!input.firstname || !input.lastname || !input.nickname  ){
            alert('กรุณากรอกข้อมูลให้ครบทุกช่องด้วยครับ');
        }
        else{
            console.log("Into else to fect")
            const api = 'http://192.168.1.106:3000/regisuser';
            await fetch(api,{
                method:'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({firstname:input.firstname,
                    lastname:input.lastname,
                    nickname:input.nickname
                })
            }).then(respond => respond.json()).then(result => result).catch(err => console.error)
            setinput({
                firstname:'',
                lastname:'',
                nickname:'',
            });
        }
    }
    const handleClear = () => {
        // console.log("ค่าที่กรอกในฟอร์ม: ", input); 
        // if(!input.firstname || !input.lastname || !input.nickname  ){
        //     alert('กรุณากรอกข้อมูลให้ครบทุกช่องด้วยครับ');
            
        // }
        // else{
        //     setinput({
        //         firstname:'',
        //         lastname:'',
        //         nickname:'',
        //     });
        // }
        // // router.push('/');
    };

    return (
    <View style={style.container}>
        
    <ImageBackground source={require('@/assets/images/Frame1.jpg')}style={style.bgimg}>  
    <SafeAreaView style={style.viewcontain} >
        
        <Text style={style.titletext} >กรอกข้อมูล User</Text>
        <Forminput label='Firstname' placeholder='firstname...'values ={input.firstname } handleonchange={handleChange('firstname')}></Forminput>
        <Forminput label='Lasttname' placeholder='lastname...'values ={input.lastname } handleonchange={handleChange('lastname')}></Forminput>
        <Forminput label='Nickname' placeholder='nickname...'values ={input.nickname } handleonchange={handleChange('nickname')}></Forminput>
        {/* <Forminput label = 'Lastname'placeholder='lastname...'values ={input.lastname}></Forminput>
        <Forminput label = 'Nickname'placeholder='Nickname...'values ={input.nickname}></Forminput> */}
        <CustomButton Onpress={handleSubmit} title='Add User'></CustomButton>
        <CustomButton Onpress={handleClear} title='Check'></CustomButton>
    </SafeAreaView>
    </ImageBackground>
    </View>
    
  )
}

const style = StyleSheet.create({
    container:{
        
        
    },
    viewcontain:{
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: 130,
        width: '100%',
        height: '100%',
        paddingTop:5,
        paddingLeft:30,
        paddingRight:30,
        gap: 2
        
    },
    titletext:{
        fontSize: 32,
        textAlign:'center',
    },
    bgimg:{
        backgroundAttachment: 'fixed',
        width: '100%',
        height:'100%',
        
    }
})
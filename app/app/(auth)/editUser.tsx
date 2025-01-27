import { StyleSheet, Text, View,KeyboardAvoidingView, ImageBackground } from 'react-native'
import React, { useState,useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from "@/components/CustomButton"
import Forminput from '@/components/Forminput'
import { router,useLocalSearchParams } from 'expo-router'

export default function editUser() {
    const  params = useLocalSearchParams();

    useEffect(()=>{ 
        setinput((prevState) => ({
            ...prevState, 
            firstname: params.firstname.toString(),
            lastname: params.lastname.toString(),nickname: params.nickname.toString(),
            userid:params.userid as unknown as number,
        }))
    },[]);

const [input,setinput] = useState({
    firstname: '',
    lastname: '',
    nickname: '',
    userid: 0,
});

    
    const handleChange = (fieldinput:string) =>(text:string)=>{
        setinput((prevState) => ({
            ...prevState,
            [fieldinput]: text,
          }));
    }
    const editpress = async() =>{
        console.log(input.userid);
        const api = `http://192.168.1.106:3000/edit`
        await fetch(api,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(input)
        }).then(response => response.json()).then(result => {
            if(result){
                console.log(result.firstname),
                setinput(result);
                router.push({pathname:'/(auth)/seeDetail',params:input})
            }})
            .catch(err => console.error(err)
        );
        
    }

  return (
    
    <View>
        <ImageBackground source={require('@/assets/images/Frame1.jpg')}> 
        <View style={style.viewcontain}>
        <Text style={style.titletext} >แก้ไขข้อมูล User{input.userid}</Text>
        <Forminput label='Firstname' placeholder='firstname...'values ={input.firstname } handleonchange={handleChange('firstname')}></Forminput>
        <Forminput label='Lasttname' placeholder='lastname...'values ={input.lastname } handleonchange={handleChange('lastname')}></Forminput>
        <Forminput label='Nickname' placeholder='nickname...'values ={input.nickname } handleonchange={handleChange('nickname')}></Forminput>
        <CustomButton Onpress={editpress} title='Edit User'></CustomButton>
        <CustomButton Onpress={() => router.push('/(auth)/showUser')} title='Back' style={{
            backgroundColor: '#FFFFFF',
            borderWidth:1,
        }}></CustomButton>
        </View>
        </ImageBackground>
    </View>
  )
}

const style = StyleSheet.create({
    container:{
        backgroundColor: '#E8F9FF',
        
    },
    viewcontain:{
        backgroundColor: '#FFFFFF',
        // alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 10,
        marginTop: 100,
        width: '100%',
        height: '100%',
        paddingTop:30,
        paddingLeft:30,
        paddingRight:30,
        flexDirection: 'column',
        
    },
    titletext:{
        fontSize: 32,
        textAlign:'center',
    },
})
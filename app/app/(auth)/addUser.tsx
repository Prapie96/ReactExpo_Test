import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from "@/components/CustomButton"
import Forminput from '@/components/Forminput'
import { router } from 'expo-router'
import { useState } from 'react'
export default function AddUser() {
  const [name,setname] = useState('');
    return (
    <View style={style.container}>
        
    <ImageBackground source={require('@/assets/images/Frame1.jpg')}style={style.bgimg}>  
    <SafeAreaView style={style.viewcontain} >
        
        <Text style={style.titletext} >กรอกข้อมูล User</Text>
        <Forminput label='Firstname' placeholder='firstname...' name={name} onchange={}></Forminput>
        <Forminput label = 'Lastname'placeholder='lastname...'></Forminput>
        <Forminput label = 'Nickname'placeholder='Nickname...'></Forminput>
        <CustomButton Onpress={() => router.push('/(auth)/addUser')} title='Add User'></CustomButton>
        <CustomButton Onpress={() => router.push('/(auth)/addUser')} title='Back'></CustomButton>
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
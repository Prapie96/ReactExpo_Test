import { ImageBackground, StyleSheet, Text, View,ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from "@/components/CustomButton"
import Forminput from '@/components/Forminput'
import { router } from 'expo-router'
import UserCompo from '@/components/userCompo'


export default function showUser() {
  return (
    <ScrollView style={style.container}>
        
    
    <SafeAreaView style={style.viewcontain} >
        
        <Text style={style.titletext} >ดูข้อมูล User</Text>
        <UserCompo name='John' lastname='Doe' nickname='Johnny'></UserCompo>
        <UserCompo name='Jenny' lastname='Doe' nickname='Johnny'></UserCompo>
        <UserCompo name='Pathipan' lastname='Saeyoy' nickname='Pun'></UserCompo>
        <UserCompo name='Kimnathan' lastname='Partousd' nickname='Dephnie'></UserCompo>
        <UserCompo name='Pluem' lastname='Parb' nickname='Canada'></UserCompo>
        <UserCompo name='John' lastname='Doe' nickname='Johnny'></UserCompo>
        <UserCompo name='John' lastname='Doe' nickname='Johnny'></UserCompo>
        <CustomButton Onpress={() => router.push('/(auth)/addUser')} title='Add User'></CustomButton>
        <CustomButton Onpress={() => router.push('/')} title='Back'></CustomButton>
    </SafeAreaView>
   
    </ScrollView>
    
  )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        height:'100%',
        backgroundColor: '#E8F9FF',
    },
    viewcontain:{
        backgroundColor: '#FFFFFF',
        width:'100%',
        height:'100%',
        paddingHorizontal:20,
        marginTop:100,
        alignItems:'center',
        gap:10
    },
    titletext:{
        fontSize: 32,
        textAlign:'center',
    },
    bgimg:{
        flex:1,
        
        paddingTop:36,
        paddingHorizontal:13
    }
})
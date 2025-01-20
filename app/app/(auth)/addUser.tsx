import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from "@/components/CustomButton"
import Forminput from '@/components/Forminput'
import { router } from 'expo-router'
export default function AddUser() {
  return (
    <SafeAreaView style={style.container}>
    <View style={style.viewcontain} >
        <Text style={style.titletext} >กรอกข้อมูล User</Text>
       
        <Forminput label='Firstname' placeholder='firstname...'></Forminput>
        <Forminput label = 'Lastname'placeholder='lastname...'></Forminput>
        <Forminput label = 'Nickname'placeholder='Nickname...'></Forminput>
        <CustomButton Onpress={() => router.push('/(auth)/addUser')} title='Add User'></CustomButton>
        <CustomButton Onpress={() => router.push('/(auth)/addUser')} title='Back'></CustomButton>
    </View>
    </SafeAreaView>
    
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
        gap: 2
    },
    titletext:{
        fontSize: 32,
        textAlign:'center',
    },
})
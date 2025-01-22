import { ImageBackground, StyleSheet, Text, View,ScrollView,FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from "@/components/CustomButton"
import Forminput from '@/components/Forminput'
import { router } from 'expo-router'
import UserCompo from '@/components/userCompo'
import { useState,useEffect } from 'react'

export default function showUser() {
    interface User {
        userid:number,
        firstname: string;
        lastname: string;
        nickname: string;
    }

    const [datauser,setdatauser] = useState<User[]>([]);
    
    useEffect(() => {
        const api = 'http://192.168.1.106:3000/';
        fetch(api,{
            method:'GET',
        }).then(response => response.json()).then(result => {
            if(result){
                setdatauser(result);
            }
        }).catch(err => console.error(err));
    },[])
  
  
    return (
    <ScrollView style={style.container}>
        
    
    <SafeAreaView style={style.viewcontain} >
        
        <Text style={style.titletext} >ดูข้อมูล User</Text>
        <FlatList 
            scrollEnabled = {false}
            data = {datauser}   
            renderItem={({ item }) => <UserCompo name={item.firstname} lastname={item.lastname} nickname={item.nickname} userId={item.userid} />}
            ItemSeparatorComponent={() => <View style={{height: 20}}/>}
        />
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
        
        paddingHorizontal:20,
        marginTop:100,
        alignItems:'center',
        gap:10,
        
    },
    titletext:{
        fontSize: 32,
        textAlign:'center',
    },
    bgimg:{
        flex:1,
        
        paddingTop:36,
        paddingHorizontal:13
    },
   
})
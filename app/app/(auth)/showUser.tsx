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
    // const [datauser,setdatauser] = useState<User>({userid : 0,firstname:'',lastname:'',nickname:'',});
    useEffect(() => {
        fecthdata(); //call fecthdata
    },[])
    //Create function to callback 
    function fecthdata(){
        const api = 'http://192.168.1.106:3000/';
        fetch(api,{
            method:'GET',
        }).then(response => response.json()).then(result => {
            if(result){
                setdatauser(result);
            }
        }).catch(err => console.error(err));
    }
  
    return (
    <ScrollView style={style.container}>
        
    
    <SafeAreaView style={style.viewcontain} >
        
        <Text style={style.titletext} >ดูข้อมูล User</Text>
        <FlatList 
            scrollEnabled = {false}
            data = {datauser}   
            renderItem={({ item }) => <UserCompo firstname={item.firstname} lastname={item.lastname} nickname={item.nickname} userId={item.userid} fecthdata={fecthdata} />}
            ItemSeparatorComponent={() => <View style={{height: 15}}/>}
        />
        <CustomButton Onpress={() => router.push('/(auth)/addUser')} title='Add User' textstyle={{
          color:'#FFFFFF',
        }}></CustomButton>
        <CustomButton Onpress={() => router.push('/')} title='Back' style={{
            backgroundColor: '#FFFFF',
            borderWidth:1,
        }}></CustomButton>
        
    </SafeAreaView>
   
    </ScrollView>
    
  )
}

const style = StyleSheet.create({
    container:{
       
        backgroundColor: '#E8F9FF',
    },
    viewcontain:{
        backgroundColor: '#FFFFFF',
        marginHorizontal: 15,
        marginVertical:50,
        padding:10,
        borderRadius:10
    },
    titletext:{
        fontSize: 32,
        textAlign:'center',
        marginBottom:25,
    },
   
})
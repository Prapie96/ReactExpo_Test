import { View, Text,StyleSheet,Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Controlattendence from './Controlattendence'
import { router } from 'expo-router';

interface userAttendenceProps{
  firstname : string,
  lastname: string,
  nickname: string,
  img: string,
  totalStatus: number,
  userid: number,
  handledatauser:(data: {userid: number, statususer: number}) => void;
}

const UserAttendence = ({firstname,lastname,nickname,img,totalStatus,userid,handledatauser}:userAttendenceProps) => {
  const [userStatus,setUserstatus] =useState<number>(totalStatus);
  const userattendance = {userid:userid,statususer:userStatus};

  useEffect(() => {
    setUserstatus(totalStatus); 
  }, [totalStatus]);
  
  useEffect(()=>{
    handledatauser(userattendance);
  },[userStatus])

  const userinfo = {firstname:firstname,lastname:lastname,nickname:nickname,userid:userid}
  // console.log(`Result userstatus : ${userattendance.userid} ||${userattendance.statususer} `);
  return (
    <View style={styles.userContainer}>

        <TouchableOpacity  activeOpacity={0.7} onPress={()=> router.push({pathname:'/(auth)/seeDetail',params:{user:JSON.stringify(userinfo)}})}>
          <Image source={{ uri: `http://192.168.1.57:3000/img/${img}` }} style={styles.profile} />
        </TouchableOpacity>
        <View style={{gap:10}}>
        <Text>Nickname: {nickname}</Text>
        <Text>{firstname} {lastname}</Text>
        <Controlattendence key={userStatus} selectedtotalstatus={userStatus} onSelect={(status) => { setUserstatus(status)}} ></Controlattendence>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    userContainer:{
        backgroundColor:'#FFFFFF',
        marginHorizontal:'5%',
        padding:'5%',
        flexDirection:'row',
        gap:'10%',
        borderBottomWidth:0.7,
        justifyContent:'center',
    },
    profile:{
        borderWidth:1,
        width:70,
        height:70,
        borderRadius: 40,
      
    },
})
export default UserAttendence
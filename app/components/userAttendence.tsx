import { View, Text,StyleSheet,Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Controlattendence from './Controlattendence'
import { router } from 'expo-router';

interface userAttendenceProps{
  firstname : string,
  lastname: string,
  nickname: string,
  img: string,
  totalStatus: string,
  userid: number,
}

const UserAttendence = ({firstname,lastname,nickname,img,totalStatus,userid}:userAttendenceProps) => {
  const [userStatus,setUserstatus] =useState<string>(totalStatus);
  useEffect(() => {
    setUserstatus(totalStatus); 
  }, [totalStatus]);
  const userinfo = {firstname:firstname,lastname:lastname,nickname:nickname,userid:userid}

  // console.log(userid+userStatus);
  const insertattendence = async() => {
    const api = 'http://192.168.1.57:3000/attendance';
    await fetch(api,{
      method:'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(userStatus)
    }).then(response => response.json())
      .then(result =>{console.log(result)}).catch(err => console.error(err))
  }
  console.log(userStatus);
  return (
    <View style={styles.userContainer}>
        {/* <Image source={require('@/assets/images/Antony.jpeg')} style={styles.profile}></Image> */}
        {/* <TouchableOpacity  activeOpacity={0.7} onPress={()=> router.push({pathname:'/(auth)/seeDetail',params:{user:JSON.stringify(userinfo)}})}> */}
        <TouchableOpacity  activeOpacity={0.7} onPress={insertattendence}>
          <Image source={{ uri: `http://192.168.1.57:3000/img/${img}` }} style={styles.profile} />
        </TouchableOpacity>
        <View style={{gap:10}}>
        <Text>Nickname: {nickname}</Text>
        <Text>{firstname} {lastname}</Text>
        <Controlattendence key={userStatus} selectedtotalstatus={userStatus} onSelect={setUserstatus}></Controlattendence>
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
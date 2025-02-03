import { View, Text,StyleSheet,Image } from 'react-native'
import React from 'react'
import Controlattendence from './Controlattendence'

interface userAttendenceProps{
  firstname : string,
  lastname: string,
  nickname: string,
  img: string,
  fecthdata: () => void;
}

const UserAttendence = ({firstname,lastname,nickname,img,fecthdata}:userAttendenceProps) => {
  return (
    <View style={styles.userContainer}>
        {/* <Image source={require('@/assets/images/Antony.jpeg')} style={styles.profile}></Image> */}
        <Image source={{ uri: `http://192.168.1.57:3000/img/${img}` }} style={styles.profile} />
        <View style={{gap:10}}>
        <Text>Nickname: {nickname}</Text>
        <Text>{firstname} {lastname}</Text>
        <Controlattendence></Controlattendence>
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
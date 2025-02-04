import { StyleSheet, Text, View,ScrollView, SafeAreaView, TouchableOpacity,Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Controlattendence from '@/components/Controlattendence'
import UserAttendence from '@/components/userAttendence';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';

interface User {
    userid:number,
    firstname: string;
    lastname: string;
    nickname: string;
    img:string,
}

export default function attendenceUser() {
    const [datauser,setdatauser] = useState<User[]>([]);
    const [totalstatus,setTotalstatus] = useState<string>('');
    async function fecthdata(){

    
        const api = 'http://192.168.1.57:3000/getuser';
        await  fetch(api,{
                method:'POST',
            }).then(response => response.json()).then(result => {
                if(result){
                    setdatauser(result);
              
                   
                }   
            }).catch(err => console.error(err))
    }
     useEffect(() => {
            fecthdata(); //call fecthdata
        },[]);
    
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headContainer}>
        <Text style={{color:'white'}}>เช็คชื่อนักเรียน</Text>
      </View>
    <TouchableOpacity onPress={router.back} style={styles.iconBack}>
            <AntDesign name="left" size={34} color="white" />
    </TouchableOpacity>

      <SafeAreaView style={styles.bodycontainer}>
        <View style={styles.controlcontainer}>
            <View style={{borderWidth:1,justifyContent:'center',padding:5,width:'15%'}}>
                <Text style={{fontSize:12}}>Total</Text>
            </View>
            <Controlattendence selectedtotalstatus={totalstatus} onSelect={setTotalstatus} ></Controlattendence>
        </View>
        <View>
            {datauser.map((user)=>(
                 <UserAttendence 
                    key={user.userid} 
                    firstname={user.firstname} 
                    lastname={user.lastname} 
                    nickname={user.nickname} 
                    img={user.img} 
                    userid={user.userid}
                    totalStatus={totalstatus}

                    >
                 </UserAttendence>
            ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#EDEDF7',
    },
    headContainer:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#4759A6',
        paddingTop:'15%',
        padding:'5%',
        
    },
    iconBack:{
        position:'absolute',
        top:'3%',
        left:'5%',
        
    },
    bodycontainer:{
        marginBottom:'20%',
        
    },
    controlcontainer:{
        backgroundColor:'#FFFFFF',
        paddingVertical:'5%',
        paddingRight:'5%',
        paddingLeft:'4%',
        margin:'5%',
        flexDirection:'row',
        justifyContent:'space-between',
        
    },
    
  
    
})
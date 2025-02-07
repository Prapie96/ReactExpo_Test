import { StyleSheet, Text, View,ScrollView, SafeAreaView, TouchableOpacity,Image, FlatList, Alert } from 'react-native'
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
interface Status {
    userid: number;
    statususer: number;
}

export default function attendenceUser() {
    const [datauser,setdatauser] = useState<User[]>([]);
    const [totalstatus,setTotalstatus] = useState<number>(0);
     const [datastatus, setDatastatus] = useState<Status[]>([]);
    async function fecthdata(){
        const api = 'http://192.168.1.57:3000/getuser';
        await  fetch(api,{
                method:'POST',
            }).then(response => response.json()).then(result => {
                if(result){
                    setdatauser(result)
                }   
            }).catch(err => console.error(err))
    }
    
    useEffect(() => {
        fecthdata(); //call fecthdata
       
    },[]);
 
    const savePress = async()=>{
        console.log("Into savePress");
        console.log(datastatus);
        if(datastatus.length === 0)
        {
            console.error("datauser undefined");
        }
        else
        {
            const formdata = new FormData();
            formdata.append("attendanceData", JSON.stringify(datastatus));
            // console.log(formdata);
            console.log("Into savePress fecth");
            const api = 'http://192.168.1.57:3000/attendance';
            await fetch(api,{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                "Content-Type": "multipart/form-data",
                // 'Content-Type': 'application/json'
            },
            body: formdata,
            }).then(response => response.json())
            .then(result =>{console.log(result)})
            .catch(err => console.error(err))
        }
    }

    const handleDatafromuser = (userattendance:{userid:number,statususer:number})=>{
        setDatastatus(prevState => {
            const existingIndex = prevState.findIndex(item => item.userid === userattendance.userid);
            if (existingIndex !== -1) {
                const updatedData = [...prevState];
                updatedData[existingIndex] = { userid: userattendance.userid, statususer: userattendance.statususer };
                return updatedData;
            }
            return [...prevState, { userid: userattendance.userid, statususer: userattendance.statususer }];
        });
        // setDatastatus(prevState => [...prevState, { userid: userattendance.userid, statususer: userattendance.statususer }]);
    }

    const alertModal = () => Alert.alert('ต้องการบันทึกเลยไหม','คุณต้องการบันทึนการเข้าเรียนของนักเรียนหรือไม่',[
        {
            text: 'ยืนยัน',
            onPress: () => {
                alert('บันทึกการเช้าเรียนของนักเรียนเสร็จสิ้น'),
                savePress();
            }
        },
        {
            text:'ยกเลิก',
            onPress:()=>{
                alert('ยกเลิกบันทึกการเช้าเรียน');
            }
            
        }
    ])
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headContainer}>
      <TouchableOpacity onPress={router.back}>
            <AntDesign name="left" size={34} color="white" />
        </TouchableOpacity>
        <Text style={{color:'white'}}>เช็คชื่อนักเรียน</Text>
        <TouchableOpacity onPress={alertModal}>
            <Text style={{color:'white'}}>บันทึก</Text>
        </TouchableOpacity>
        
      </View>
    

      <SafeAreaView style={styles.bodycontainer}>
        <View style={styles.controlcontainer}>
            <View style={{justifyContent:'center',padding:5,width:'15%'}}>
                <Text style={{fontSize:14}}>Total</Text>
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
                    handledatauser={handleDatafromuser}
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
        backgroundColor:'#4759A6',
        paddingTop:'15%',
        padding:'5%',
        flexDirection:'row',
        justifyContent:'space-between'
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
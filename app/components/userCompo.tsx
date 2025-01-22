import { View, Text,StyleSheet, Button,Alert, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import CustomButton from './CustomButton'
interface userCompoProps{
    firstname : string,
    lastname: string,
    nickname: string,
    userId: number,
    fecthdata: () => void;
}

const userCompo = ({firstname,lastname,nickname,userId,fecthdata}:userCompoProps) => {
    const deleteAlert = ()=>Alert.alert('Warnning Delete !!','คุณต้องการลบข้อมูลUser คนนี้ออกจากระบบหรือไม่',[
            {
                text: 'ยืนยัน',
                onPress: () => deleteuser(userId),
            },
            {
                text:'ยกเลิก',
                onPress: () => console.log('Cancel Pressed'),
            }
        ]);
    
    const deleteuser = (id:number) =>{
        const getid = {userid: id}
        console.log("userid :"+ getid.userid);
        const api = `http://192.168.1.106:3000/deleteuser`;

        fetch(api,{
            method:'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(getid)
        }).then(response => response.json()).then(result =>{
        }).catch(err => console.error(err));
        fecthdata();
    }
  
  
    return (
    <SafeAreaView style={style.container}>
    <View style={style.viewcontainer}>
        <Text style={style.textnickname}>{nickname}</Text>
        <Text>Name: {firstname} {lastname} </Text>
    </View>
    <View style={style.viewbutton}>
    <TouchableOpacity style={style.buttoncontainer} onPress={()=> router.push({pathname:'/(auth)/editUser',params:{firstname,lastname,nickname,userId}})}>
        <Text> EDIT </Text>
    </TouchableOpacity>
    <TouchableOpacity style={style.buttoncontainer} onPress={deleteAlert}>
        <Text> delete </Text>
    </TouchableOpacity>
    </View>
    
    
    </SafeAreaView>
 
  )
}

const style = StyleSheet.create({
    container:{
       
       backgroundColor:'#C5BAFF',
       borderRadius:20,
       paddingBottom:30,
       paddingHorizontal:20,
       flex:2,
       flexDirection:'row',
       justifyContent: 'space-between',
       flexWrap: 'wrap'
    },
    viewcontainer:{
        width: '50%',
    },
    viewbutton:{
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
        
    },
    buttoncontainer:{
        backgroundColor: '#C4D9FF',
        padding: 10,
        justifyContent:'center',
        borderRadius: 5
    },
    textnickname:{
        fontSize:16,
        
    },
    
});



export default userCompo
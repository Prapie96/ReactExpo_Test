import { View, Text,StyleSheet, Button,Alert, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import CustomButton from './CustomButton'
import * as ImagePicker from 'expo-image-picker';
interface userCompoProps{
    firstname : string,
    lastname: string,
    nickname: string,
    userId: number,
    fecthdata: () => void;
  
}

const userCompo = ({firstname,lastname,nickname,userId,fecthdata}:userCompoProps) => {
    
    
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
  
    const userinfo = {firstname:firstname,lastname:lastname,nickname:nickname,userid:userId}
    return (
    <SafeAreaView style={style.container}>
    <View style={style.viewcontainer}>
        <Text style={style.textnickname}>{nickname}</Text>
        <Text>Name: {firstname} {lastname} </Text>
        
    </View>
    <View style={style.viewbutton}>
    {/* <TouchableOpacity activeOpacity={0.7} style={style.buttoncontainer} onPress={()=> router.push({pathname:'/(auth)/editUser',params:{firstname,lastname,nickname,userId}})}>
        <Text> EDIT </Text>
    </TouchableOpacity> */}
    {/* <TouchableOpacity activeOpacity={0.7} style={style.buttoncontainer} onPress={deleteAlert}>
        <Text> delete </Text>
    </TouchableOpacity> */}
    <TouchableOpacity activeOpacity={0.7} style={style.buttoncontainer} onPress={() =>router.push({pathname:'/(auth)/seeDetail',params:userinfo})}>
        <Text> see details </Text>
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
        gap: 10
        
    },
    buttoncontainer:{
        backgroundColor: '#FFFFFF',
        justifyContent:'center',
        borderRadius: 5,
        borderWidth:1,
        width: '50%',
         height:'100%',
         textAlign:'center',
         alignItems:'center',
    
    },
    textnickname:{
        fontSize:16,
        
    },image: {
        width:'100%',
        height:'100%'
        
      }
    
});



export default userCompo
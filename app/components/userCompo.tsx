import { View, Text,StyleSheet, Button,Alert, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import CustomButton from './CustomButton'
import * as ImagePicker from 'expo-image-picker';
interface userCompoProps{
    firstname : string,
    lastname: string,
    nickname: string,
    userid: number,
    img: string,
    fecthdata: () => void;
  
}

const userCompo = ({firstname,lastname,nickname,userid,img,fecthdata}:userCompoProps) => {
    const userinfo = {firstname:firstname,lastname:lastname,nickname:nickname,userid:userid}
    return (
    <TouchableOpacity activeOpacity={0.7} onPress={()=> router.push({pathname:'/(auth)/seeDetail',params:{user:JSON.stringify(userinfo)}})}>
    <SafeAreaView style={styles.container}>
        <View style={styles.viewcontainer}>
        <Image source={{ uri: `http://192.168.1.57:3000/img/${img}` }} style={styles.containerimg} />
        </View>
        <View style={styles.textcontainer}>
        <Text style={styles.text}>{nickname}</Text>
        <Text style={styles.text}>
            {/* {nickname}{'\n'} */}
            Name: {firstname} {lastname} </Text>
        </View>
    
        
 
    <View style={styles.viewbutton}>
    {/* <TouchableOpacity activeOpacity={0.7} style={styles.buttoncontainer} onPress={() =>router.push({pathname:'/(auth)/seeDetail',params:{user:JSON.stringify(userinfo)}})}>
        <Text> see details </Text>
    </TouchableOpacity> */}
    </View>
    </SafeAreaView>
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        gap:15,
        backgroundColor:'#FFFFFF',
        flexWrap:'nowrap',
        paddingBottom:20,
        borderLeftWidth:5,
        borderColor:'#C5BAFF',
        shadowColor:'#C4D9FF',
        shadowOpacity:0.7,
        elevation: 10,
       

       
    },
    viewcontainer:{
        width: '30%',
        // borderWidth:1,
        alignItems:'center'
    },
    textcontainer:{
        // borderWidth:1,
        width:'60%',
        gap:5,
        justifyContent:'center'
        
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
    text:{
        fontSize:16,
    
        
    },containerimg:{
        width:70,
        height:70,
        borderRadius: 40,
        
       
    }
    
});



export default userCompo
import { View, Text,StyleSheet, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

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
  
  
    return (
    <SafeAreaView style={style.container}>
    <View >
        <Text>Name: {firstname} {lastname} | {nickname}</Text>
    </View>
    <Button title="edit" onPress={()=> router.push({pathname:'/(auth)/editUser',params:{firstname,lastname,nickname,userId}}) }></Button>
    <Button title="delete" onPress={() => deleteuser(userId)}></Button>

    </SafeAreaView>
 
  )
}

const style = StyleSheet.create({
    container:{
        backgroundColor:'#C5BAFF',
        paddingBottom:20,
        paddingHorizontal:9,
        alignItems:'center',
        borderRadius:21,
        flexDirection: 'row',
        gap:10,
    },
    viewcontainer:{
        flex: 1,
        
    }
});



export default userCompo
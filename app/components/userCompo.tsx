import { View, Text,StyleSheet, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
interface userCompoProps{
    name : string,
    lastname: string,
    nickname: string,
    userId: number,
}

const userCompo = ({name,lastname,nickname,userId}:userCompoProps) => {
    
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
        }).then(response => response.json()).then(result =>result).catch(err => console.error(err));
        
    }
  
  
    return (
    <SafeAreaView style={style.container}>
    <View >
        <Text>Name: {name} {lastname} | {nickname}</Text>
    </View>
    <Button title="edit" onPress={()=> router.push(`/(auth)/editUser`) }></Button>
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
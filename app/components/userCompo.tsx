import { View, Text,StyleSheet, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
interface userCompoProps{
    name : string,
    lastname: string,
    nickname: string,
}

const userCompo = ({name,lastname,nickname}:userCompoProps) => {
  return (
    <SafeAreaView style={style.container}>
    <View >
        <Text>Name: {name} {lastname} | {nickname}</Text>
    </View>
    <Button title="edit" onPress={()=> router.push(`/(auth)/editUser`) }></Button>
    <Button title="delete" ></Button>

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
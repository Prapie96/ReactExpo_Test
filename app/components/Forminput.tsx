import { View, Text,StyleSheet,TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


interface ForminputProps{
     label: string,
     placeholder : string,
    
}
const Forminput = ({label,placeholder}:ForminputProps) => {
  return (
    <SafeAreaView style={style.container}>
    <View style={style.container}>
     
    </View>
    <View>
    <Text style={style.labeltext}>{label}</Text>
    <TextInput style={style.inputfield} placeholder={placeholder}></TextInput>
    </View>
   
    </SafeAreaView>
  )
}
const style = StyleSheet.create({
    container:{
        display:'flex',
        
    },
    labeltext:{
        fontWeight:600,
    },
    inputfield:{
        borderWidth : 1,
        borderRadius:18,
    
    }
});
export default Forminput
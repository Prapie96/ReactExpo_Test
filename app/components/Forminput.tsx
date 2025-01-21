import { View, Text,StyleSheet,TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


interface ForminputProps{
     label: string,
     placeholder : string,
     name:string
    onchange: () => void,
}
const Forminput = ({label,placeholder,name,onchange}:ForminputProps) => {
  return (
    <SafeAreaView style={style.container}>
    <View>
    <Text style={style.labeltext}>{label}</Text>
    <TextInput style={style.inputfield} placeholder={placeholder} value={name} onChange={onchange}></TextInput>
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
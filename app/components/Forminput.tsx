import { View, Text,StyleSheet,TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


interface ForminputProps{
     label: string,
     placeholder : string,
     values:string
     handleonchange: (text: string) => void;
}
const Forminput = ({label,placeholder,values,handleonchange}:ForminputProps) => {
  return (
    <SafeAreaView style={style.container}>
    <View>
    <Text style={style.labeltext}>{label}</Text>
    <TextInput style={style.inputfield} placeholder={placeholder} value={values} onChangeText={handleonchange}></TextInput>
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
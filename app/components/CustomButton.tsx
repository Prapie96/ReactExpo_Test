import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'

interface CustomButtonProps{
    Onpress: () => void; //Event Press
    title: string, // text on button
    // containerStyles? : string, //css 
}


const CustomButton = ({Onpress,title}:CustomButtonProps) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={style.containbutton} onPress={Onpress}>
      <Text style={style.buttontext}>{title}</Text>
    </TouchableOpacity>
  );
}


const style = StyleSheet.create({
    containbutton:{
        color: '#FFFFFF',
        padding: 10,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: '#C4D9FF',
        marginTop:10,
        borderRadius:13
    },
    buttontext:{
        fontSize:24,
    }

});



export default CustomButton
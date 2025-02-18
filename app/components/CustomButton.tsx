import { View, Text, TouchableOpacity,StyleSheet, StyleProp } from 'react-native'
import React from 'react'

interface CustomButtonProps{
    Onpress: () => void; //Event Press
    title: string, // text on button
    style ?: React.ComponentProps<typeof View>['style'];
    textstyle ? : React.ComponentProps<typeof Text>['style'];
}


const CustomButton = ({Onpress,title,style,textstyle}:CustomButtonProps) => {
  return (
    <TouchableOpacity activeOpacity={0.7} 
      style={[
        styles.containbutton,
        style
      ]}
      onPress={Onpress} >
      <Text style={[styles.buttontext,textstyle]}>{title}</Text>
      
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
    containbutton:{
        color: '#FFFFFF',
        padding: 10,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: '#C4D9FF',
        marginTop:10,
        borderRadius:13,
        width:'100%'
    },
    buttontext:{
        fontSize:24,
        fontFamily:'Itim'
    }

});



export default CustomButton
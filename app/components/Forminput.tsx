import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import { ThemedText } from './ThemedText';

interface ForminputProps {
  label: string;
  placeholder: string;
  values: string;
  handleonchange: (text: string) => void;
  showtoggle:boolean, // get value boolean to show toggle
}

const Forminput = ({ label, placeholder, values, handleonchange,showtoggle}: ForminputProps) => {
  const [showPassword,setShowPassword] = useState(true); // set state toggle
    const togglePassword=()=>{
          console.log('Hide Password input Filed');
          setShowPassword(!showPassword);
     }
  return (
    <View style={style.container}>
      <ThemedText type='defaultSemiBold' darkColor='black'>{label}</ThemedText>
      <View style={style.inputContainer}>
        <TextInput
          style={[style.inputfield, { fontFamily: 'Itim' }]}
          placeholder={placeholder}
          value={values}
          onChangeText={handleonchange}
          secureTextEntry={showtoggle ? showPassword : false}
        />
       {showtoggle &&  <TouchableOpacity style={style.eyeIcon} onPress={togglePassword}>
        {
          showPassword ? <Entypo name="eye" size={24} color="black" /> 
          : <Entypo name="eye-with-line" size={24} color="black" />
        }
        </TouchableOpacity>}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: 'flex',
  },
  labeltext: {
    fontWeight: '500',
  },
  inputContainer: {
    position: 'relative',
    fontFamily:'Itim'
  },
  inputfield: {
    borderWidth: 1,
    borderRadius: 18,
    paddingLeft: 10,
    height: 'auto', // ขนาดความสูงของ TextInput
  },
  eyeIcon: {
    position: 'absolute',
    right: 10, // ทำให้ไอคอนอยู่ด้านขวาของ TextInput
    top: '30%',
    
  },
});

export default Forminput;

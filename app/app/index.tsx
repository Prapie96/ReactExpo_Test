import { StyleSheet, Text, View, Image, ImageBackground, } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from "@/components/CustomButton"
import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';

export default function index() {
  return (
    <View >
      
      <ImageBackground source={require('@/assets/images/bg-expoproject.png')}> 
      <SafeAreaView style={styles.container}>
        <Image source={require('@/assets/images/Monster.png')}/>
        <Text style={styles.titleText}>Welcome,Pie</Text>
        <Text>Welcome to applicion to handle users in systems</Text>
        <Text>select the button to choose menu.</Text>
        <CustomButton Onpress={() => router.push('/(auth)/addUser')} title='Add User'></CustomButton>
        <CustomButton Onpress={()=>router.push('/(auth)/showUser')}title='See All User'></CustomButton>
      </SafeAreaView>
      </ImageBackground>
      

    
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    gap: 10,
    height: '100%',
  },
  titleText:{
    fontSize:34,
  },
  bgimg:{
  
    width: '50%',
    height:'100%',
  }




  // Circle:{
  //   backgroundColor:'#c4d9ff',
  //   width: 100,
  //   height: 100,
  //   borderRadius: 50,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginBottom: 20,
  // }

})
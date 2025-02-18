import { StyleSheet, Text, View, Image, ImageBackground, } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from "@/components/CustomButton"
import { Redirect, router } from 'expo-router';

export default function index() {
  return (
    <View >
      <ImageBackground source={require('@/assets/images/bg-expoproject.png')}> 
      <SafeAreaView style={styles.container}>
        <Image source={require('@/assets/images/Monster.png')}/>
        <Text style={styles.titleText}>Welcome To MonsterApp</Text>
        <Text>This app is about managing the monster in your order.</Text>
        {/* <Text>select the button to choose menu.</Text> */}
        <CustomButton Onpress={() => router.push('/(auth)/loginUser')} title='Login'textstyle={{
          color:'#FFFFFF',
        }}
        style={{
          backgroundColor: '#C5BAFF',
        }}
        >
          
        </CustomButton>
        <CustomButton Onpress={()=>router.push('/(auth)/addUser')}title='Register' textstyle={{
          color:'#FFFFFF',
        }}
          >
        </CustomButton>

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
      paddingHorizontal:20
    },
    titleText:{
      fontSize:28,
    },
    bgimg:{
    
      width: '50%',
      height:'100%',
    }
  
  })
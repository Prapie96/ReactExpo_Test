import { StyleSheet, Text, View, Image, ImageBackground,BackHandler, Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from "@/components/CustomButton"
import { router, useLocalSearchParams } from 'expo-router';
import { clearAll } from '@/hooks/useAysnceStorage';
import { ThemedText } from '@/components/ThemedText';

export default function welcomePage() {
  const {user} = useLocalSearchParams();
  console.log(JSON.parse(user.toString()));
  const params = JSON.parse(user.toString());
  console.log('param all',params)
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Warning!', 'If you continue will sign-out from app ,Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => {clearAll(),router.push('/')}},
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);


  return (
    <View >
      <ImageBackground source={require('@/assets/images/bg-expoproject.png')}> 
      <SafeAreaView style={styles.container}>
        <Image source={require('@/assets/images/Monster.png')}/>
        <ThemedText type='title' darkColor='black'>Dashboard Admin:{params?.nickname || params[0].nickname}</ThemedText >
        <ThemedText darkColor='black'>Welcome to applicion to handle users in systems</ThemedText >
        <ThemedText darkColor='black'>select the button to choose menu.</ThemedText >
        <CustomButton Onpress={() => router.push('/(auth)/addUser')} title='Add User'textstyle={{
          color:'#FFFFFF',
        }}
        style={{
          backgroundColor: '#C5BAFF',
        }}
        >
          
        </CustomButton>
        <CustomButton Onpress={()=>router.push('/(auth)/showUser')}title='See All User' 
          style={{
            backgroundColor: '#FFFFF',
            borderWidth:1,
          }}>
        </CustomButton>
      <CustomButton Onpress={()=>router.push('/(auth)/attendenceUser')} title='Attendence'></CustomButton>
      {/* <CustomButton Onpress={()=>router.push('/(auth)/dashboard')} title='Dashboard'></CustomButton> */}
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
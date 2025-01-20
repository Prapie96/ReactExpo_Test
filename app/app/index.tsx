import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from "@/components/CustomButton"
import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';

export default function index() {
  return (
    <SafeAreaView >
      <View style={styles.container}>
        <Image source={require('@/assets/images/Monster.png')}/>
        <Text style={styles.titleText}>Welcome,Pie</Text>
      <Text>select the button to choose menu.</Text>
      <CustomButton Onpress={() => router.push('/(auth)/addUser')} title='Add User'></CustomButton>
      <CustomButton Onpress={()=>router.push('/(auth)/seeUser')}title='See All User'></CustomButton>
      </View>

    
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 140,
    alignItems:'center',
    justifyContent:'center',
    gap: 10,
  },
  titleText:{
    fontSize:34,
  }

})
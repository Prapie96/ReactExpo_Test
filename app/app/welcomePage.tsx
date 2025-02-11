import { StyleSheet, Text, View, Image, ImageBackground, } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from "@/components/CustomButton"
import { StatusBar } from 'expo-status-bar';
import { Redirect, router, useLocalSearchParams } from 'expo-router';

// interface adminInfoprops{
//   firstname:string,
//   lastname:string,
//   nickname:string,
//   userid:number,
// }
export default function welcomePage() {
      const {user} = useLocalSearchParams();
      console.log(JSON.parse(user.toString()));
      const params = JSON.parse(user.toString());
      // const [admininfo,setAdmininfo] = useState<adminInfoprops>({firstname:'',lastname:'',nickname:'',userid:0});
  return (
    <View >
      <ImageBackground source={require('@/assets/images/bg-expoproject.png')}> 
      <SafeAreaView style={styles.container}>
        <Image source={require('@/assets/images/Monster.png')}/>
        <Text style={styles.titleText}>Welcome, Admin:{params.nickname}</Text>
        <Text>Welcome to applicion to handle users in systems</Text>
        <Text>select the button to choose menu.</Text>
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
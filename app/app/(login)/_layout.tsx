import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { Stack } from 'expo-router'
export default function login_layout() {
  return (
   <>
    <Stack>
      <Stack.Screen name='loginUser'options={{headerShown: false}}/>
      <Stack.Screen name='registerUser'options={{headerShown: false}}/>
      

    </Stack>
   </>
  )
}

const styles = StyleSheet.create({
    container:{
        height: '100%',
    },
    scrollcontainer:{

    }
})
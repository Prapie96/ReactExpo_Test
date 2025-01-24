import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { Stack } from 'expo-router'
export default function auth_layout() {
  return (
   <>
    <Stack>
      <Stack.Screen name='addUser'options={{headerShown: false}}/>
      <Stack.Screen name='showUser'options={{headerShown: false}}/>
      <Stack.Screen name='editUser'options={{headerShown: false}}/>
      <Stack.Screen name='seeDetail'options={{headerShown: false}}/>
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
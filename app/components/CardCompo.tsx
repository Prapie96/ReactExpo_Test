import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { ThemedText } from './ThemedText'

interface CardCompoProps{
    title:string,
    total:number
}
const CardCompo = ({title,total}:CardCompoProps) => {
  return (
     <View style={styles.container}>
        <ThemedText>{title}</ThemedText>
        <ThemedText type='subtitle'>{total}</ThemedText>
    </View>
  )
}

const styles =  StyleSheet.create({
    container:{
        backgroundColor:'#7D6FC5',
        width:84,
        height:'100%',
        justifyContent:'center',
        paddingTop:10,
        paddingHorizontal:2,
        borderRadius:13
    }
})

export default CardCompo
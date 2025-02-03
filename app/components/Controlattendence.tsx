import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'

const Controlattendence = () => {
  return (
     <View style={{flexDirection:'row',width:'70%'}}>
        <TouchableOpacity style={[styles.container,{backgroundColor:'#9EDF9C'}]}><Text style={{fontSize:12}}>มาเรียน</Text></TouchableOpacity>
        <TouchableOpacity style={styles.container}><Text style={{fontSize:12}}>มาสาย</Text></TouchableOpacity>
        <TouchableOpacity style={styles.container}><Text style={{fontSize:12}}>ลา</Text></TouchableOpacity>
        <TouchableOpacity style={styles.container}><Text style={{fontSize:12}}>ขาดเรียน</Text></TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        borderWidth:0.5,
        padding:'2%',
        paddingHorizontal:'5%',
        
    }
})
export default Controlattendence
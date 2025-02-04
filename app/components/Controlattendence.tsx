import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'

interface ControlattendenceProps{
  selectedtotalstatus? : string,
  onSelect?:(status:string) => void
}

const Controlattendence = ({selectedtotalstatus ='',onSelect}:ControlattendenceProps) => {
  const [selected, setSelected] = useState('');

  useEffect(()=>{
    setSelected(selectedtotalstatus);

  },[selectedtotalstatus]);
  
  const handlePress = (value: string) => {
    setSelected(value);
    if(onSelect){
      onSelect(value);
    }
  }
  const selectedcolor =(status:string)=>{
    return selected === status? getcolor(status) : 'white'
  };
  const getcolor = (status: string) =>{
    switch (status){
      case 'มาเรียน':
      return '#9EDF9C' ;
      case 'มาสาย':
      return '#40ADDC' ;
      case 'ลา':
      return '#FF9416' ;
      case 'ขาดเรียน':
      return '#ED4545' ;
      default :
      return 'white' ;
    }
  }
  return (
    //  <View style={{flexDirection:'row',width:'70%'}}>
    //     <TouchableOpacity onPress={() => handlePress('มาเรียน')} 
    //       style={[styles.container,{ backgroundColor: selectedcolor('มาเรียน') }]}>
    //       <Text style={{fontSize:12}}>มาเรียน</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity onPress={() => handlePress('มาสาย')} 
    //       style={[styles.container,{ backgroundColor:selectedcolor('มาสาย') }]}>
    //       <Text style={{fontSize:12}}>มาสาย </Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity onPress={() => handlePress('ลา')} 
    //       style={[styles.container,{ backgroundColor: selectedcolor('ลา')}]}>
    //       <Text style={{fontSize:12}}> ลา </Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity onPress={() => handlePress('ขาดเรียน')} 
    //       style={[styles.container,{ backgroundColor: selectedcolor('ขาดเรียน')}]}>
    //       <Text style={{fontSize:12}}>ขาดเรียน</Text>
    //     </TouchableOpacity>
    // </View>
    <View style={{flexDirection:'row',width:'70%'}}>
    {['มาเรียน','มาสาย','ลา','ขาดเรียน'].map((status) => (
      <TouchableOpacity activeOpacity={0.7} 
        key={status} 
        onPress={() => handlePress(status)} 
        style={[styles.container,{ backgroundColor: selectedcolor(status) }]}>
        <Text style={[{fontSize:12,color: selected === status ? 'white' : 'black' }]}>{status}</Text>
      </TouchableOpacity>
    ))}

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
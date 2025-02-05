import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'

interface ControlattendenceProps{
  selectedtotalstatus? : number,
  onSelect?:(status:number) => void
}

const Controlattendence = ({selectedtotalstatus=0,onSelect}:ControlattendenceProps) => {
  const [selected, setSelected] = useState<number>(0);

  useEffect(()=>{
    setSelected(selectedtotalstatus);

  },[selectedtotalstatus]);
  
  const handlePress = (value: number) => {
    setSelected(value);
    if(onSelect){
      onSelect(value);
    }
  }
  const selectedcolor =(status:number)=>{
    return selected === status? getcolor(status) : 'white'
  };
  const changetostring = (status: number)=>{
    switch (status){
      case 1:
      return 'มาเรียน' ;
      case 2:
      return 'มาสาย' ;
      case 3:
      return 'ลา';
      case 4:
      return 'ขาดเรียน' ;
      default :
      return 'error' ;
    }
  }
  const getcolor = (status: number) =>{
    switch (status){
      case 1:
      return '#9EDF9C' ;
      case 2:
      return '#40ADDC' ;
      case 3:
      return '#FF9416' ;
      case 4:
      return '#ED4545' ;
      default :
      return 'white' ;
    }
  }

  return (

    <View style={{flexDirection:'row',width:'70%'}}>
    {[1,2,3,4].map((status) => (
      <TouchableOpacity activeOpacity={0.7} 
        key={status} 
        onPress={() => handlePress(status)} 
        style={[styles.container,{ backgroundColor: selectedcolor(status) }]}>
        <Text style={[{fontSize:12,color: selected === status ? 'white' : 'black' }]}>{(changetostring(status))}</Text>
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
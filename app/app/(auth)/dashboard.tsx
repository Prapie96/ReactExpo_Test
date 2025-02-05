import { View, Text,StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'

interface dashboardProps{
    userid:number,
    statusid: string,
}

const dashboard = () => {
    const [userstatus,setStatususer] = useState<dashboardProps[]>([]);
    async function fecthstatusdata(){
            const api = 'http://192.168.1.57:3000/checkuser';
            await  fetch(api,{
                    method:'POST',
                }).then(response => response.json()).then(result => {
                    if(result){
                        console.log(result);
                    }   
                }).catch(err => console.error(err))
        }
    useEffect(()=>{
        fecthstatusdata();
    },[]);
    


  return (
    <View style={styles.Container}>
      <Text>dashboard</Text>
      <Text>มาเรียน</Text>
      {userstatus.map((item) => (
        <View key={item.userid}>
          <Text>{item.statusid}</Text>
        </View>
      ))}
    </View>
  )
}
const styles = StyleSheet.create({
    Container:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
    },
    profile:{
        
    },
})
export default dashboard
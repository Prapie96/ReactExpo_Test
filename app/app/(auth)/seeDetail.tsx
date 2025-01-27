import { ImageBackground,Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'

export default function seeDetail() {
  const params = useLocalSearchParams();
  console.log(params);
  const [userdata,setuserdata] =useState();
  const fecthdata =async () =>{
    const api = 'http://192.168.1.106:3000getuserbyid';
    await fetch(api,{
      method:'POST',
      headers:{'Accept': 'application/json','Content-Type': 'application/json'},
      body: JSON.stringify(params.userid)
    }).then(response => response.json())
      .then(result => setuserdata(result))
      .catch(err => console.error(err));
  }
  const deleteuser = () =>{
    const getid = {userid: params.userid}
    console.log("userid :"+ getid.userid);
    const api = `http://192.168.1.106:3000/deleteuser`;

    fetch(api,{
        method:'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(getid)
    }).then(response => response.json()).then(result =>{router.push('/(auth)/showUser')
    }).catch(err => console.error(err));
}
const deleteAlert = ()=>Alert.alert('Warnning Delete !!','คุณต้องการลบข้อมูลUser คนนี้ออกจากระบบหรือไม่',[
  {
      text: 'ยืนยัน',
      onPress: () => deleteuser(),
  },
  {
      text:'ยกเลิก',
      onPress: () => console.log('Cancel Pressed'),
  }
]);
  return (
      <View>
        <ImageBackground source={require('@/assets/images/bg-expoproject.png')} style={styles.bgimg}> 
        <View style={{position:'relative'}}>
        <Text style={[styles.xsymbol,{fontSize:46}]} onPress={()=>{router.push('/(auth)/showUser')}} >{'\u2717'}</Text>
        </View>
         <SafeAreaView style={styles.container}>
          <View style={styles.profile}>
            <Image source={require('@/assets/images/Monster.png')}></Image>
          </View>
          <View >
            <Text style={styles.font}>Name: {[params.firstname,` `,params.lastname]}</Text>
            <Text style={styles.font}>Nickname:{params.nickname}</Text>
            <Text style={styles.font}>UserId:{params.userid}</Text>

          </View>
          <TouchableOpacity activeOpacity={0.7} style={[styles.buttoncontainer,{backgroundColor:'#C4D9FF'}]} onPress={()=>router.push({pathname:'/(auth)/editUser',params:params})}>
            <Text> EDIT </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={[styles.buttoncontainer,{backgroundColor:'#C5BAFF'}]} onPress={deleteAlert}>
            <Text> delete </Text>
          </TouchableOpacity>
         </SafeAreaView>
      </ImageBackground>
      </View>
    
  )
}

const styles = StyleSheet.create({
  bgimg:{
    width: '100%',
    height:'100%',
  },
  container:{
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    gap:10,
    marginTop:50,
  },
  profile:{
    borderWidth:1,
    width:'50%',
    height:'50%',
    backgroundColor:'#EAEAEA',
    alignItems:'center'  
  },
  font:{
    fontSize:18
  },
  buttoncontainer:{
    backgroundColor: '#FFFFFF',
    justifyContent:'center',
    borderRadius: 5,

    textAlign:'center',
    alignItems:'center',
    padding:20
  },
  xsymbol:{
    position:'absolute',
    top:30,
    right:20
    
  }

})
import { ImageBackground,Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import Spinner from 'react-native-loading-spinner-overlay'

interface userimg{
  uri: string;
}


export default function seeDetail() {
  const [loading,setloading] = useState(false);
  const {user} = useLocalSearchParams();
  const [userdata, setuserdata] = useState<userimg>();
  // console.log(JSON.parse(user.toString()));
  const params = JSON.parse(user.toString())

  useEffect(()=>{
    fecthdata();
  },[])

  const fecthdata =async () =>{
    setloading(true);
    const api = 'http://192.168.1.57:3000/img';
    await fetch(api,{
      method:'POST',
      headers:{'Accept': 'application/json','Content-Type': 'application/json'},
      body: JSON.stringify({userid:params.userid})
    }).then(response => response.json())
      .then(result => {
        if(result){
          console.log(result);
          setuserdata(result);
        }
      })
      .catch(err => console.error(err))
      .finally(()=> {setloading(false)});
  }
 

  const deleteuser = () =>{
    setloading(true);
    const getid = {userid: params.userid}
    console.log("userid :"+ getid.userid);
    const api = `http://192.168.1.57:3000/deleteuser`;

    fetch(api,{
        method:'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(getid)
    }).then(response => response.json()).then(result =>{
      if(result){
      router.push('/(auth)/showUser');
      setloading(false);
      }
      else{
        console.log('Something Error result != true');
      }
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
         <Spinner
          visible={loading}
          textContent={'Loading User info...'}
          textStyle={styles.spinnerTextStyle}
        />
          <View style={styles.profile}>
            {userdata && <Image style={styles.bgimg} 
            source={userdata?.uri ? { uri: userdata.uri} : require('@/assets/images/Frame1.jpg')} >
            </Image>}
          </View>

          <View >
            <Text style={styles.font}>Name: {[params.firstname,` `,params.lastname]}</Text>
            <Text style={styles.font}>Nickname:{params.nickname}</Text>
            <Text style={styles.font}>UserId:{params.userid}</Text>
          </View>

          <TouchableOpacity activeOpacity={0.7} style={[styles.buttoncontainer,{backgroundColor:'#C4D9FF'}]} onPress={()=>router.push({pathname:'/(auth)/editUser',params:{user:JSON.stringify({...params, uri: userdata?.uri})}})}>
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
    marginTop:80,
  },
  profile:{
    borderWidth:1,
    width:'80%',
    height:'50%',
    backgroundColor:'#EAEAEA',
    alignItems:'center'  
  },
  font:{
    fontSize:18,
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
    
  },spinnerTextStyle: {
    color: '#FFF'
  },

})
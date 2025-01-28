import { ImageBackground, StyleSheet, Text, View,ScrollView,FlatList, RefreshControl } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from "@/components/CustomButton"
import Forminput from '@/components/Forminput'
import { router } from 'expo-router'
import UserCompo from '@/components/userCompo'
import { useState,useEffect } from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
interface User {
    userid:number,
    firstname: string;
    lastname: string;
    nickname: string;
    
}

export default function showUser() {
    const [refreshing, setRefreshing] = React.useState(false);
    const [loading,setloading] = useState(false);
    const [datauser,setdatauser] = useState<User[]>([]);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
          fecthdata();
    },[]);
    // const [datauser,setdatauser] = useState<User>({userid : 0,firstname:'',lastname:'',nickname:'',});
    useEffect(() => {
        fecthdata(); //call fecthdata
    },[])
    //Create function to callback 
   async function fecthdata(){

        setloading(true);
        const api = 'http://192.168.1.106:3000/getuser';
        await  fetch(api,{
                method:'POST',
            }).then(response => response.json()).then(result => {
                if(result){
                    setdatauser(result);
                    setloading(false);
                    setRefreshing(false);
                }
            }).catch(err => console.error(err));
    }
    
    return (
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing ={refreshing} onRefresh={onRefresh}  progressBackgroundColor={'#C5BAFF'} />}>
    <SafeAreaView style={styles.viewcontain} >
    <Spinner
          visible={loading}
          textContent={'Loading Fecth All User...'}
          textStyle={styles.spinnerTextStyle}
        />
        <Text style={styles.titletext} >ดูข้อมูล User</Text>
        <FlatList 
            scrollEnabled = {false}
            data = {datauser}   
            renderItem={({ item }) => <UserCompo firstname={item.firstname} lastname={item.lastname} nickname={item.nickname} userId={item.userid}  fecthdata={fecthdata} />}
            ItemSeparatorComponent={() => <View style={{height: 15}}/>}
        />
        <CustomButton Onpress={() => router.push('/(auth)/addUser')} title='Add User' textstyle={{
          color:'#FFFFFF',
        }}></CustomButton>
        <CustomButton Onpress={() => router.push('/')} title='Back' style={{
            backgroundColor: '#FFFFF',
            borderWidth:1,
        }}></CustomButton>
        
    </SafeAreaView>
   
    </ScrollView>
    
  )
}

const styles = StyleSheet.create({
    container:{
       
        backgroundColor: '#E8F9FF',
    },
    viewcontain:{
        backgroundColor: '#FFFFFF',
        marginHorizontal: 15,
        marginVertical:50,
        padding:10,
        borderRadius:10
    },
    titletext:{
        fontSize: 32,
        textAlign:'center',
        marginBottom:25,
    },
    spinnerTextStyle: {
        color: '#FFF'
      },
})
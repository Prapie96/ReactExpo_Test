import { ImageBackground, StyleSheet, Text, View,ScrollView,FlatList, RefreshControl } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from "@/components/CustomButton"
import Forminput from '@/components/Forminput'
import { router } from 'expo-router'
import UserCompo from '@/components/userCompo'
import { useState,useEffect } from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import { ThemedText } from '@/components/ThemedText'
interface User {
    userid:number,
    firstname: string;
    lastname: string;
    nickname: string;
    img:string,
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
        const api = 'http://192.168.1.57:3000/getuser';
        await  fetch(api,{
                method:'POST',
            }).then(response => response.json()).then(result => {
                if(result){
                    setdatauser(result);
                    setloading(false);
                    setRefreshing(false);
                   
                }   
            }).catch(err => console.error(err))
    }
  
    return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} progressBackgroundColor={'#FFFFFF'} />}>
    <View style={styles.container} >
    <Spinner
          visible={loading}
          textContent={'Loading Fecth All User...'}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.viewcontain}>
            <ThemedText type="title" darkColor="black" style={styles.titletext}>ดูข้อมูล User</ThemedText>
        </View>
        <FlatList 
            scrollEnabled = {false}
            data = {datauser}   
            renderItem={({ item }) => <UserCompo firstname={item.firstname} lastname={item.lastname} nickname={item.nickname} userid={item.userid} img={item.img} fecthdata={fecthdata} />}
            ItemSeparatorComponent={() => <View style={{height: 15}}/>}
            style={styles.userontainer}
        />
        <View style={styles.buttoncontainer}>
              <CustomButton Onpress={() => router.push('/(auth)/addUser')} title='Add User' textstyle={{
          color:'#FFFFFF',
        }}></CustomButton>
        <CustomButton Onpress={() => router.back()} title='Back' style={{
            backgroundColor: '#FFFFFF',
            borderWidth:1,
        }}></CustomButton>
        </View>
      
        
    </View>
   
    </ScrollView>
    
  )
}

const styles = StyleSheet.create({
    container:{
         backgroundColor: '#F8F8F8',
         gap:10,
        
    },
    viewcontain:{
        backgroundColor: '#FFFFFF',
        borderBottomWidth:4,
        borderColor:'#C4D9FF'
       
    },
    userontainer:{
        marginTop:10,
        paddingHorizontal:20,
        

    },
    buttoncontainer:{
        marginHorizontal:25,
        marginBottom:30
    },
    titletext:{
        marginBottom:25,
        paddingTop:30
    },
    spinnerTextStyle: {
        color: '#FFF'
      },
})
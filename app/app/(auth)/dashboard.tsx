import { View, Text,StyleSheet,ScrollView,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import UserCompo from '@/components/userCompo';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import CardCompo from '@/components/CardCompo';


interface DashboardProps{
  totalStudents: number,
  presentStudents: number,
  lateStudents: number,
  leavStudents:number,
  absentStudents: number,
}
interface User {
  userid:number,
  firstname: string;
  lastname: string;
  nickname: string;
  img:string,
  statususer: number
}
const dashboard = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading,setloading] = useState(false);
  const onRefresh = React.useCallback(() => {
          setRefreshing(true);
            fecthdata();
      },[]);
      const [datauser,setdatauser] = useState<User[]>([]);
  const [userstatus, setStatususer] = useState<DashboardProps>({
      totalStudents: 0,
      presentStudents: 0,
      lateStudents: 0,
      leavStudents:0,
      absentStudents: 0,
  });

  async function fecthstatusdata() {
      setloading(true);
      const api = 'http://192.168.1.57:3000/dashboarddata';
      await fetch(api, {
          method: 'POST',
      })
          .then((response) => response.json())
          .then((result) => {
              if (result) {
                  console.log(result);
                  setStatususer(result);
                  setloading(false);
                  setRefreshing(false);
                
              }
          })
          .catch((err) => console.error(err));
  }

  useEffect(() => {
      // fecthstatusdata();
      // fecthdata();
    }, []);
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
      <SafeAreaView style={styles.MainContainer}>
        <View style={styles.HeadContainer}>
         <View style={{flexDirection:'row',borderWidth:1,padding:10,flex:1}}>
          <View style={styles.containerImg}>
            <Image source={require('@/assets/images/Antony.jpeg')} style={styles.ProfileImg}></Image>
          </View>
          <View>
          <ThemedText type='subtitle'>Antony United School</ThemedText>
          <ThemedText type='subtitle'>Hi, Antony</ThemedText>
          <ThemedText type='subtitle'>Role:Admin</ThemedText>
          </View>
         </View>
        <View style={{flexDirection:'row',borderWidth:1,flex:1,}}>
        <CardCompo title={'All Student'} total={userstatus.totalStudents}></CardCompo>
        <CardCompo title={'All Student'} total={userstatus.totalStudents}></CardCompo>
        </View>

        </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
   MainContainer:{
    flex:1,
   },
   HeadContainer:{
    backgroundColor:'#C5BAFF',
    width:'100%',
    height:'40%',
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
    
   },
   ContentContainer:{

   },
   containerImg:{
    borderWidth:1,
    width:'25%',
    height:'35%'
   },
   ProfileImg:{
    width:'100%',
    height:'100%',
    borderRadius:100
   }
})
export default dashboard
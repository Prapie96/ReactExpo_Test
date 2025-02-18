import { View, Text,StyleSheet,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import UserCompo from '@/components/userCompo';


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
      fecthstatusdata();
      fecthdata();
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
      <View>
          <View style={styles.ContainerHead}>
          <Spinner
          visible={loading}
          textContent={'Loading Fecth All User...'}
          textStyle={styles.spinnerTextStyle}
        />
              <View style={{backgroundColor:'#FFFFFF',padding:20,borderRadius:10,gap:5,marginTop:20}}>
                  <Text>Total</Text>
                  <Text style={styles.fontstyle}>{userstatus.totalStudents}</Text>
                  <Text>Students</Text>
                  
              </View>
              <View style={styles.container4card}>
              <View style={styles.Card}>
                  <Text>Present</Text>
                  <Text style={styles.fontstyle}>{userstatus.presentStudents}</Text>
                  <Text>Students</Text>
              </View>
              <View style={styles.Card}>
                  <Text>Late</Text>
                  <Text style={styles.fontstyle}>{userstatus.lateStudents}</Text>
                  <Text>Students</Text>
              </View>
              <View style={styles.Card}>
                  <Text>Leav</Text>
                  <Text style={styles.fontstyle}>{userstatus.leavStudents}</Text>
                  <Text>Students</Text>
              </View>
              <View style={styles.Card}>
                  <Text>Absent</Text>
                  <Text style={styles.fontstyle}>{userstatus.absentStudents}</Text>
                  <Text>Students</Text>
              </View> 
              </View>
          </View>
           <View style={{backgroundColor:'purple',padding:10}}>
              <Text style={[styles.fontstyle,{color:'white'}]}>Student in Class</Text>
            </View>
          <ScrollView style={styles.ContainerBody}>
           
          {datauser.map((user)=>(
              <View key={user.userid} style={{paddingHorizontal:20}}>
              
                <UserCompo firstname={user.firstname} lastname={user.lastname} nickname={user.nickname} userid={user.userid} img={user.img} />
                
              </View >
            ))}
          </ScrollView >
      </View>
  );
};

const styles = StyleSheet.create({
    ContainerHead:{
        height:'50%',
        justifyContent:'center',
        backgroundColor:'#4759A6',
        
        paddingHorizontal:20,
      
    },
    ContainerBody:{
        backgroundColor:'#F8E1B7',
        height:'50%'
    },
    container4card:{
      flexDirection:'row',
      gap:8,
    
      justifyContent:'space-between'
    },
    Card:{
      backgroundColor:'#FFFFFF',
      padding:20,
      borderRadius:10,
      gap:5,
      marginTop:20,
     
      
    },
    fontstyle:{
      fontSize:18
    },
    spinnerTextStyle: {
        color: '#FFF'
      },
})
export default dashboard
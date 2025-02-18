import { ImageBackground,Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Alert, Linking } from 'react-native'
import React, {useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import Spinner from 'react-native-loading-spinner-overlay'
import AntDesign from '@expo/vector-icons/AntDesign';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import ModalChoose from '@/components/modalChoose';
import { clearAll, getDataRole } from '@/hooks/useAysnceStorage';
import { ThemedText } from '@/components/ThemedText';
interface userimg{
  uri: string;
}
interface seeDetailprops{
  username:string,
  password:string,
  firstname:string,
  lastname:string,
  nickname:string,
  userid:number,
  usertype?:number
}
export default function seeDetail() {
  const [loading,setloading] = useState(false);
  const {user} = useLocalSearchParams();
  const [userdata, setuserdata] = useState<userimg>();
  const [detailuser,setDetailuser] = useState<seeDetailprops>({username:'',password:'',firstname:'',lastname:'',nickname:'',userid:0,usertype:0} );
  const params = user ? JSON.parse(user.toString()) : {};
  const [isModalVisible,SetisModalVisible] = useState(false);
  useEffect(()=>{
    setDetailuser((prevState) => ({
      ...prevState,
      userid:params?.userid ||params[0].userid,
    }));
    fecthdata();
    fecthimg();
    getaccountuserinfo();
    getresultRole();
  },[])
  const getresultRole=async()=>{
    await getDataRole().then(result=>{
      setDetailuser((prevState) => ({
        ...prevState,
        usertype: result
      }));
    }).catch((err)=>{
      console.error(err);
    })
  };
  const fecthdata=async()=>{
   
    const formdata = new FormData();
    formdata.append("userid",params?.userid ||params[0].userid);
    const api = 'http://192.168.1.57:3000/getuserbyid';
    await fetch(api,{
      method:'POST',
      headers:{'Accept': 'application/json','content-Type': 'multipart/form-data',},
      body: formdata
    }).then(response=>response.json()).then(result=>{
      if(result){
        setDetailuser((prevState) => ({
          ...prevState,
          firstname:result[0].firstname,
          lastname:result[0].lastname,
          nickname:result[0].nickname
        }));
      }
    }).catch((err)=>{
      console.error(err);
    })
  }
  const fecthimg =async () =>{
    setloading(true);
    const api = 'http://192.168.1.57:3000/img';
    await fetch(api,{
      method:'POST',
      headers:{'Accept': 'application/json','Content-Type': 'application/json'},
      body: JSON.stringify({userid:params?.userid ||params[0].userid})
    }).then(response => response.json())
      .then(result => {
        if(result){
          // console.log(result);
          setuserdata(result);
        }
      })
      .catch(err => console.error(err))
      .finally(()=> {setloading(false)});
  }
  
    const getaccountuserinfo = async() =>{
      const formdata = new FormData();
      formdata.append("userid",params?.userid ||params[0].userid);
      const api = 'http://192.168.1.57:3000/getaccountuser';
      await fetch(api,{
        method:'POST',
        headers:{'Accept': 'application/json'},
        body: formdata
      }).then(response=>response.json())
        .then(result =>{
          console.log(result);
          setDetailuser((prevState) => ({
            ...prevState,
            username: result.result[0].username,
            password: result.result[0].password
          }))
        })
        .catch(err => console.error(err));    
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

  const sharingImage = async () => {
    console.log("Into sharing");
    if (userdata && userdata.uri) {
      try {
        console.log(`userdata uri: ${userdata.uri}`);
        const fileUri = `${FileSystem.cacheDirectory}shared-image.jpg`; // path cache directory
        const { uri } = await FileSystem.downloadAsync(userdata.uri, fileUri); // dowload image to cache directory
         console.log(`File saved to: ${uri}`);
        await Sharing.shareAsync(uri); // share image
      } catch (error) {
        console.log("Error during sharing: ", error);
      }
    } else {
      console.log("Image uri missing");
    }
    closeModal();
  };

  const saveimage = async() =>{
    console.log("Function saveimage called");
  console.log("Into saveimage()");
  
    // console.log(`userdata uri: ${userdata?.uri}`);
    try{
      const {status} = await MediaLibrary.requestPermissionsAsync();
      console.log(`Permission status: ${status}`);
      console.log('Into try');
      if(status === 'granted'){
        if(userdata && userdata.uri) {
          const fileUri = `${FileSystem.cacheDirectory}saved-image.jpg`; 
          const { uri } = await FileSystem.downloadAsync(userdata.uri, fileUri);
          console.log(`File saved to: ${uri}`);

          const asset = await MediaLibrary.createAssetAsync(uri);
          const album = await MediaLibrary.getAlbumAsync("MonsterApp");
          if(!album){
            await MediaLibrary.createAlbumAsync("MonsterApp",asset,false);
            console.log("create album success");
            alert('Dowload img success');
          }
          else{
            await MediaLibrary.addAssetsToAlbumAsync([asset],album,false);
            alert('Dowload img success');
          }
        }
      }
      else{
        Alert.alert('Permission was denined','If uou want to use Camera, Please Go to Setting to give permission of Camera',[
                        {
                            text: 'ยืนยัน',
                            onPress: () =>  Linking.openSettings(),
                        },
                        {
                            text:'ยกเลิก',
                            onPress: () => console.log('Cancel Pressed'),
                        }
                    ]
                    );
      }   
    }catch(error){
      console.log("Error during saving: ", error);
    }
    closeModal();
  }
  const closeModal = () => {
    SetisModalVisible(false); 
  };
  
  return (
    <View>
        <ImageBackground source={require('@/assets/images/bg-expoproject.png')} style={styles.bgimg}> 
         <SafeAreaView style={styles.container}>
         <Spinner
          visible={loading}
          textContent={'Loading User info...'}
          textStyle={styles.spinnerTextStyle}
        />
          <TouchableOpacity style={styles.profile} activeOpacity={0.8} onPress={()=>{SetisModalVisible(true)}}>
            {userdata && <Image style={styles.bgimg} 
            source={userdata?.uri ? { uri: userdata.uri} : require('@/assets/images/Frame1.jpg')} >
            </Image>}
          </TouchableOpacity>
          <ModalChoose 
          visible={isModalVisible} 
          texttitle1={['Share the Picture','Save Picture to Library']} 
          Onpress1={sharingImage} 
          Onpress2={saveimage} 
          closeModal={closeModal}>
          </ModalChoose>
          <View style={styles.fontContainer}>
            {detailuser.usertype ===1 &&  <ThemedText type='subtitle' darkColor='black'>UserId:{detailuser.userid}</ThemedText>}
            <ThemedText type='subtitle' darkColor='black'>Name: {detailuser.firstname}</ThemedText>
            <ThemedText type='subtitle' darkColor='black'>LastName: {detailuser.lastname}</ThemedText>
            <ThemedText type='subtitle' darkColor='black'>Nickname: {detailuser.nickname}</ThemedText>
          </View>
          <View style={styles.buttoncontainer}>
          <TouchableOpacity activeOpacity={0.7} style={[styles.buttonStlye,{backgroundColor:'#C4D9FF'}]} onPress={()=>router.push({pathname:'/(auth)/editUser',params:{user:JSON.stringify({...detailuser, uri: userdata?.uri})}})}>
          <ThemedText darkColor='black'> Edit </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={[styles.buttonStlye,{backgroundColor:'#C5BAFF'}]} onPress={deleteAlert}>
            <ThemedText darkColor='black'> Delete </ThemedText>
          </TouchableOpacity>
           <TouchableOpacity activeOpacity={0.7} style={[styles.buttonStlye,{backgroundColor:'#C5BAFF'}]} onPress={()=>{clearAll(),router.push('/(auth)/loginUser')}}>
              <ThemedText  darkColor='black'> Log-out </ThemedText>
          </TouchableOpacity>
          </View>
          <TouchableOpacity activeOpacity={0.7} onPress={()=>router.push('/(auth)/showUser')} style={{alignItems:'center',marginTop:'5%'}}>
                    <AntDesign name="close" size={40} color="black" />
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
    gap:10,
    marginTop:80,
  },
  profile:{
    borderWidth:1,
    width:'80%',
    height:'50%',
    backgroundColor:'#EAEAEA',
    alignSelf: 'center',
  },
  fontContainer:{
    paddingHorizontal:'10%',
    gap:10,
    marginTop:'5%'
  },

  font:{
    fontSize:20,
    
  },
  buttoncontainer:{
    // borderWidth:1,
    flexDirection:'row',
    justifyContent:'center',
    gap:20,
    marginTop:'5%'

  },
  buttonStlye:{
    backgroundColor: '#FFFFFF',
    justifyContent:'center',
    borderRadius: 5,
    textAlign:'center',
    alignItems:'center',
    padding:20,
    
  },spinnerTextStyle: {
    color: '#FFF'
  },
  viewModal:{
    backgroundColor:'#C5BAFF',
    paddingVertical:'8%',
    marginHorizontal:'2%',
    gap:20,
    borderRadius:20,
    marginTop:'155%',
    elevation:5,
    
    
},

buttonstyle:{
    alignItems:'center',
    flexDirection:'row',
    gap:'20%',
    paddingHorizontal: '10%',
}

})
import { StyleSheet, Text, View, ImageBackground, Image,Linking, Alert, TouchableOpacity} from 'react-native';
import React, { useState,useEffect } from 'react';
import CustomButton from "@/components/CustomButton";
import Forminput from '@/components/Forminput';
import { router,useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import ModalChoose from '@/components/modalChoose';
import AntDesign from '@expo/vector-icons/AntDesign';
interface userdata{
    firstname: string,
    lastname: string,
    nickname: string,
    userid: string,
    uri: string,
    username: string,
    password: string,
}
export default function editUser() {
    const [isModalVisible,SetisModalVisible] = useState(false);
    const [loading,setloading] = useState(false);
    const  {user} = useLocalSearchParams();
    const params = JSON.parse(user.toString())
    const [input,setinput] = useState<userdata>({
        firstname: '',
        lastname: '',
        nickname: '',
        userid: '',
        uri: '',
        username: '',
        password: '',
    });
    
useEffect(()=>{ 
    setinput((prevState) => ({
        ...prevState, 
        firstname: params.firstname,
        lastname: params.lastname,
        nickname: params.nickname,
        userid:params.userid,
        uri: params.uri,
        username: params.username,
        password: params.password,
    }))
},[]);
const [image,setImage] = useState<ImagePicker.ImagePickerSuccessResult>();
// console.log(`Got uri from seeDetailed : ${params.uri}`);
    
    const handleChange = (fieldinput:string) =>(text:string)=>{
        setinput((prevState) => ({
            ...prevState,
            [fieldinput]: text,
          }));
    }
    const editpress = async() =>{
        if(!input.firstname|| !input.lastname || !input.nickname){
            alert('กรุณากรอกข้อมูลให้ครบทุกช่องด้วยครับ');
        }
        else{
            const formdata = new FormData();
            const fileName = image?.assets[0].uri.split('/').pop();
            formdata.append("firstname",input.firstname);
            formdata.append("lastname",input.lastname);
            formdata.append("nickname",input.nickname);
            formdata.append("userid", input.userid);
            formdata.append("username", input.username);
            formdata.append("password", input.password);
            if (image) {
                formdata.append("img",{
                    uri:image.assets[0].uri,
                    name: fileName,
                    type: image.assets[0].mimeType,
                } as any);
            } 
            else {
                formdata.append("img", input.uri);
                console.log(`Show input.uri: ${input.uri}`)
            }
            setloading(true);
            const api = `http://192.168.1.57:3000/edit`
            await fetch(api,{
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "multipart/form-data",
                },
                body: formdata
                }).then(response => response.json()).then(result => {
                if(result){
                    console.log('Success'),
                    setinput(result);
                    router.push({pathname:'/(auth)/seeDetail',params:{user:JSON.stringify(input)}})
                }})
                .catch(err => console.error(err))
                .finally(() => { setloading(false); });
        }
        
        
    }
    const openCamera = async()=>{
        const  granted  = await ImagePicker.requestCameraPermissionsAsync();
        console.log(`result permission : ${granted.status}`);
        const a = await ImagePicker.getCameraPermissionsAsync();
        console.log(`Result a : ${a.canAskAgain}`);
        if(granted.granted){
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes:['images','videos'],
                aspect : [4,3],
                quality:1,
            });
            if(!result.canceled){
                setinput((prevState) => ({
                    ...prevState,
                   uri: result.assets[0].uri,
                  }));
                  setImage(result);
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
        closeModal();
    }

    const pickImage = async() =>{
        const permissionlibrary = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if(permissionlibrary.granted){
            console.log(`result permision can ask again : ${permissionlibrary.canAskAgain}`)
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images','videos'],
            allowsEditing: false,
            aspect : [4,3],
            quality: 1
        });
        console.log(result);
        if(!result.canceled){
            setinput((prevState) => ({
                ...prevState,
               uri: result.assets[0].uri,
              }));
            setImage(result);
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
        
        closeModal();
        }
        const closeModal = () => {
            SetisModalVisible(false); 
          };

  return (
    
    <View>
        <ImageBackground source={require('@/assets/images/Frame1.jpg')} style={styles.container}>
        <View style={styles.viewcontain}>
        <Spinner
          visible={loading}
          textContent={'Loading Fecth All User...'}
          textStyle={{ color: '#FFF'}}
        />
        <View>
        <TouchableOpacity onPress={router.back} style={{position:'absolute',left:'-5%'}}>
            <AntDesign name="left" size={34} color="black" />
        </TouchableOpacity>
        <Text style={styles.titletext} >แก้ไขข้อมูล User{input.userid}</Text>
        </View>
       
        <View style={styles.containerimgpick} onTouchStart={()=>SetisModalVisible(true)}>
            {input && <Image style={styles.image} source={{uri : input.uri}}/>}
        </View>
        <ModalChoose 
            visible={isModalVisible} 
            texttitle1={['Take a Picture','Choose a Picture from Library']} 
            Onpress1={openCamera} 
            Onpress2={pickImage} 
            closeModal={closeModal}>
        </ModalChoose>
        <View style={styles.containerFormInput}>
        <Forminput label='Firstname' placeholder='firstname...' values={input.firstname} handleonchange={handleChange('firstname')} showtoggle={false}></Forminput>
        <Forminput label='Lasttname' placeholder='lastname...' values={input.lastname} handleonchange={handleChange('lastname')} showtoggle={false}></Forminput>
        <Forminput label='Nickname' placeholder='nickname...' values={input.nickname} handleonchange={handleChange('nickname')} showtoggle={false}></Forminput>
        <Forminput label='Username' placeholder='username...' values={input.username} handleonchange={handleChange('username')} showtoggle={false}></Forminput>
        <Forminput label='Password' placeholder='password...' values={input.password} handleonchange={handleChange('password')} showtoggle={true}></Forminput>
        </View>
        
        <CustomButton Onpress={editpress} title='Edit User'></CustomButton>
        <CustomButton Onpress={() => router.push('/(auth)/showUser')} title='Back' style={{
            backgroundColor: '#FFFFFF',
            borderWidth:1,
        }}></CustomButton>
        </View>
        </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#E8F9FF',
        
    },
    viewcontain:{
        backgroundColor: '#FFFFFF',
        // alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 10,
        marginTop: '20%',
        width: '100%',
        height: '100%',
        paddingTop:30,
        paddingLeft:30,
        paddingRight:30,
        flexDirection: 'column',
        
    },
    titletext:{
        fontSize: 24,
        textAlign:'center',
    },
    containerimgpick:{
        borderWidth:1,
        width: '50%',
        height:'20%',
        alignItems:'center',
        marginTop:20,
        marginHorizontal: '25%',
        backgroundColor:'#EAEAEA',
    },
    image: {
        width:'100%',
        height:'100%'
      },
      containerFormInput:{
          gap:10,
          marginTop:10
      }
})
import { ImageBackground, StyleSheet, Text, View,KeyboardAvoidingView, Alert, TouchableOpacity, Image, ImageProps, Modal } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from "@/components/CustomButton"
import Forminput from '@/components/Forminput'
import { router } from 'expo-router'
import { useState,useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Spinner from 'react-native-loading-spinner-overlay'
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function AddUser() {
    const [input,setinput] = useState({
        firstname:'',
        lastname:'',
        nickname:'',
        img:'',
    });
    const [loading,setloading] = useState(false);
     const [isModalVisible,SetisModalVisible] = useState(false);
    const [image,setImage] = useState<ImagePicker.ImagePickerSuccessResult >();
    const handleChange = (fieldinput:string) =>(text:string)=>{
        setinput((prevState) => ({
            ...prevState,
            [fieldinput]: text,
          }));
    }

    const handleSubmit=async () =>{
         console.log(image);  
        if(!input.firstname || !input.lastname || !input.nickname){
            alert('กรุณากรอกข้อมูลให้ครบทุกช่องด้วยครับ');
        }
        else{
            const formdata = new FormData();
            const fileName = image?.assets[0].uri.split('/').pop();
            formdata.append("firstname",input.firstname);
            formdata.append("lastname",input.lastname);
            formdata.append("nickname",input.nickname);
            formdata.append("img",{
                uri:image?.assets[0].uri,
                name: fileName,
                type: image?.assets[0].mimeType,
            }as any)
            console.log("Into else to fect");
            console.log(formdata);
            setloading(true);
            const api = 'http://192.168.1.57:3000/regisuser';
            await fetch(api,{
                method:'POST',
                headers: {
                    'Accept': 'application/json',
                    // 'Content-Type': 'application/json'
                      "Content-Type": "multipart/form-data",
                },
                body: formdata
            }).then(respond => respond.json()).then(result => {
                if(result){
                    alertShow();
                    return result;
                }
                }).catch(err => console.error(err)).finally(()=>{setloading(false)});
            
                setinput({
                firstname:'',
                lastname:'',
                nickname:'',
                img:'',
            });
        }
    }

    const alertShow = ()=>Alert. alert('Success to  Add New User','คุณต้องการไปหน้า Show All Userเลยหรือไม่',[
        {
            text: 'ยืนยัน',
            onPress: () => {
                router.push('/(auth)/showUser');
            }
        },
        {
            text:'ยกเลิก',
            onPress: () => console.log('Stay at to addUserPage'),
        }
    ])
   
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
                      img: result.assets[0].uri,
                     }));
                     setImage(result);
               }
           }
           SetisModalVisible(false);
        }

    const pickImage = async() =>{
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: false,
        aspect : [4,3],
        quality: 1
    });
    console.log(result);
    if(!result.canceled){
        setinput((prevState) => ({
            ...prevState,
           img: result.assets[0].uri,
          }));
         setImage(result);
    }
    SetisModalVisible(false);
    }
   
    return (
        // {image && <Image source={{uri: image}}style={styles.image}/>}
    <KeyboardAvoidingView>
    <ImageBackground source={require('@/assets/images/Frame1.jpg')}style={styles.bgimg}>  
    <SafeAreaView style={styles.viewcontain} >
    <Spinner
          visible={loading}
          textContent={'Loading Fecth All User...'}
          textStyle={{ color: '#FFF'}}
        />
        <Text style={styles.titletext} >กรอกข้อมูล User</Text>
        <View style={styles.containerimgpick} onTouchStart={()=>SetisModalVisible(true)}>
            {input.img && <Image style={styles.image} source={{uri : input.img}}/>}
        </View>
        <Modal visible = {isModalVisible}  transparent ={true} animationType='slide' >
            <View style={styles.viewModal}>
                <TouchableOpacity onPress={openCamera}style={[styles.buttonstyle,{borderBottomWidth:0.5,paddingBottom:10}]}>
                <Fontisto name="camera" size={34} color="black" />
                    <Text style={{fontSize:16}}>Talke a Picture</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={pickImage}style={styles.buttonstyle}>
                <Ionicons name="images" size={34} color="black" />
                    <Text style={{fontSize:16}}>Choose a Picture from Library</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>SetisModalVisible(false)} style={{position:'absolute',top:'10%', right:'5%'}}>
                    <AntDesign name="close" size={34} color="black" />
                </TouchableOpacity>
            </View>
           
        </Modal>
        <Forminput label='Firstname' placeholder='firstname...'values ={input.firstname } handleonchange={handleChange('firstname')}></Forminput>
        <Forminput label='Lasttname' placeholder='lastname...'values ={input.lastname } handleonchange={handleChange('lastname')}></Forminput>
        <Forminput label='Nickname' placeholder='nickname...'values ={input.nickname } handleonchange={handleChange('nickname')}></Forminput>
        <CustomButton Onpress={handleSubmit} title='Add User' textstyle={{
          color:'#FFFFFF',
          
        }}
        style={{
            backgroundColor: '#C5BAFF',
            
    }}  >
        </CustomButton>
        <CustomButton Onpress={() => {router.back()}} title='Back'
            
        textstyle={{
            color:'#FFFFFF',
          }} >
        </CustomButton>
        
        
    </SafeAreaView>
    </ImageBackground>
    </KeyboardAvoidingView>
    
  )
}

const styles = StyleSheet.create({
   
    viewcontain:{
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: 100,
        width: '100%',
        height: '100%',
        paddingTop:5,
        paddingLeft:30,
        paddingRight:30,
        gap: 2,
        
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
    titletext:{
        fontSize: 32,
        textAlign:'center',
        
    },
    bgimg:{
        width: '100%',
        height:'100%',
       
    },
    image: {
        width:'100%',
        height:'100%'
        
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
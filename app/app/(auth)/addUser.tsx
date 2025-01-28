import { ImageBackground, StyleSheet, Text, View,KeyboardAvoidingView, Alert, TouchableOpacity, Image, ImageProps } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from "@/components/CustomButton"
import Forminput from '@/components/Forminput'
import { router } from 'expo-router'
import { useState,useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Spinner from 'react-native-loading-spinner-overlay'

export default function AddUser() {
    const [input,setinput] = useState({
        firstname:'',
        lastname:'',
        nickname:'',
        img:'',
    });
    const [loading,setloading] = useState(false);
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
   
   
    const pickImage = async() =>{
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
           img: result.assets[0].uri,
          }));
         setImage(result);
    }
   
    }
   
    return (
        // {image && <Image source={{uri: image}}style={styles.image}/>}
    <KeyboardAvoidingView style={styles.container}>
    <ImageBackground source={require('@/assets/images/Frame1.jpg')}style={styles.bgimg}>  
    <SafeAreaView style={styles.viewcontain} >
    <Spinner
          visible={loading}
          textContent={'Loading Fecth All User...'}
          textStyle={{ color: '#FFF'}}
        />
        <Text style={styles.titletext} >กรอกข้อมูล User</Text>
        <View style={styles.containerimgpick} onTouchStart={pickImage}>
            {input.img && <Image style={styles.image} source={{uri : input.img}}/>}
        </View>
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
        <CustomButton Onpress={() => {router.push('/')}} title='Back'
            
        textstyle={{
            color:'#FFFFFF',
          }} >
        </CustomButton>
        {/* <CustomButton Onpress={pickImage} title='Picture'></CustomButton> */}
        
        
    </SafeAreaView>
    </ImageBackground>
    </KeyboardAvoidingView>
    
  )
}

const styles = StyleSheet.create({
    container:{
        
        
    },
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
})
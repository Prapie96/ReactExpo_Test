import { ImageBackground, StyleSheet, Text, View,KeyboardAvoidingView, Alert, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from "@/components/CustomButton"
import Forminput from '@/components/Forminput'
import { router } from 'expo-router'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
export default function AddUser() {
    const [input,setinput] = useState({
        firstname:'',
        lastname:'',
        nickname:'',
        
    });
    const [image,setImage] = useState<string | null>(null);
    // const setfileimg = (assets: ImagePicker.ImagePickerAsset[]) => {
    //     if (assets.length > 0) {
    //         setinput((prevState) => ({
    //             ...prevState,
    //             img: assets[0].uri,
    //         }));
    //     }
    //     else{
    //         console.log('Where img')
    //     }
    // }
    const handleChange = (fieldinput:string) =>(text:string)=>{
        setinput((prevState) => ({
            ...prevState,
            [fieldinput]: text,
          }));
    }

    const handleSubmit=async () =>{
        console.log("ค่าที่กรอกในฟอร์ม: ", input);  
        if(!input.firstname || !input.lastname || !input.nickname){
            alert('กรุณากรอกข้อมูลให้ครบทุกช่องด้วยครับ');
        }
        else{
            console.log("Into else to fect")
            const api = 'http://192.168.1.106:3000/regisuser';
            await fetch(api,{
                method:'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(input)
            }).then(respond => respond.json()).then(result => {
                if(result){
                    alertShow();
                    return result;
                }
                }).catch(err => console.error(err));
            setinput({
                firstname:'',
                lastname:'',
                nickname:'',
                
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
        setImage(result.assets[0].uri)
        // setfileimg(result.assets);
    }
   
    }
   
    return (
        // {image && <Image source={{uri: image}}style={styles.image}/>}
    <KeyboardAvoidingView style={styles.container}>
    <ImageBackground source={require('@/assets/images/Frame1.jpg')}style={styles.bgimg}>  
    <SafeAreaView style={styles.viewcontain} >
        <Text style={styles.titletext} >กรอกข้อมูล User</Text>
        <View style={styles.containerimgpick} onTouchStart={pickImage}>
            {image && <Image style={styles.image} source={{uri : image}}/>}
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
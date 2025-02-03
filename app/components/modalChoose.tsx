import { View, Text, Modal, TouchableOpacity,StyleSheet } from 'react-native'
import React, { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
interface modalchooseprops{
visible : boolean;
texttitle1: string[];
openCamera?: () => void; //Event Press
pickImage?:() => void;
closeModal?:()=> void;
}
const ModalChoose = ({visible,texttitle1,openCamera,pickImage,closeModal}:modalchooseprops) => {
    
    return (
    <Modal visible = {visible}  transparent ={true} animationType='slide' >
            <View style={styles.viewModal}>
                <TouchableOpacity onPress={openCamera}style={[styles.buttonstyle,{borderBottomWidth:0.5,paddingBottom:10}]} activeOpacity={0.5}>
                <Fontisto name="camera" size={34} color="black" />
                    <Text style={{fontSize:16}}>{texttitle1[0]}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={pickImage}style={styles.buttonstyle } activeOpacity={0.5} >
                <Ionicons name="images" size={34} color="black" />
                    <Text style={{fontSize:16}}>{texttitle1[1]}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeModal} style={{position:'absolute',top:'10%', right:'5%'}} >
                    <AntDesign name="close" size={34} color="black" />
                </TouchableOpacity>
            </View>
           
        </Modal>
  )
}
const styles = StyleSheet.create({
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
export default ModalChoose
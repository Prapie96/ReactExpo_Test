import { View, Text } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value: object) => {
        try {
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem('UID', jsonValue);
          console.log('dd',jsonValue);
        } catch (e) {
          // saving error
        console.error(e);
        throw new Error();
        }
};

export const  getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('UID');
        console.log('ss',jsonValue);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
        
      } catch (e) {
        // error reading value
        console.error(e);
        throw new Error();
      }
};
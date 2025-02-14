import { View, Text } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value: object) => {
        try {
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem('UID', jsonValue);
          console.log('storeData currentUser',jsonValue);
        } catch (e) {
          // saving error
        console.error(e);
        throw new Error();
        }
};

export const  getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('UID');
        console.log('fecthData Currentuser',jsonValue);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
        
      } catch (e) {
        // error reading value
        console.error(e);
        throw new Error();
      }
};
export const storeRole = async (value: number) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('Role', jsonValue);
    console.log('storeRole currentUser',jsonValue);
  } catch (e) {
    // saving error
  console.error(e);
  throw new Error();
  }
};
export const  getDataRole = async () => {
  try {
      const jsonValue = await AsyncStorage.getItem('Role');
      console.log('fecthRole Currentuser',jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
      
    } catch (e) {
      // error reading value
      console.error(e);
      throw new Error();
    }
};
export const clearAll = async () => {
  try {
    await AsyncStorage.clear()
  } catch(e) {
    // clear error
    console.error(e);
    throw new Error();
  }

  console.log('Done.')
}
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { getData, getDataRole } from '@/hooks/useAysnceStorage';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // useEffect(() => {
  //   if (loaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded]);

  // if (!loaded) {
  //   return null;
  // }
  useEffect(()=>{
    getusercurrent();
    SplashScreen.hideAsync();
    
  },[]);
  const getusercurrent = async()=>{
    const resultgetData = await getData().then(result=>{return result});
    // console.log('Current Data USer:',resultgetData);
    const resultgetRole = await getDataRole().then(result=>{ return result});
    // console.log('Current Role User:',resultgetRole);
    if(resultgetData){
      if(resultgetRole ===1){
        router.push({pathname:'/welcomePage',params:{user:JSON.stringify(resultgetData)}});
      }
      else{
        router.push({pathname:'/(auth)/seeDetail',params:{user:JSON.stringify(resultgetData)}});
      }
    }
    else{
      router.push('/');
      console.log('No Current User Login');
    }
  }
  return (
    <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
      <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="welcomePage" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(login)" options={{ headerShown: false }} />
        <Stack.Screen name="(user)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="dark" /> 
    </ThemeProvider>
  );
}
// This file use o navigate in folder all app 
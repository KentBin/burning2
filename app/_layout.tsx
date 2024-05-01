import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { Stack, useRouter, useSegments,  useRootNavigationState } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
//import LottieSplashScreen from 'react-native-lottie-splash-screen'

import auth from '@react-native-firebase/auth';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const router = useRouter();
  const segments = useSegments();
  const navigationState = useRootNavigationState();

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null)
  
/*   useEffect(() => {
    LottieSplashScreen.hide(); // here
  }, []); */
  
   const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

   useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);  

  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (!navigationState?.key) return;

    const inAuthGroup = segments[0] === "(auth)";

    // This structure may differ from other implementations. 
    if (user && !inAuthGroup) {
      router.replace("/(tabs)/home");
      return;
    } else if(!user){
      router.replace("/");
    }
}, [user]);

  return  (<Stack>
  <Stack.Screen name="index" options={{ headerShown: false }} />
  <Stack.Screen name="OTP" options={{ headerShown: false }} />
  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  {/* <Stack.Screen name="verification/[phone]" options={{ title: 'Xác Nhận Số Điện Thoại',
    headerShown: true, headerBackTitle: "Nhập Lại SĐT" }} /> */}
</Stack>);
}

const RootLayoutNav =() =>{

  return (
      <InitialLayout/>
  );
}

export default RootLayoutNav;
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { Stack, useRouter, useSegments,  useRootNavigationState } from 'expo-router';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import auth from '@react-native-firebase/auth';

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};  
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

  useEffect(() => {
    if (!navigationState?.key) return;

    const inAuthGroup = segments[0] === "(tabs)";

    // This structure may differ from other implementations. 
    if (user && segments.length === 0) {
      router.push("/(tabs)/setting");
      return;
    } else {
      router.replace("/");
    }
}, [user]);

  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

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
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <InitialLayout/>
      </ClerkProvider>
  );
}

export default RootLayoutNav;
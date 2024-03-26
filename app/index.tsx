import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {GestureHandlerRootView, TouchableOpacity} from 'react-native-gesture-handler'
import { Link } from 'expo-router';
import { COLORS, SIZES, FONTS } from "../constants";
import bigLogo from '@/assets/logo/logo-bg.png';
const welcome_logo = Image.resolveAssetSource(bigLogo).uri

const  WelcomeScreen = () =>{

    return (
        <View style={styles.container}>
          <Image source={{ uri: welcome_logo }} style={styles.welcome} />
          <Text style={{...FONTS.body3, color: COLORS.primary}}>
            Chào mừng đến với ứng dụng dành cho khách hàng trung thành của&nbsp;
            <Text style={{...FONTS.body2, color: COLORS.secondary}}>
            Burning Night Billiards Club
            </Text>  </Text>
            <GestureHandlerRootView>
          <Link href={"/OTP"} asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Đăng Nhập</Text>
            </TouchableOpacity>
          </Link>
          </GestureHandlerRootView>
        </View>
      );
    };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: COLORS.white,
    },
    welcome: {
      width: '100%',
      height: 300,
      borderRadius: 60,
      marginBottom: 80,
    },
    headline: {
      marginVertical: 20,
    },
    link: {
      color: COLORS.primary,
    },
    button: {
      marginTop: 80,
      width: '100%',
      alignItems: 'center',
    },
    buttonText: {
      color: COLORS.primary,
      fontSize: 22,
      fontWeight: '500',
    },
  });
  
  export default WelcomeScreen;
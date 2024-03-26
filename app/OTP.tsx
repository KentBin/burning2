import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES, FONTS, image } from "../constants";

import SignUpButton from "../components/SignUpButton";
import MaskInput from 'react-native-mask-input';
import { useRouter } from 'expo-router';

import vnIcon from '@/assets/logo/logo-vietnam.png';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import LottieView from "lottie-react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
const CELL_COUNT = 6;
const vn = Image.resolveAssetSource(vnIcon).uri
const VIE_PHONE = [
  '+',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

const Login = ({ }) => {
  const [isVerifying, setIsVerifying] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('+84 ');
  const [confirmationResult, setConfirmationResult] = useState<any | null>(null);
  const [errorMessage, setMessage] = useState('');
  const [code, setCode] = useState('');

  const [verificationWrong, setVerificationWrong] = useState(false);

  const router = useRouter();

  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });
  useEffect(() => {
    if (code.length === 6) {
        verifyOTP();
    }
  }, [code]);
  const sendOTP = async () => {
    const phoneRegex = /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9 ]{10})$/;
    setIsVerifying(true);
    try {
      if (!phoneRegex.test(phoneNumber)) {
        setMessage('So dien toai ko op le')
        return
      }

      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirmationResult(confirmation);
      setIsVerifying(false);

    } catch (err) {
      alert("Loi gui ma")
    }
  }

  const verifyOTP = async () => {
    try {
      const userCredential = await confirmationResult.confirm(code);
      const user = userCredential.user;
      console.log(user)
      router.push(`/(tabs)/home`);

   /*    const userDocument = await firestore().collection('customers').doc(user.phoneNumber).get();
      if (userDocument.exists) {
        router.push(`/(tabs)/OrderList`);
      }
      else {
        alert('sign up todo')
      } */
    }
    catch (error) {
      alert(error);
      console.log(error);
      setVerificationWrong(true);
    }
  }

  const trySignIn = async () => {
    router.push(`/verification/${phoneNumber}?signin=true`);

  }

  const resendCode = async () => {

  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: COLORS.background }}>
        {isVerifying && (
      <View style={[StyleSheet.absoluteFill, styles.loading]} >
        <LottieView  imageAssetsFolder={'lottie/orangeJuice'} source={require('../android/app/src/main/assets/lottie/orangeJuice/Animation-1710265288711.json')}/>
        <Text style={{ fontSize: 18, padding: 10 }}>Sending code...</Text>
      </View>
    )}
      <ScrollView
        style={{ flex: 1, backgroundColor: COLORS.primary, padding: 16 }}>
        <Image
          source={image.logo}
          resizeMode="contain"
          style={{
            width: 128,
            height: 128,
            marginLeft: 0,
            marginBottom: 30
          }}
        />
        {!confirmationResult ? (<><Text style={{ ...FONTS.body3, color: COLORS.white }}>Nhập Số Điện Thoại Đã Đăng Ký Tích Điểm</Text>
          <View style={{ marginVertical: 22 }}>
            <View style={styles.container}>
              <View
                style={[styles.inputContainer, { borderColor: COLORS.gray }]}>
                <View style={styles.flagContainer}>
                  <Image style={{
                    width: 30,
                    height: 30,
                    marginLeft: 4,
                    marginRight: 4,
                  }} source={{ uri: vn }} />
                </View>
                <MaskInput
                  style={[{ ...FONTS.body2 }, styles.input]}
                  value={phoneNumber}
                  keyboardType="number-pad"
                  autoFocus
                  placeholder="Số Điện Thoại (bỏ 0 đầu tiên)"
                  autoComplete="sms-otp"
                  onChangeText={(masked, unmasked) => {
                    setPhoneNumber(masked);
                  }}
                  mask={VIE_PHONE}
                />

              </View>
            </View>
            <Text style={{ ...FONTS.body4, color: COLORS.red }}>{errorMessage}</Text>
            <SignUpButton
              title="NHẬN MÃ OTP"
              style={{
                width: SIZES.width - 32,
                marginVertical: 8,
              }}
              onPress={sendOTP}
            />

          </View></>) : (<><Text style={{ color: COLORS.white }}> Nhập Mã OTP </Text>

            <CodeField
              ref={ref}
              {...props}
              // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
              value={code}
              onChangeText={setCode}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              autoFocus
              renderCell={({ index, symbol, isFocused }) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
            <View style={{ marginVertical: 22 }}>
            
              <TouchableOpacity style={styles.button} onPress={resendCode}>
                <Text style={styles.buttonText}>Gửi Lại Mã OTP</Text>
              </TouchableOpacity> 
            </View></>)}
      </ScrollView>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 2,
  },
  flagContainer: {
    flexDirection: "row",
    marginHorizontal: 5,
  },
  cover: {
    width: SIZES.width,
    position: "absolute",
    bottom: 0,
  },
  container: {
    width: '100%',
    marginLeft: -5,
    backgroundColor: COLORS.white
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding2,
    borderRadius: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    marginVertical: 16,
    flexDirection: 'row',
  },
  input: {
    color: COLORS.primary,
    flex: 1,
    fontFamily: 'regular',
    paddingTop: 0,

  },
  loading: {
    zIndex: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.gray,
    fontSize: 18,
  },
  root: { padding: 20, minHeight: 300 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});

export default Login;
import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, SIZES, FONTS, image } from "../constants";

import SignUpButton from "../components/ui/SignUpButton";
import MaskInput from 'react-native-mask-input';
import { useRouter } from 'expo-router';

import vnIcon from '@/assets/logo/logo-vietnam.png';

import auth, { firebase } from '@react-native-firebase/auth';
import db from '@react-native-firebase/database';
import { useAuthStore } from "@/store/user";

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

const Login = () => {
  const [isVerifying, setIsVerifying] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('+84 ');
  const [confirmationResult, setConfirmationResult] = useState<any | null>(null);
  const [errorMessage, setMessage] = useState('');
  const [code, setCode] = useState('');

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
    setIsVerifying(true);
    const phoneRegex = /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9 ]{10})$/;
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

  const resendCode = () => { }

  const verifyOTP = async () => {
    try {
      const userCredential = await confirmationResult.confirm(code);
      const user = userCredential.user;
      console.log(user)

      const userDocumentREF = await db().app.database('https://brning9-default-rtdb.asia-southeast1.firebasedatabase.app/').ref('/clientApp');
      const newp = phoneNumber.replace("+84", "0").replace(/\s/g, "")
      //console.log(newp)
      const existed = await userDocumentREF.child(newp).once('value')
      //console.log(existed.child('Name').val())
      if (existed.exists()) {

useAuthStore.setState({
  user: {
    uid: user?.uid,
    name: existed.child('Name').val(),
    point:
      existed
        .child('balance')
        .child('points')
        .val() || 0,
    contactNumber: user?.phoneNumber,
  },
});

      }
      /* 
      else {
        userDocumentREF.set({phoneNumber: phoneNumber})
        
      } */
      //router.replace(`/(tabs)/home`);
    }
    catch (error) {
      console.log(error);
    }
  }

const loginDemo = async () => {
  const snapshot = await db()
    .app
    .database('https://brning9-default-rtdb.asia-southeast1.firebasedatabase.app/')
    .ref('/clientApp/0901234567')
    .once('value');

  useAuthStore.setState({
    user: {
      uid: 'demo-user-1',
      name: snapshot.child('Name').val(),
      point:
        snapshot
          .child('balance')
          .child('points')
          .val() || 0,
      contactNumber: '0901234567',
    },
  });

  router.replace('/(tabs)/home');
};

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: COLORS.background }}>
      {isVerifying && (
        <View style={[StyleSheet.absoluteFill, styles.loading]} >
          <LottieView autoPlay loop style={{
            width: 400,
            height: 400,
          }} imageAssetsFolder={'lottie/border'} source={require('../android/app/src/main/assets/lottie/border/border92749127492.json')} />
          
        </View>
        
      )}
      <ScrollView
        style={{ flex: 1, backgroundColor: COLORS.white, padding: 16 }}>
        <Image
          source={image.logo}
          resizeMode="contain"
          style={{
            width: 168,
            height: 168,
            marginLeft: 0,
            marginBottom: 30
          }}
        />
        {!confirmationResult ? (<><Text style={{ ...FONTS.body3, color: COLORS.secondary }}>Nhập Số Điện Thoại Đã Đăng Ký Tích Điểm</Text>
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

            <SignUpButton
              title="DEMO MODE"
              style={{
                width: SIZES.width - 32,
                marginVertical: 8,
              }}
              onPress={loginDemo}
            />

          </View></>) : (<><Text style={{ color: COLORS.secondary }}> Nhập Mã OTP </Text>

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
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.primary,
    fontSize: 18,
  },
  root: { padding: 20, minHeight: 300 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 50,
    height: 50,
    lineHeight: 48,
    fontSize: 28,
    borderWidth: 3,
    borderColor: COLORS.primary,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: COLORS.secondary,
  },
});

export default Login;
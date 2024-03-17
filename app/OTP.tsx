import React, { useState } from "react";
import { View, Text, Image, Alert, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES, FONTS, image } from "../constants";

import SignUpButton from "../components/SignUpButton";
import MaskInput from 'react-native-mask-input';
import { useRouter } from 'expo-router';
import { useSignIn, useSignUp } from '@clerk/clerk-expo';

import vnIcon from '@/assets/logo/logo-vietnam.png';

import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

import VerifyPhone from "./phoneAuth/PhoneVerification";
import ModalPopup from "./modals/SignInModal"
const vn = Image.resolveAssetSource(vnIcon).uri
const VIE_PHONE = [
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
  const [confirmationResult, setConfirmationResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('+84');


  const [verificationWrong, setVerificationWrong] = useState(false);


  const { signIn } = useSignIn();
  const router = useRouter();

  const sendOTP = async () => {

    setLoading(true);
    console.log('sending to' + phoneNumber)
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      console.log(confirmation)
      //setConfirmationResult(result);
      //setIsVerifying(true);
    } catch (err) {
      console.log(err);

      setLoading(false);

    }
  }

  const verifyOTP = async (otp: any) => {
    if (confirmationResult) {
      try {
        const userCredential = await confirmationResult.confirm(otp);
        setLoading(true);
      } catch (error) {
        setVerificationWrong(true);
      }
    } else {
      Alert.alert("Sai Mã OTP");
    }
  }

  const trySignIn = async () => {
    const { supportedFirstFactors } = await signIn!.create({
      identifier: phoneNumber,
    });

    const firstPhoneFactor: any = supportedFirstFactors.find((factor: any) => {
      return factor.strategy === 'phone_code';
    });

    const { phoneNumberId } = firstPhoneFactor;

    await signIn!.prepareFirstFactor({
      strategy: 'phone_code',
      phoneNumberId,
    });

    router.push(`/verification/${phoneNumber}?signin=true`);
    setLoading(false);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
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
        <Text style={{ ...FONTS.body3, color: COLORS.white }}>Nhập Số Điện Thoại Đã Đăng Ký Tích Điểm</Text>
        <View style={{ marginVertical: 22 }}>
          <View style={styles.container}>
            <View
              style={[styles.inputContainer, { borderColor: COLORS.gray }]}>
              <View id="recaptcha"></View>

              {loading && (
                <View style={[StyleSheet.absoluteFill, styles.loading]}>
                  <ActivityIndicator size="large" color={COLORS.background} />
                  <Text style={{ fontSize: 18, padding: 10 }}>Đang Gửi Mã</Text>
                </View>
              )}



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
                  setPhoneNumber(unmasked);
                }}
                mask={VIE_PHONE}
              />

            </View>
          </View>
          <SignUpButton
            title="NHẬN MÃ OTP"
            style={{
              width: SIZES.width - 32,
              marginVertical: 8,
            }}
            onPress={sendOTP}
          />

        </View>
      </ScrollView>
    </SafeAreaView>
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
});

export default Login;
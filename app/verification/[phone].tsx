import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES, image } from "../../constants";
import { useSignUp, isClerkAPIResponseError, useSignIn } from '@clerk/clerk-expo';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';
  const CELL_COUNT = 6;

const Page = () => {
    const { phone, signin } = useLocalSearchParams<{ phone: string; signin: string }>();
    const [code, setCode] = useState('');
    

    const { signUp, setActive } = useSignUp();
    const { signIn } = useSignIn();
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  

    const veryifySignIn = async () => {
      try {
        await signIn!.attemptFirstFactor({
          strategy: 'phone_code',
          code,
        });
  
        await setActive!({ session: signIn!.createdSessionId });
      } catch (err) {
        console.log('error', JSON.stringify(err, null, 2));
        if (isClerkAPIResponseError(err)) {
          Alert.alert('Error', err.errors[0].message);
        }
      }
    }

    const resendCode = async () => {}

    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
          <Stack.Screen options={{ title: phone }} />
        <ScrollView
            style={{ flex: 1, backgroundColor: COLORS.background, padding: 16 }}>
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
    <Text style={{ color: COLORS.white }}> Nhập Mã OTP </Text>
    
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
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor/> : null)}
          </Text>
        )}
      />

    <View style={{ marginVertical: 22 }}>
      

<TouchableOpacity style={styles.button} onPress={resendCode}>
        <Text style={styles.buttonText}>Gửi Lại Mã OTP</Text>
      </TouchableOpacity>
      
</View>
        </ScrollView>
    </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    legal: {
      fontSize: 14,
      textAlign: 'center',
      color: '#000',
    },
    button: {
      width: '100%',
      alignItems: 'center',
    },
    buttonText: {
      color: COLORS.gray,
      fontSize: 18,
    },
    bottomContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 2,
    },
    cover: {
        width: SIZES.width,
        position: "absolute",
        bottom: 0,
    },
    root: {padding: 20, minHeight: 300},
      title: {textAlign: 'center', fontSize: 30},
      codeFieldRoot: {marginTop: 20},
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
export default Page;
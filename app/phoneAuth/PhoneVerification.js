import * as React from "react";
import {SignUpButton} from '../../components/SignUpButton'
import { TouchableOpacity, Text, View } from "react-native";
import {SignUpInput} from "../../components/SignUpInput";

export default function VerifyPhone({ onVerify, onVerificationRetry }) {
  const [code, setCode] = React.useState("");

  return (
    <>
      <SignUpInput
        label="Verification Code"
        value={code}
        keyboardType="number-pad"
        onChangeText={(text) => setCode(text)}
        style={{ margin: 20 }}
      />
      <SignUpButton
        mode="contained"
        buttonColor="#3f51b5"
        onPress={() => onVerify(code)}
        style={{ margin: 20 }}
      >
        Verify
      </SignUpButton>
      <View style={{ margin: 20, alignItems: "center" }}>
        <TouchableOpacity onPress={onVerificationRetry}>
          <Text style={{ color: "#3f51b5", textAlign: "center" }}>
            If you did not get a verification code or entered the wrong phone
            number, click here
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
import React from 'react';
import { COLORS, SIZES, FONTS, image } from "../../../constants";
import { FontAwesome } from '@expo/vector-icons';

import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import {
  BarcodeFormat,
  BarcodeCreatorView,
} from 'react-native-barcode-creator';
import FlipCard from 'react-native-flip-card'

export default function App() {
  return (
    <ImageBackground source={image.background2} resizeMode='cover' style={styles.bgcontainer}>
 <SafeAreaView style ={styles.container}>
      
          <FlipCard
          friction={60}
          perspective={1000}
          style = {styles.flipcard}
          flipHorizontal={true}
  flipVertical={false}
 
         >
  {/* Face Side */}
  
  <BarcodeCreatorView
        value={'944111666'}
        background={COLORS.ligtDark}
        foregroundColor={COLORS.secondary}
        format={BarcodeFormat.CODE128}
        style={styles.qr}
      />   
 
  {/* Back Side */} 
  <View style={styles.backcontainer}>
  <FontAwesome name="user-circle-o" size={150} />
  <View style={styles.idinfo}>
  <Text style = {[{...FONTS.h3}, styles.idtext] } >back not front </Text> 
  <Text style = {[{...FONTS.h3}, styles.idtext] } >back not front </Text> 
  </View>
  </View>
</FlipCard>

<View style={{flex:3}}></View>
</SafeAreaView>
      </ImageBackground>
 
  );
}

const styles = StyleSheet.create({
  backcontainer:{
    flexDirection: 'row',
    width: 391,
    height: 213,
    
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
  },
  idinfo:{
    marginLeft: 10,
  },
  idtext:{
    color: COLORS.primary,
    marginBottom: 10,
  },
  flipcard:{ 
  },
  qr: {
    width: 391,
    height: 213,

    },
  bgcontainer: {
    alignItems: 'center',
    height: '100%',
    width: '100%',

  },
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

})
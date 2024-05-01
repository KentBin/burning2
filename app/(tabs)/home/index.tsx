import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
    SafeAreaView,
    Dimensions,
    StatusBar,
    ImageBackground,
    Image,
    Text
  } from 'react-native';
  import { COLORS, SIZES, FONTS, image } from "../../../constants";
  import Carousel from 'react-native-reanimated-carousel';
  import db from '@react-native-firebase/database';

  const width = Dimensions.get('window').width;

  
const Home = () =>{
  const [promoURLs, setpromoURLs] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchPromo = (snap: any) => { 
      const items :string[] = []
      const adJSON = snap.toJSON()
      try{     
       for (var key in adJSON) {
        //setpromoURLs(adVal.child(key))
        items.push(adJSON[key])
       }
       
       setpromoURLs(items)
       setLoading(false)
       //console.log(loz.val()[0].uri)
      }
    
      catch (error){
        console.log(error)
      }
    }
    db().app.database('https://brning9-default-rtdb.asia-southeast1.firebasedatabase.app/').ref('/promotion').on('value', snap => {
      fetchPromo(snap)
    })
    
}, [])


    return(
        <SafeAreaView>
      {loading && (
        <View style={[StyleSheet.absoluteFill, styles.loading]} >
          <Text style={{ fontSize: 18, padding: 10 }}>Loading Images</Text>
        </View>
        
      )}
          <ImageBackground source={image.background2} resizeMode='cover' style={styles.bgcontainer}>     
          <Carousel
                loop
                width={width}
                height={width}
                autoPlay={true}
                data={promoURLs}
                scrollAnimationDuration={3000}
                mode='parallax'
                //onSnapToItem={(index) => console.log('current index:', index)}                
                renderItem={({index}) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 2,
                            justifyContent: 'center',
                            borderRadius: SIZES.radius,
                            borderColor: COLORS.secondary,
                            overflow: 'hidden'
                        }}
                    >
                        <Image style={styles.image} source={{ uri: promoURLs[index] }}></Image> 
                       {/* <Text style = {{fontSize: 25}}> {promoURLs[index]}</Text>  */}
                    </View>
                )}
            />
    </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  image:{
flex: 1,
resizeMode: 'stretch',
  },
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      marginHorizontal: 16,
    },
    bgcontainer: {
      alignItems: 'center',
      height: '100%',
      width: '100%',
    },
    loading: {
      //zIndex: 10,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    }
  });

export default Home
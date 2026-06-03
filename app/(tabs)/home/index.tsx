import React, { useEffect, useRef, useState } from 'react';

import {
  View,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Text
} from 'react-native';

import { COLORS, SIZES, FONTS, image } from "../../../constants";

import db from '@react-native-firebase/database';

const { width } = Dimensions.get('window');

const Home = () => {
  // Stores image URLs from Firebase
  const [images, setImages] = useState<string[]>([]);

  // Tracks currently visible slide
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reference to FlatList so we can scroll manually
  const flatListRef = useRef<FlatList>(null);

  /*
    FETCH IMAGES FROM FIREBASE
  */
  useEffect(() => {
    const ref = db().ref('/promotion');

    ref.on('value', snapshot => {
      const data = snapshot.val();

      if (!data) return;

      // Convert Firebase object into array
      const urls = Object.values(data);

      setImages(urls as string[]);
    });

    // Cleanup listener when component unmounts
    return () => ref.off();
  }, []);

  /*
    AUTOPLAY SLIDER
    Changes image every 3 seconds
  */
  useEffect(() => {
    // Don't run autoplay if no images
    if (images.length === 0) return;

    const interval = setInterval(() => {
      // Go back to first image if at the end
      const nextIndex =
        currentIndex === images.length - 1
          ? 0
          : currentIndex + 1;

      // Scroll FlatList
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      // Update active index
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, images]);

  /*
    UPDATES CURRENT INDEX WHEN USER SWIPES
  */
  const handleScroll = (event: any) => {
    const slideIndex = Math.round(
      event.nativeEvent.contentOffset.x / width
    );

    setCurrentIndex(slideIndex);
  };

  return (
      <ImageBackground   source={image.background2}
                         resizeMode="cover"
                         style={styles.bgcontainer}
                         >
        <View style={{ height: 240 }}>
      {/* IMAGE SLIDER */}
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={images}
        keyExtractor={(item, index) => index.toString()}
        onMomentumScrollEnd={handleScroll}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image
              source={{ uri: item }}
              style={styles.image}
            />
          </View>
        )}
      />
 {/* PAGINATION DOTS */}
      <View style={styles.dotsContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
</View>
        </ImageBackground>
  );
};

const styles = StyleSheet.create({
  /*
    MAIN SCREEN
  */

    bgcontainer: {
  flex: 1,
  alignItems: 'center',
    },
  /*
    EACH SLIDE
  */
  slide: {
    width: width,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },

  /*
    IMAGE STYLE
  */
  image: {
    width: '94%',
    height: 220,
    borderRadius: 20,
  },

  /*
    DOTS CONTAINER
  */
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },

  /*
    NORMAL DOT
  */
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.white,
    marginHorizontal: 4,
  },

  /*
    ACTIVE DOT
  */
  activeDot: {
    width: 18,
    backgroundColor: COLORS.secondary,
  },
});

export default Home;
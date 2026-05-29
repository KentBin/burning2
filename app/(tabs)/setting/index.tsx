import BoxedIcon from '@/components/BoxedIcon';
import SignUpButton from '@/components/SignUpButton';
import { useAuthStore } from '@/store/user';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import auth from '@react-native-firebase/auth';

import { Ionicons, FontAwesome } from '@expo/vector-icons';

import React, { useEffect, useState, useCallback } from 'react';
import { RefreshControl } from 'react-native';
import db from '@react-native-firebase/database';

import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import { COLORS, SIZES, image } from '../../../constants';

const Page = () => {
  const { user } = useAuthStore();
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useSharedValue(0);

  useEffect(() => {
    if (!user?.contactNumber) return;

    const normalizedPhone = user.contactNumber
      .replace('+84', '0')
      .replace(/\s/g, '');

    const userRef = db()
      .app
      .database('https://brning9-default-rtdb.asia-southeast1.firebasedatabase.app/')
      .ref(`/clientApp/${normalizedPhone}`);

    const listener = userRef.on('value', snapshot => {
      if (snapshot.exists()) {
        useAuthStore.setState({
          user: {
            ...user,
            point: snapshot.child('Point').val(),
          },
        });
      }
    });

    return () => userRef.off('value', listener);
  }, []);

  /*
    SETTINGS DATA
  */
  const securityItems = [
    {
      name: 'Change Password',
      icon: 'lock-closed',
      backgroundColor: COLORS.primary,
    },
    {
      name: 'Smart Login',
      icon: 'phone-portrait',
      backgroundColor: '#33A5D1',
    },
  ];

  const appItems = [
    {
      name: 'Language',
      icon: 'language',
      backgroundColor: '#7E57C2',
    },
    {
      name: 'Notifications',
      icon: 'notifications',
      backgroundColor: '#FF9800',
    },
    {
      name: 'Help',
      icon: 'help-circle',
      backgroundColor: '#4CAF50',
    },
  ];

  /*
    SIGN OUT
  */
  const onSignOut = () => {
    auth().signOut();
  };

  /*
    REUSABLE SETTINGS ROW
  */
  const renderItem = (item: any) => (
    <TouchableOpacity
      key={item.name}
      style={styles.item}
      activeOpacity={0.7}
    >
      <BoxedIcon
        name={item.icon}
        backgroundColor={item.backgroundColor}
      />

      <Text style={styles.itemText}>
        {item.name}
      </Text>

      <Ionicons
        name="chevron-forward"
        size={20}
        color={COLORS.gray}
      />
    </TouchableOpacity>
  );
const scrollHandler = useAnimatedScrollHandler({
  onScroll: (event) => {
    scrollY.value = event.contentOffset.y;
  },
});
const compactHeaderStyle = useAnimatedStyle(() => {
  return {
    opacity: interpolate(
      scrollY.value,
      [220, 300],
      [0, 1],
      Extrapolation.CLAMP
    ),

    transform: [
      {
        translateY: interpolate(
          scrollY.value,
          [220, 300],
          [-20, 0],
          Extrapolation.CLAMP
        ),
      },
    ],
  };
});

  return (
    <ImageBackground
      source={image.background1}
      resizeMode="cover"
      style={styles.bgcontainer}
    >
    <Animated.View
      style={[styles.compactHeader, compactHeaderStyle]}
    >
      <View style={styles.compactLeft}>
        <FontAwesome
          name="user-circle-o"
          size={50}
          color="#444"
        />

        <View>
          <Text style={styles.compactName}>
            {user?.name}
          </Text>

          <Text style={styles.compactMember}>
            Standard
          </Text>
        </View>
      </View>

      <View style={styles.pointsPill}>
        <Text style={styles.pointsText}>
          {user?.point || 0}
        </Text>
      </View>
    </Animated.View>
      <Animated.ScrollView
         onScroll={scrollHandler}
         scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        {/* TOP BACKGROUND */}
        <View style={styles.headerBackground} />

        {/* PROFILE CARD */}
        <View style={styles.profileCard}>
          {/* AVATAR */}
          <View style={styles.avatarContainer}>
            <FontAwesome
              name="user-circle-o"
              size={90}
              color="#444"
            />
          </View>

          {/* NAME */}
          <Text style={styles.name}>
            {user?.name || 'Guest User'}
          </Text>

          {/* PHONE */}
          <Text style={styles.subText}>
            {user?.contactNumber || 'No Phone Number'}
          </Text>

          {/* STATS */}
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>
                {user?.point || 0}
              </Text>

              <Text style={styles.statLabel}>
                Points
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.stat}>
              <Text style={styles.statValue}>
                Standard
              </Text>

              <Text style={styles.statLabel}>
                Member
              </Text>
            </View>
          </View>

          {/* LOYALTY BUTTON */}
          <TouchableOpacity style={styles.loyaltyButton}>
            <Ionicons
              name="star-outline"
              size={20}
              color="#333"
            />

            <Text style={styles.loyaltyText}>
              About Loyalty Program
            </Text>
          </TouchableOpacity>
        </View>

        {/* SECURITY SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Security
          </Text>

          <View style={styles.card}>
            {securityItems.map(renderItem)}
          </View>
        </View>

        {/* APP SETTINGS SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            App Settings
          </Text>

          <View style={styles.card}>
            {appItems.map(renderItem)}
          </View>
        </View>

        {/* LOGOUT BUTTON */}
        <SignUpButton
          title="Đăng Xuất"
          style={styles.logoutButton}
          onPress={onSignOut}
        />
      </Animated.ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  /*
    SCREEN BACKGROUND
  */
  bgcontainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  /*
    TOP HEADER BACKGROUND
  */
  headerBackground: {
    height: 180,
    backgroundColor: COLORS.icedorange,

    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  /*
    PROFILE CARD
  */
  profileCard: {
    backgroundColor: '#fff',

    marginHorizontal: 20,
    marginTop: -60,

    borderRadius: 28,

    padding: 24,

    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,

    elevation: 5,
  },

  /*
    AVATAR
  */
  avatarContainer: {
    marginTop: -70,

    backgroundColor: '#fff',

    borderRadius: 999,

    padding: 6,
  },

  /*
    USER NAME
  */
  name: {
    fontSize: 28,
    fontWeight: '700',

    marginTop: 14,

    color: '#222',
  },

  /*
    PHONE NUMBER
  */
  subText: {
    fontSize: 16,

    color: '#777',

    marginTop: 6,
  },

  /*
    STATS ROW
  */
  statsRow: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: 28,
  },

  /*
    INDIVIDUAL STAT
  */
  stat: {
    alignItems: 'center',
    minWidth: 100,
  },

  /*
    STAT NUMBER
  */
  statValue: {
    fontSize: SIZES.body1,
    fontWeight: '700',

    color: COLORS.secondary,
  },

  /*
    STAT LABEL
  */
  statLabel: {
    marginTop: 4,

    fontSize: SIZES.h4,

    color: COLORS.ligtDark,
  },

  /*
    VERTICAL DIVIDER
  */
  divider: {
    width: 1,
    height: 45,

    backgroundColor: '#DDD',

    marginHorizontal: 24,
  },

  /*
    LOYALTY BUTTON
  */
  loyaltyButton: {
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'center',

    gap: 8,

    marginTop: 28,

    backgroundColor: '#F7F7F7',

    paddingVertical: 14,
    paddingHorizontal: 18,

    borderRadius: 14,

    width: '100%',
  },

  /*
    LOYALTY TEXT
  */
  loyaltyText: {
    fontSize: 16,
    fontWeight: '600',

    color: COLORS.ligtDark,
  },

  /*
    SECTION WRAPPER
  */
  section: {
    marginTop: 32,
    marginHorizontal: 20,
  },

  /*
    SECTION TITLE
  */
  sectionTitle: {
    fontSize: SIZES.h1,
    fontWeight: '700',

    marginBottom: 16,

    color: COLORS.icedorange,
  },

  /*
    SETTINGS CARD
  */
  card: {
    backgroundColor: '#fff',

    borderRadius: 24,

    overflow: 'hidden',

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,

    elevation: 3,
  },

  /*
    SETTINGS ITEM
  */
  item: {
    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: 18,
    paddingVertical: 18,

    gap: 14,

    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },

  /*
    SETTINGS ITEM TEXT
  */
  itemText: {
    flex: 1,

    fontSize: 18,

    color: '#222',
  },

  /*
    LOGOUT BUTTON
  */
  logoutButton: {
    marginHorizontal: 20,
    marginVertical: 32
  },

  compactHeader: {
    position: 'absolute',

    top: 0,
    left: 0,
    right: 0,

    zIndex: 1000,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,

    backgroundColor: '#fff',

    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,

    elevation: 10,
  },

  compactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  compactName: {
    fontSize: 20,
    fontWeight: '700',
  },

  compactMember: {
    fontSize: 15,
    color: '#666',
  },

  pointsPill: {
    backgroundColor: '#B7A08B',

    paddingHorizontal: 16,
    paddingVertical: 8,

    borderRadius: 999,
  },

  pointsText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default Page;
import { Pressable, View, Text, Image, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { COLORS, SIZES, FONTS } from "../../../constants";
import { Ionicons } from '@expo/vector-icons';

export default function PressableProfileCard() {
    return (
<View style={styles.memberCard}>
  {/* LEFT SIDE */}
  <Pressable
    style={styles.profileSection}
    onPress={() => router.push('/setting')}
  >
      <Ionicons
        name="person-circle-outline"
        color={COLORS.gray}
        style={styles.avatar}
      />

    <View style={styles.userInfo}>
      <Text style={styles.name}>TESTER</Text>
      <Text style={styles.tier}>STANDARD</Text>
    </View>
  </Pressable>

  {/* RIGHT SIDE */}
  <Pressable
    style={styles.pointBadge}
    onPress={() => router.push('/history')}
  >
    <Text style={styles.pointText}>
      {500000}
    </Text>
  </Pressable>
</View>
)
}

const styles = StyleSheet.create({
    memberCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFF',
      borderRadius: 16,
      padding: 16,
      marginHorizontal: 16,
      marginBottom: 16,
    },

    profileSection: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },

    avatar: {
      width: 104,
      height: 104,
      borderRadius: 26,
    },

    userInfo: {
      marginLeft: 12,
    },

    name: {
      fontSize: 20,
      fontWeight: '600',
    },

    tier: {
      fontSize: 14,
      color: '#777',
    },

    pointBadge: {
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: COLORS.secondary,
    },

    pointText: {
      color: '#FFF',
      fontWeight: '600',
    },
});
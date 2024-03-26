import BoxedIcon from '@/components/BoxedIcon';
import { COLORS } from "../../../constants";
import { Ionicons } from '@expo/vector-icons';
import { View, ScrollView, Text, FlatList, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import {GestureHandlerRootView, TouchableOpacity} from 'react-native-gesture-handler'

const Page = () => {

  const items = [
    {
      name: 'Account',
      icon: 'key',
      backgroundColor: COLORS.primary,
    },
    {
      name: 'Privacy',
      icon: 'lock-closed',
      backgroundColor: '#33A5D1',
    },

  ];

  const support = [
    {
      name: 'Help',
      icon: 'information',
      backgroundColor: COLORS.primary,
    },
    {
      name: 'Tell a Friend',
      icon: 'heart',
      backgroundColor: COLORS.gray,
    },
  ];
  const onSignOut = () => {
    auth()
  .signOut();
  };
 
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: 40 }}>

        <View style={defaultStyles.block}>
          <FlatList
            data={items}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
            renderItem={({ item }) => (
              <View style={defaultStyles.item}>
                <BoxedIcon name={item.icon} backgroundColor={item.backgroundColor} />

                <Text style={{ fontSize: 18, flex: 1 }}>{item.name}</Text>
                <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
              </View>
            )}
          />
        </View>

        <View style={defaultStyles.block}>
          <FlatList
            data={support}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
            renderItem={({ item }) => (
              <View style={defaultStyles.item}>
                <BoxedIcon name={item.icon} backgroundColor={item.backgroundColor} />

                <Text style={{ fontSize: 18, flex: 1 }}>{item.name}</Text>
                <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
              </View>
            )}
          />
        </View>
        <GestureHandlerRootView>
   <TouchableOpacity onPress={onSignOut}>
          <Text
            style={{
              color: COLORS.primary,
              fontSize: 18,
              textAlign: 'center',
              paddingVertical: 14,
            }}>
            Log Out
          </Text>
        </TouchableOpacity> 
        </GestureHandlerRootView>
      </ScrollView>
    </View>
  );
};

const defaultStyles = StyleSheet.create({
    block: {
      backgroundColor: '#fff',
      borderRadius: 10,
      marginHorizontal: 14,
      marginTop: 20,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      gap: 10,
    },
    separator: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: COLORS.gray,
      marginLeft: 50,
    },
  });

export default Page;
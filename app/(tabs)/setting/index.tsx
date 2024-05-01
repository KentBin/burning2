import BoxedIcon from '@/components/BoxedIcon';
import { Ionicons } from '@expo/vector-icons';
import { View, ScrollView, Text, FlatList, StyleSheet, ImageBackground} from 'react-native';
import { COLORS, SIZES, FONTS, image} from "../../../constants";
import { FontAwesome } from '@expo/vector-icons';
import { useAuthStore } from '@/store/user';
import auth from '@react-native-firebase/auth';
import SignUpButton from '@/components/SignUpButton';


const Page = () => {
  const {user} = useAuthStore()
  
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
    {
      name: 'Tell a Friend',
      icon: 'heart',
      backgroundColor: COLORS.gray,
    },
    {
      name: 'Tell a Friend',
      icon: 'heart',
      backgroundColor: COLORS.gray,
    },
    {
      name: 'Tell a Friend',
      icon: 'heart',
      backgroundColor: COLORS.gray,
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
    <ImageBackground source={image.background1} resizeMode='cover' style={defaultStyles.bgcontainer}>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: 40 }}
        style={{
          marginBottom: SIZES.tabBarHeight,
        }}>

<View style={defaultStyles.bigblock}>
<FontAwesome name="user-circle-o" size={128} />
<View><Text style = {[defaultStyles.userinfo, {...FONTS.body3}]}>Tên Khách Hàng {user?.name}</Text>
<Text style = {[defaultStyles.userinfo, {...FONTS.body3}]}>Số Điện Thoại {user?.contactNumber}</Text>
  <Text style = {[defaultStyles.userinfo, {...FONTS.body3}]}>Điểm Thưởng {user?.point}</Text>
  </View>
</View>

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

        <SignUpButton
              title="Đăng Xuất"
              style={
                defaultStyles.block
              }
              onPress={onSignOut}
            />
      </ScrollView>
    </ImageBackground>
  );
};

const defaultStyles = StyleSheet.create({
    block: {
      backgroundColor: '#fff',
      borderRadius: SIZES.radius,
      marginHorizontal: 14,
      marginTop: 20,
      
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: SIZES.padding3,
      gap: 10,
    },
    separator: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: COLORS.gray,
      marginLeft: 50,
    },
    bgcontainer: {
    flex:1
  
    },
    bigblock: {
      backgroundColor: COLORS.white,
      borderRadius: 10,
      marginHorizontal: 14,
      marginTop: 40,
      marginBottom: 40,
      flexDirection: 'row',
      padding: 10,
      gap: 20,
    },
    userinfo:{
      flexShrink: 1, 
      marginBottom: 4,
      marginEnd: 4,
    },
  });

export default Page;
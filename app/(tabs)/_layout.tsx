import { COLORS, SIZES, FONTS } from "../../constants";
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const TabsLayout = () => {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarStyle: { backgroundColor: COLORS.background },
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveBackgroundColor: COLORS.background,
          tabBarActiveBackgroundColor: COLORS.background,
          headerStyle: {
            backgroundColor: COLORS.background,
          },
          headerShadowVisible: false,
        }}>
   <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="setting"
          options={{
            title: 'Setting',
            tabBarIcon: ({ size, color }) => <Ionicons name="cog" size={size} color={color} />,
            headerShown: false,
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
};
export default TabsLayout;
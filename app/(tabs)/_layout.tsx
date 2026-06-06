import { COLORS, SIZES, FONTS } from "../../constants";
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomFabBar } from "rn-wave-bottom-bar";
import React from "react";
import home from "./home";
import setting from "./setting";
import qr from "./qr";
import history from "./history";
//https://ionic.io/ionicons

const tabBarIcon =
  (name: any) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({
    focused,
    color,
    size,
  }: {
    focused: boolean;
    color: string;
    size: number;
  }) =>
    <Ionicons name={name} size={28} color={focused ? 'white' : 'white'} />;

    const Tab = createBottomTabNavigator();
const TabsLayout = () => {


  const [showLabel, setShowLabel] = React.useState(false);
  const [enableSquare, setEnableSquare] = React.useState(false);
  const [isRtl, setIsRtl] = React.useState(false);
  return (
     
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: COLORS.secondary,
              tabBarInactiveTintColor: COLORS.white,
              tabBarActiveBackgroundColor: COLORS.ligtDark,
              tabBarInactiveBackgroundColor: 'red',
              tabBarLabelStyle: {
                color: COLORS.ligtDark,
              },
              headerStyle:{backgroundColor: COLORS.ligtDark},
              headerTitleStyle:{...FONTS.h2, color: COLORS.secondary}
            }}
            tabBar={(props) => (
              <BottomFabBar
                mode={enableSquare ? 'square' : 'default'}
                isRtl={isRtl}
                // Add Shadow for active tab bar button
                focusedButtonStyle={{
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: -1,
                  },
                  shadowOpacity: 0.61,
                  shadowRadius: 8,
                  elevation: 14,
                }}
                /* eslint-disable-next-line max-len */
                // - You can add the style below to show content screen under the tab-bar
                // - It will makes the "transparent tab bar" effect.
                bottomBarContainerStyle={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
                springConfig={{
                  stiffness: 1500,
                  damping: 85,
                  mass: 4,
                }}
                {...props}
              />
            )}
          >
            <Tab.Screen
              options={{
                tabBarIcon: tabBarIcon('home'),
                tabBarLabel: showLabel ? 'Home' : undefined,
                title: 'Trang Chủ',
              }}
              name="Home"
              component={home}
              
            />

<Tab.Screen
              options={{
                tabBarIcon: tabBarIcon('card'),
                tabBarLabel: showLabel ? 'Card' : undefined,
                title: 'Thẻ Thành Viên',
                
              }}
              name="Card"
              component={qr}
              
            />

            <Tab.Screen
                          options={{
                            tabBarIcon: tabBarIcon('receipt-outline'),
                            tabBarLabel: showLabel ? 'History' : undefined,
                            title: 'Lịch Sử',

                          }}
                          name="History"
                          component={history}

                        />
          
            <Tab.Screen
              options={{
                tabBarIcon: tabBarIcon('cog'),
                tabBarLabel: showLabel ? 'Setting' : undefined,
                title: 'Cài Đặt',
              }}
              name="Setting"
              component={setting}
            />

          </Tab.Navigator>
 
  );
};
export default TabsLayout;
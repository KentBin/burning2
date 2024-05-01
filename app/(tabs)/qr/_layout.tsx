import { COLORS, FONTS } from "../../../constants";
import { Stack } from 'expo-router';
const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Thẻ Thành Viên',
          headerLargeTitle: true,
          headerTitleStyle: {...FONTS.largeTitle},
          headerShadowVisible: false,
          headerStyle: { backgroundColor: COLORS.ligtDark },
        }}
      />
    </Stack>
  );
};
export default Layout;
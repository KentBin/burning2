import { COLORS, SIZES, FONTS, image } from "../../../constants";
import { Stack } from 'expo-router';
const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Tài Khoản',
          headerLargeTitle: true,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: COLORS.white },

        }}
      />
    </Stack>
  );
};
export default Layout;
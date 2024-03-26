import { COLORS, SIZES, FONTS } from "../../../constants";
import { Stack } from 'expo-router';
const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
          headerLargeTitle: true,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: COLORS.background },

          headerSearchBarOptions: {
            placeholder: 'Search',
          },
        }}
      />
    </Stack>
  );
};
export default Layout;
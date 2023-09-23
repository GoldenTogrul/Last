import { createDrawerNavigator } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";
import TabRoutes from "./MainTabNavigator";
import StackRoutes from "./stack.routes";
import SettingsScreen from "../screens/Settingscreen";
import SignInScreens from "../screens/authscreens/navigation";
import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        setUser(currentUser);
      } catch (error) {
        // Если пользователь не авторизован, перенаправляем на экран входа
        setUser(null);
      }
    };

    checkUser();
  }, []);

  return (
    <Drawer.Navigator
      screenOptions={{ title: '' }}
    >
      <Drawer.Screen
        name="home"
        component={user ? TabRoutes : SignInScreens}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
          drawerLabel: "Начальная",
        }}
      />
      <Drawer.Screen
        name="profile"
        component={user ? StackRoutes : SignInScreens}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
          drawerLabel: "Мой профиль",
        }}
      />
      <Drawer.Screen
        name="settings"
        component={user ? SettingsScreen : SignInScreens}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="settings" size={size} color={color} />
          ),
          drawerLabel: "Настройки",
        }}
      />
    </Drawer.Navigator>
  );
}

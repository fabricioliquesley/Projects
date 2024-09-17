import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TeacherList } from "../pages/TeacherList";
import { TeacherFavorites } from "../pages/TeacherFavorites";
import { Ionicons } from "@expo/vector-icons";

const { Navigator, Screen } = createBottomTabNavigator();

export function StudyTabs() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          elevation: 0,
          shadowOpacity: 0,
          height: 64,
        },
        tabBarItemStyle: {
          flexDirection: "row",
          justifyContent: "center",
          gap: 16,
        },
        tabBarIconStyle: {
          flex: 0,
          width: 20,
          height: 24,
        },
        tabBarLabelStyle: {
          fontFamily: "Archivo_700Bold",
          fontSize: 13,
        },
        tabBarInactiveBackgroundColor: "#fafafc",
        tabBarInactiveTintColor: "#c1bccc",
        tabBarActiveBackgroundColor: "#ebebf5",
        tabBarActiveTintColor: "#32264d",
      }}
    >
      <Screen
        name="TeacherList"
        component={TeacherList}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="easel-outline"
              size={size}
              color={focused ? "#8257e5" : color}
            />
          ),
          tabBarLabel: "Proffys",
        }}
      />
      <Screen
        name="Favorites"
        component={TeacherFavorites}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="heart-outline"
              size={size}
              color={focused ? "#8257e5" : color}
            />
          ),
          tabBarLabel: "Favoritos",
        }}
      />
    </Navigator>
  );
}

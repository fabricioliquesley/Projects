import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import { Landing } from "../pages/Landing";
import { GiveClasses } from "../pages/GiveClasses";
import { StudyTabs } from "./StudyTabs";

const { Navigator, Screen } = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
} as NativeStackNavigationOptions;

export function AppStack() {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="Landing" screenOptions={screenOptions}>
        <Screen name="Landing" component={Landing} />
        <Screen name="GiveClasses" component={GiveClasses} />
        <Screen name="Study" component={StudyTabs} />
      </Navigator>
    </NavigationContainer>
  );
}

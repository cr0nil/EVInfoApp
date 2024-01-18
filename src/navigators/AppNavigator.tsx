import { NavigationContainer } from "@react-navigation/native";

import React from "react";

import { RootStackParamList, Route } from "./typeScreen";

import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen";
import { DetailsScreen } from "../screens/DetailsScreen";

const RootStack = createNativeStackNavigator<RootStackParamList>();

export type ScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Group>
          <RootStack.Screen
            name={Route.Home}
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name={Route.Details}
            component={DetailsScreen}
            options={{
              headerShown: true,
            }}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

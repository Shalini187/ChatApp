import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from "react-redux";

import navigationStrings from "../utils/navigationString";
import { navigationRef } from "./navigationService";
import { LoginScreen, SignupScreen } from "../screens";;
import MainTabScreen from "../navigation";
import MainStack from "../routes/navigation";

const Stack = createNativeStackNavigator();

export default function Routes() {
    const userData = useSelector((state: any) => state.auth.userData);

    return (
        <NavigationContainer
            ref={navigationRef}
        >
            {userData?.uid ? (
                <Stack.Navigator>
                    <Stack.Screen
                        name={navigationStrings.HOMETABMAIN}
                        component={MainTabScreen}
                        options={{
                            title: "",
                            headerShown: false,
                            headerTintColor: "#ffffff",
                        }}
                    />
                    {MainStack()}
                </Stack.Navigator>
            ) : (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen
                        name={navigationStrings.LOGIN}
                        component={LoginScreen}
                    />
                    <Stack.Screen
                        name={navigationStrings.SIGNUP}
                        component={SignupScreen}
                    />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
}

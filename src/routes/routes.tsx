import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from "react-redux";

import navigationStrings from "../utils/navigationString";
import { navigationRef } from "./navigationService";
import { LoginScreen, SignupScreen } from "../screens";
import Tabs from "../navigation";

const Stack = createNativeStackNavigator();

export default function Routes() {
    const userData = useSelector((state: any) => state.auth.userData);

    return (
        <NavigationContainer
            ref={navigationRef}
        >
            {userData?.uid ? (
               <Tabs />
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

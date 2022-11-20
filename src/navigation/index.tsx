//Navigations
import React from "react";
import { Icon } from "@ui-kitten/components";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MapScreen, ChatScreen } from "../screens";
import { COLORS } from "../constants"
import { ThemeProvider } from "../components";

const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <ThemeProvider
            children={
                <Tab.Navigator
                    initialRouteName="ChatScreen"
                    screenOptions={{
                        headerShown: false,
                        tabBarActiveTintColor: COLORS.blue,
                        tabBarInactiveTintColor: COLORS.gray
                    }}
                >
                    <Tab.Screen
                        name="MapScreen"
                        component={MapScreen}
                        options={{
                            tabBarLabel: "Maps",
                            tabBarIcon: ({ focused }) => (
                                <View
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Icon
                                        name={'place'}
                                        style={{
                                            width: 32,
                                            height: 32,
                                            tintColor: focused ? COLORS.blue : COLORS.gray
                                        }}
                                        pack={'material'}
                                    />
                                </View>
                            )
                        }}
                    />
                    <Tab.Screen
                        name="ChatScreen"
                        component={ChatScreen}
                        options={{
                            tabBarLabel: 'Chats',
                            tabBarIcon: ({ focused }) => (
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon
                                        name={'chat'}
                                        style={{
                                            width: 32,
                                            height: 32,
                                            tintColor: focused ? COLORS.blue : COLORS.gray
                                        }}
                                        pack={'material'}
                                    />
                                </View>
                            )
                        }}
                    />
                </Tab.Navigator>
            }
        />
    )
}

export default Tabs;
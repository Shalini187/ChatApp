//Navigations
import React from "react";
import { Icon, Layout } from "@ui-kitten/components";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { ChatScreen } from "../screens";
import { COLORS } from "../constants"
import { ThemeProvider } from "../components";
import navigationString from "../utils/navigationString";

const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <ThemeProvider
            children={
                <Tab.Navigator
                    initialRouteName={navigationString.CHATSCREEN}
                    screenOptions={{
                        headerShown: false,
                        tabBarActiveTintColor: COLORS.blue,
                        tabBarInactiveTintColor: COLORS.gray
                    }}
                >
                    <Tab.Screen
                        name={navigationString.CHATSCREEN}
                        component={ChatScreen}
                        options={{
                            tabBarLabel: 'Chats',
                            tabBarIcon: ({ focused }) => (
                                <Layout style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon
                                        name={'chat'}
                                        style={{
                                            width: 32,
                                            height: 32,
                                            tintColor: focused ? COLORS.blue : COLORS.gray
                                        }}
                                        pack={'material'}
                                    />
                                </Layout>
                            )
                        }}
                    />
                </Tab.Navigator>
            }
        />
    )
}

export default Tabs;
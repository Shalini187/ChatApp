//Navigations
import React from "react";
import { Icon, Layout } from "@ui-kitten/components";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { ChatScreen } from "../screens";
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
                        name="ChatScreen"
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
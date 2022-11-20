import { LogBox } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChatSectionScreen, LoginScreen, SignupScreen } from './src/screens';
import Tabs from './src/navigation';
import { AuthContext, ThemeProvider } from './src/components';
import { unregister } from './src/utils';

const Stack = createNativeStackNavigator();

const App = ({ params }: any) => {

  const [user, setuser] = useState('');

  useEffect(() => {
    LogBox.ignoreAllLogs();
    unregister(setuser);
  }, []);

  return (
    <ThemeProvider
      children={
        <AuthContext.Provider value={{ user, setuser }}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={user ? 'Main' : 'Login'}>
              {
                user ?
                  <>
                    <Stack.Screen name="Main" component={Tabs} initialParams={params} />
                    <Stack.Screen name="ChatSectionScreen" component={ChatSectionScreen} initialParams={params} />
                  </>
                  :
                  <>
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} initialParams={params} />
                    <Stack.Screen name="SignUp" component={SignupScreen} options={{ headerShown: false }} initialParams={params} />
                  </>
              }
            </Stack.Navigator>
          </NavigationContainer>
        </AuthContext.Provider>
      }
    />
  )
}

export default () => {
  return (
    <App />
  )
};
import { LogBox } from 'react-native'
import React, { useEffect } from 'react';
import { Provider as ReduxProvider } from "react-redux";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ThemeProvider, WrapperContainer } from './src/components';
import { unregister } from './src/utils';
import store from './src/redux/store';
import Routes from './src/routes/routes';

const Stack = createNativeStackNavigator();

const App = () => {

  useEffect(() => {
    LogBox.ignoreAllLogs();
    unregister();
  }, []);

  return (
    <ReduxProvider store={store}>
      <WrapperContainer>
        <ThemeProvider
          children={<Routes />}
        />
      </WrapperContainer>
    </ReduxProvider>
  )
}

export default () => {
  return (
    <App />
  )
};
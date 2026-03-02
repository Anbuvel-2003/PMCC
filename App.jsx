import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, useColorScheme } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import NotificationService from './src/services/NotificationService';
import { useEffect } from 'react';

import './global.css';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    const setupNotifications = async () => {
      await NotificationService.registerAppWithFCM();
      const hasPermission = await NotificationService.requestUserPermission();
      if (hasPermission) {
        await NotificationService.getFCMToken();
        NotificationService.setupListeners();
      }
    };

    setupNotifications();

    return () => {
      NotificationService.cleanup();
    };
  }, []);

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'light-content'}
          translucent
          backgroundColor="transparent"
        />
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;

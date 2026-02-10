import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View, Text } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container} className="flex-1 items-center justify-center bg-white dark:bg-slate-900">
      <View className="p-6 bg-blue-500 rounded-2xl shadow-lg items-center">
        <Icon name="tailwind" size={50} color="white" />
        <Text className="text-white text-xl font-bold mt-2">Tailwind + Icons</Text>
        <Text className="text-blue-100 text-sm mt-1">Setup Complete!</Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <NewAppScreen
          templateFileName="App.tsx"
          safeAreaInsets={safeAreaInsets}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;


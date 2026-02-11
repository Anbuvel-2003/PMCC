import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import CreateTeamScreen from '../screens/CreateTeamScreen';
import MatchSetupScreen from '../screens/MatchSetupScreen';
import LiveMatchScreen from '../screens/LiveMatchScreen';
import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'fade',
            }}
        >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="CreateTeam" component={CreateTeamScreen} />
            <Stack.Screen
                name="MatchSetup"
                component={MatchSetupScreen}
                options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen
                name="LiveMatch"
                component={LiveMatchScreen}
                options={{ animation: 'slide_from_bottom' }}
            />
            <Stack.Screen
                name="Main"
                component={DrawerNavigator}
                options={{ animation: 'default' }}
            />
        </Stack.Navigator>
    );
};

export default RootNavigator;

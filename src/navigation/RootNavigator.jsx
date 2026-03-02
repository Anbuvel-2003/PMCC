import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import CreateTeamScreen from '../screens/CreateTeamScreen';
import MatchSetupScreen from '../screens/MatchSetupScreen';
import LiveMatchScreen from '../screens/LiveMatchScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SquadScreen from '../screens/SquadScreen';
import NotificationScreen from '../screens/NotificationScreen';
import TeamDashboardScreen from '../screens/TeamDashboardScreen';
import PlayerProfileScreen from '../screens/PlayerProfileScreen';
import ScorecardScreen from '../screens/ScorecardScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
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
            <Stack.Screen name="Register" component={RegisterScreen} />
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
            <Stack.Screen name="Main" component={DrawerNavigator} options={{ animation: 'default' }} />
            <Stack.Screen name="Squad" component={SquadScreen} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="Notifications" component={NotificationScreen} options={{ animation: 'slide_from_bottom' }} />
            <Stack.Screen name="TeamDashboard" component={TeamDashboardScreen} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="PlayerProfile" component={PlayerProfileScreen} options={{ animation: 'slide_from_bottom' }} />
            <Stack.Screen name="Scorecard" component={ScorecardScreen} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="Analytics" component={AnalyticsScreen} options={{ animation: 'slide_from_bottom' }} />
        </Stack.Navigator>
    );
};

export default RootNavigator;

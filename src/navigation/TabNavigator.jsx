import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TeamsScreen from '../screens/TeamsScreen';
import UploadScreen from '../screens/UploadScreen';
import HistoryScreen from '../screens/HistoryScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#d32f2f',
                tabBarInactiveTintColor: '#777',
                tabBarStyle: {
                    backgroundColor: 'white',
                    height: Platform.OS === 'ios' ? 88 : 75,
                    borderTopWidth: 1,
                    borderTopColor: '#f0f0f0',
                    paddingBottom: Platform.OS === 'ios' ? 25 : 12,
                    paddingTop: 10,
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: 'bold',
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Dashboard') {
                        iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
                    } else if (route.name === 'Teams') {
                        iconName = focused ? 'account-group' : 'account-group-outline';
                    } else if (route.name === 'Upload') {
                        iconName = focused ? 'plus-circle' : 'plus-circle-outline';
                    } else if (route.name === 'History') {
                        iconName = focused ? 'history' : 'history';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'account' : 'account-outline';
                    }

                    return <Icon name={iconName} size={24} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Dashboard" component={HomeScreen} />
            <Tab.Screen name="Teams" component={TeamsScreen} />
            <Tab.Screen name="Upload" component={UploadScreen} />
            <Tab.Screen name="History" component={HistoryScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default TabNavigator;

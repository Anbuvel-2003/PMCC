import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Platform, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BlurView } from '@react-native-community/blur';

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
                tabBarActiveTintColor: '#ef4444',
                tabBarInactiveTintColor: '#475569',
                tabBarStyle: {
                    backgroundColor: '#0f172a',
                    height: Platform.OS === 'ios' ? 90 : 75,
                    borderTopWidth: 1,
                    borderTopColor: 'rgba(255,255,255,0.05)',
                    paddingBottom: Platform.OS === 'ios' ? 30 : 12,
                    paddingTop: 12,
                    position: 'absolute',
                    elevation: 0,
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '900',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    marginTop: 4,
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

                    return (
                        <View style={focused ? styles.activeIconContainer : null}>
                            <Icon name={iconName} size={focused ? 26 : 22} color={color} />
                            {focused && <View style={styles.activeDot} />}
                        </View>
                    );
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

const styles = StyleSheet.create({
    activeDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#ef4444',
        marginTop: 4,
        alignSelf: 'center',
    },
    activeIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default TabNavigator;

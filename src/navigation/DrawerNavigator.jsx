import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, Image, ScrollView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TabNavigator from './TabNavigator';
import auth from '@react-native-firebase/auth';
import { CommonActions } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const DrawerItem = ({ icon, label, tag, tagType = 'default', onPress }) => (
    <TouchableOpacity
        className="flex-row items-center px-6 py-4 border-b border-white/5"
        onPress={onPress}
    >
        <View className="w-10">
            <Icon name={icon} size={22} color="#ef4444" />
        </View>
        <Text className="flex-1 text-gray-300 text-[15px] font-bold italic tracking-tight">{label}</Text>
        {tag && (
            <View className={`px-2 py-0.5 rounded-full ${tagType === 'pro' ? 'bg-red-600' :
                tagType === 'free' ? 'bg-slate-700' :
                    'bg-transparent'
                }`}>
                {tagType === 'icon' ? (
                    <Icon name="tshirt-crew" size={16} color="#fbbf24" />
                ) : (
                    <Text className="text-white text-[9px] font-black uppercase tracking-widest">{tag}</Text>
                )}
            </View>
        )}
    </TouchableOpacity>
);

const CustomDrawerContent = (props) => {
    const handleSignOut = async () => {
        try {
            await auth().signOut();
            props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                })
            );
        } catch (error) {
            console.error('Sign Out Error:', error);
        }
    };

    return (
        <View className="flex-1 bg-[#0f172a]" style={{ flex: 1 }}>
            {/* Header Profile Section */}
            <View className="bg-slate-900 pt-16 pb-8 px-6 border-b border-white/5">
                <View className="flex-row items-center">
                    <View className="relative">
                        <View className="w-16 h-16 rounded-full overflow-hidden border-2 border-red-600 shadow-2xl shadow-red-900/50">
                            <Icon name="account-circle" size={60} color="#64748b" />
                        </View>
                        <View className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900" />
                    </View>

                    <View className="ml-4 flex-1">
                        <View className="flex-row items-center justify-between">
                            <Text className="text-white text-xl font-black italic">Anbu</Text>
                            <Icon name="shield-check" size={20} color="#ef4444" />
                        </View>
                        <Text className="text-gray-400 text-[10px] font-bold tracking-widest uppercase mt-0.5">Player Rank #42</Text>
                    </View>
                </View>

                <View className="mt-6 flex-row items-center bg-white/5 p-3 rounded-2xl border border-white/10">
                    <View className="flex-1">
                        <Text className="text-gray-500 text-[9px] font-black uppercase tracking-widest">Active Tournament</Text>
                        <Text className="text-white text-xs font-bold italic">Test Twenty® (CHTT)</Text>
                    </View>
                    <Icon name="chevron-right" size={20} color="#475569" />
                </View>
            </View>

            {/* Menu Items */}
            <ScrollView className="flex-1 mt-4" showsVerticalScrollIndicator={false}>
                <DrawerItem icon="crown" label="UPGRADE TO PRO" tag="PREMIUM" tagType="pro" />
                <DrawerItem icon="trophy-outline" label="Tournament Series" />
                <DrawerItem icon="cricket" label="Start A Quick Match" tag="LIVE" tagType="pro" />
                <DrawerItem icon="video-outline" label="Stadium Live Stream" />
                <DrawerItem icon="chart-box-outline" label="My Performance" />
                <DrawerItem icon="shield-crown-outline" label="Player Leaderboard" />
                <DrawerItem icon="account-group-outline" label="Team Management" />
                <DrawerItem icon="cog-outline" label="Settings" />

                <View className="p-6 mt-4">
                    <TouchableOpacity
                        className="bg-white/5 p-4 rounded-2xl border border-white/10 items-center"
                        onPress={handleSignOut}
                    >
                        <Text className="text-gray-500 text-[10px] font-black uppercase tracking-[4px]">Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerType: 'slide',
                drawerStyle: {
                    width: '85%',
                    backgroundColor: '#0f172a',
                },
                overlayColor: 'rgba(0,0,0,0.8)',
            }}
        >
            <Drawer.Screen name="Tabs" component={TabNavigator} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;

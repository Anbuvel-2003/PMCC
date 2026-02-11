import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

const DrawerItem = ({ icon, label, tag, tagType = 'default', onPress }) => (
    <TouchableOpacity
        className="flex-row items-center px-5 py-4 border-b border-gray-100"
        onPress={onPress}
    >
        <View className="w-10">
            <Icon name={icon} size={24} color="#666" />
        </View>
        <Text className="flex-1 text-gray-800 text-[15px] font-medium">{label}</Text>
        {tag && (
            <View className={`px-2 py-0.5 rounded-full ${tagType === 'pro' ? 'bg-teal-600' :
                    tagType === 'free' ? 'bg-gray-500' :
                        'bg-transparent'
                }`}>
                {tagType === 'icon' ? (
                    <Icon name="tshirt-crew" size={16} color="#fbbf24" />
                ) : (
                    <Text className="text-white text-[10px] font-bold uppercase">{tag}</Text>
                )}
            </View>
        )}
    </TouchableOpacity>
);

const CustomDrawerContent = (props) => {
    return (
        <View className="flex-1 bg-white">
            {/* Header Profile Section */}
            <View className="bg-[#333] pt-14 pb-6 px-5 flex-row items-center">
                <View className="relative">
                    <View className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-400">
                        <Icon name="account-circle" size={64} color="#ccc" />
                    </View>
                </View>

                <View className="ml-4 flex-1">
                    <View className="flex-row items-center justify-between">
                        <Text className="text-white text-xl font-bold">Anbu</Text>
                        <Icon name="chevron-right-circle-outline" size={20} color="white" />
                    </View>
                    <Text className="text-gray-300 text-xs mt-0.5">9677395645</Text>
                    <Text className="text-gray-300 text-xs" numberOfLines={1}>anbusmartanbuvel2407@gmail.com</Text>

                    <View className="mt-2 self-start border border-gray-400 rounded-full px-3 py-0.5">
                        <Text className="text-white text-[10px]">Free User</Text>
                    </View>
                </View>
            </View>

            {/* Menu Items */}
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <DrawerItem icon="chart-bar" label="PRO at ₹199 (No autopay)" tag="PRO" tagType="pro" />
                <DrawerItem icon="crown-outline" label="Test Twenty® (Code: CHTT)" />
                <DrawerItem icon="trophy-outline" label="Add a Tournament/Series" tag="Free" tagType="free" />
                <DrawerItem icon="poker-chip" label="Start A Match" tag="Free" tagType="free" />
                <DrawerItem icon="video-outline" label="Go Live" />
                <DrawerItem icon="cricket" label="My Cricket" />
                <DrawerItem icon="chart-line" label="My Performance" />
                <DrawerItem icon="shopping-outline" label="CricHeroes Store" tagType="icon" />
                <DrawerItem icon="podium" label="Player Leaderboard" />
                <DrawerItem icon="align-vertical-bottom" label="Team Leaderboard" />
                <DrawerItem icon="medal-outline" label="CricHeroes Awards" />
                <DrawerItem icon="hubspot" label="Associations" />
                <DrawerItem icon="office-building" label="Clubs" />
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
                },
            }}
        >
            <Drawer.Screen name="Tabs" component={TabNavigator} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;

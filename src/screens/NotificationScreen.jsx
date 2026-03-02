import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import GradientWrapper from '../components/GradientWrapper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NotificationItem = ({ title, time, icon, color }) => (
    <View className="bg-white/5 p-5 rounded-3xl border border-white/10 flex-row items-center mb-4">
        <View className="w-12 h-12 rounded-2xl bg-white/5 items-center justify-center border border-white/10">
            <Icon name={icon} size={24} color={color || "#ef4444"} />
        </View>
        <View className="ml-4 flex-1">
            <Text className="text-white font-bold text-sm tracking-tight">{title}</Text>
            <Text className="text-gray-500 text-[10px] uppercase font-black mt-1 tracking-widest">{time}</Text>
        </View>
        <Icon name="chevron-right" size={20} color="#475569" />
    </View>
);

const NotificationScreen = ({ navigation }) => {
    return (
        <View className="flex-1 bg-[#0f172a]" style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <GradientWrapper colors={['#0f172a', '#1e293b', '#0f172a']} style={{ flex: 1 }}>
                <View className="pt-16 pb-6 px-6 flex-row items-center">
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="bg-white/5 p-3 rounded-2xl border border-white/10"
                    >
                        <Icon name="chevron-left" size={24} color="white" />
                    </TouchableOpacity>
                    <View className="ml-4">
                        <Text className="text-white text-2xl font-black italic uppercase tracking-tighter">NOTIFICATIONS</Text>
                        <View className="h-1 w-12 bg-red-600 rounded-full mt-1" />
                    </View>
                </View>

                <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
                    <NotificationItem
                        title="Match starting in 30 minutes!"
                        time="Just Now"
                        icon="clock-outline"
                        color="#fbbf24"
                    />
                    <NotificationItem
                        title="New team member joined your squad."
                        time="2 hours ago"
                        icon="account-plus-outline"
                        color="#ef4444"
                    />
                    <NotificationItem
                        title="Your match results are ready to view."
                        time="5 hours ago"
                        icon="chart-bar"
                        color="#22c55e"
                    />
                    <NotificationItem
                        title="Weekly tournament is now live!"
                        time="1 day ago"
                        icon="trophy-outline"
                        color="#ef4444"
                    />
                </ScrollView>
            </GradientWrapper>
        </View>
    );
};

export default NotificationScreen;

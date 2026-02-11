import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import GradientWrapper from '../components/GradientWrapper';
import GlassButton from '../components/GlassButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = () => {
    return (
        <View className="flex-1 bg-[#0f172a]">
            <StatusBar barStyle="light-content" />
            <GradientWrapper colors={['#0f172a', '#1e293b', '#0f172a']}>
                <ScrollView className="flex-1 px-8 pt-16" showsVerticalScrollIndicator={false}>
                    <View className="items-center mb-10">
                        <View className="relative">
                            <View className="w-32 h-32 rounded-full border-4 border-red-600 shadow-2xl shadow-red-900/40 p-1">
                                <View className="w-full h-full rounded-full bg-slate-900 items-center justify-center overflow-hidden">
                                    <Icon name="account" size={80} color="#475569" />
                                </View>
                            </View>
                            <TouchableOpacity className="absolute bottom-1 right-1 bg-red-600 p-2.5 rounded-full border-4 border-[#0f172a]">
                                <Icon name="pencil" size={16} color="white" />
                            </TouchableOpacity>
                        </View>
                        <Text className="text-white text-3xl font-black italic mt-6">Anbu</Text>
                        <Text className="text-red-500 font-bold tracking-[6px] text-[10px] uppercase mt-1">League Champion</Text>
                    </View>

                    <View className="space-y-4">
                        {[
                            { icon: 'account-edit-outline', label: 'Player Information' },
                            { icon: 'shield-check-outline', label: 'Secure Access' },
                            { icon: 'medal-outline', label: 'My Accolades' },
                            { icon: 'bell-ring-outline', label: 'Match Alerts' },
                            { icon: 'help-circle-outline', label: 'League Support' },
                        ].map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                className="bg-white/5 flex-row items-center p-5 rounded-3xl border border-white/10 mb-3"
                            >
                                <View className="bg-red-600/10 p-2.5 rounded-2xl mr-4 border border-red-500/20">
                                    <Icon name={item.icon} size={22} color="#ef4444" />
                                </View>
                                <Text className="text-white text-lg font-bold italic flex-1">{item.label}</Text>
                                <Icon name="chevron-right" size={20} color="#475569" />
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View className="mt-8 mb-16">
                        <GlassButton
                            label="LEAVE STADIUM"
                            containerStyle="py-5 rounded-2xl bg-red-600/10 border border-white/10"
                            textStyle="text-gray-500 font-black tracking-[4px] uppercase text-xs"
                        />
                    </View>
                </ScrollView>
            </GradientWrapper>
        </View>
    );
};

export default ProfileScreen;

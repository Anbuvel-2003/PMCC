import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import GradientWrapper from '../components/GradientWrapper';
import GlassButton from '../components/GlassButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = () => {
    return (
        <GradientWrapper colors={['#0f172a', '#1e293b']}>
            <View className="flex-1 px-8 pt-20">
                <View className="items-center mb-10">
                    <View className="relative">
                        <View className="w-32 h-32 rounded-full border-4 border-blue-500/30 p-1">
                            <View className="w-full h-full rounded-full bg-slate-700 items-center justify-center overflow-hidden">
                                <Icon name="account" size={80} color="#94a3b8" />
                            </View>
                        </View>
                        <TouchableOpacity className="absolute bottom-1 right-1 bg-blue-500 p-2 rounded-full border-4 border-[#0f172a]">
                            <Icon name="camera" size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text className="text-white text-2xl font-bold mt-4">Alex J. Rivera</Text>
                    <Text className="text-blue-400 font-medium tracking-widest text-xs uppercase mt-1">Premium Member</Text>
                </View>

                <View className="space-y-4">
                    {[
                        { icon: 'account-edit-outline', label: 'Edit Profile' },
                        { icon: 'shield-check-outline', label: 'Security & Privacy' },
                        { icon: 'bell-ring-outline', label: 'Notifications' },
                        { icon: 'help-circle-outline', label: 'Help & Support' },
                    ].map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            className="bg-white/5 flex-row items-center p-5 rounded-3xl border border-white/5"
                        >
                            <View className="bg-blue-500/10 p-2 rounded-xl mr-4">
                                <Icon name={item.icon} size={22} color="#60a5fa" />
                            </View>
                            <Text className="text-white text-lg flex-1">{item.label}</Text>
                            <Icon name="chevron-right" size={20} color="#64748b" />
                        </TouchableOpacity>
                    ))}
                </View>

                <View className="mt-12">
                    <GlassButton
                        label="Log Out"
                        containerStyle="py-4 rounded-3xl bg-red-500/10 border border-red-500/20"
                        textStyle="text-red-400 font-bold"
                    />
                </View>
            </View>
        </GradientWrapper>
    );
};

export default ProfileScreen;

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import GradientWrapper from '../components/GradientWrapper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const StatCard = ({ label, value, icon, color }) => (
    <View className="bg-white/5 p-4 rounded-2xl border border-white/10 flex-1 mx-1">
        <Icon name={icon} size={20} color={color || '#ef4444'} />
        <Text className="text-gray-400 text-[10px] mt-2 font-bold uppercase tracking-[1px]">{label}</Text>
        <Text className="text-white text-xl font-black">{value}</Text>
    </View>
);

const HomeScreen = ({ navigation }) => {
    return (
        <View className="flex-1 bg-[#0f172a]" style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <GradientWrapper colors={['#0f172a', '#1e293b', '#0f172a']} style={{ flex: 1 }}>
                {/* Header */}
                <View className="pt-14 pb-4 px-6 flex-row items-center justify-between">
                    <View className="flex-row items-center">
                        <TouchableOpacity
                            onPress={() => navigation.openDrawer()}
                            className="bg-white/10 p-2 rounded-xl border border-white/10"
                        >
                            <Icon name="menu" size={24} color="white" />
                        </TouchableOpacity>
                        <View className="ml-4">
                            <Text className="text-white text-xl font-black italic tracking-tighter">DASHBOARD</Text>
                            <View className="h-1 w-8 bg-red-600 rounded-full mt-0.5" />
                        </View>
                    </View>
                    <View className="flex-row">
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Notifications')}
                            className="bg-white/10 p-2 rounded-xl border border-white/10"
                        >
                            <Icon name="bell-outline" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                    {/* Premium Banner Section */}
                    <View className="m-4 bg-red-600 rounded-3xl overflow-hidden p-6 relative shadow-2xl shadow-red-900/40">
                        <View className="z-10">
                            <Text className="text-white text-2xl font-black italic uppercase">Match Analysis</Text>
                            <Text className="text-red-100 text-sm mt-1 font-medium opacity-80">Check your performance metrics</Text>
                            <TouchableOpacity className="bg-white self-start px-6 py-2.5 rounded-xl mt-6">
                                <Text className="text-red-600 font-black text-xs uppercase tracking-widest">View Stats</Text>
                            </TouchableOpacity>
                        </View>
                        <View className="absolute right-[-30] bottom-[-30] opacity-20">
                            <Icon name="cricket" size={180} color="white" />
                        </View>
                    </View>

                    {/* Stats Row */}
                    <View className="flex-row px-3 mb-4">
                        <StatCard label="Matches" value="24" icon="cricket" color="#ef4444" />
                        <StatCard label="Runs" value="842" icon="run-fast" color="#ef4444" />
                        <StatCard label="Wickets" value="12" icon="bowling" color="#ef4444" />
                    </View>

                    <View className="px-4 mb-8">
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Squad')}
                            className="bg-white/5 p-5 rounded-3xl border border-white/10 flex-row items-center"
                        >
                            <View className="w-12 h-12 rounded-2xl bg-red-600/20 items-center justify-center border border-red-500/30">
                                <Icon name="account-group-outline" size={26} color="#ef4444" />
                            </View>
                            <View className="ml-4 flex-1">
                                <Text className="text-white text-lg font-black italic tracking-tighter uppercase">My Squad</Text>
                                <Text className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-0.5">Manage Your Team Players</Text>
                            </View>
                            <View className="bg-white/5 p-2 rounded-xl">
                                <Icon name="chevron-right" size={24} color="#475569" />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Active Matches Header */}
                    <View className="px-6 mb-4 flex-row justify-between items-center">
                        <View>
                            <Text className="text-white text-lg font-black italic uppercase tracking-wider">Live Matches</Text>
                            <View className="h-1 w-12 bg-red-600 rounded-full mt-1" />
                        </View>
                        <TouchableOpacity>
                            <Text className="text-red-500 font-black text-xs uppercase tracking-widest">View All</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-6 mb-6">
                        {[1, 2].map((i) => (
                            <View key={i} className="bg-white/5 p-5 rounded-3xl w-80 mr-4 border border-white/10">
                                <View className="flex-row justify-between items-center mb-6">
                                    <View className="bg-red-600/20 px-3 py-1 rounded-full border border-red-500/30">
                                        <Text className="text-red-500 text-[10px] font-black uppercase tracking-widest">Live • T20</Text>
                                    </View>
                                    <View className="flex-row items-center">
                                        <Icon name="map-marker" size={12} color="#64748b" />
                                        <Text className="text-gray-400 text-[10px] ml-1 font-bold">Stadium Ground</Text>
                                    </View>
                                </View>

                                <View className="flex-row items-center justify-between mb-6">
                                    <View className="flex-row items-center">
                                        <View className="w-10 h-10 bg-white/10 rounded-full items-center justify-center mr-3 border border-white/10">
                                            <Text className="text-white font-black">K</Text>
                                        </View>
                                        <Text className="font-black text-white text-lg italic">Kings XI</Text>
                                    </View>
                                    <Text className="font-black text-red-500 text-xl">142/4 (16.2)</Text>
                                </View>

                                <View className="flex-row items-center justify-between">
                                    <View className="flex-row items-center">
                                        <View className="w-10 h-10 bg-white/10 rounded-full items-center justify-center mr-3 border border-white/10">
                                            <Text className="text-white font-black">R</Text>
                                        </View>
                                        <Text className="font-black text-white text-lg italic leading-tight">Royal Club</Text>
                                    </View>
                                    <Text className="font-bold text-gray-500 text-sm">Yet to bat</Text>
                                </View>

                                <View className="mt-6 pt-4 border-t border-white/5">
                                    <Text className="text-gray-400 text-xs font-medium">
                                        <Text className="text-red-500 font-black">Kings XI</Text> needs 59 runs in 22 balls
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>

                    <View className="p-6">
                        <TouchableOpacity
                            onPress={() => navigation.navigate('MatchSetup')}
                            className="bg-red-600 p-5 rounded-2xl flex-row items-center justify-center shadow-xl shadow-red-900/40"
                        >
                            <Icon name="plus-circle-outline" size={24} color="white" />
                            <Text className="text-white font-black ml-2 text-base italic uppercase tracking-widest">Start New Match</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="h-24" />
                </ScrollView>
            </GradientWrapper>
        </View>
    );
};

export default HomeScreen;

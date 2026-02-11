import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import GradientWrapper from '../components/GradientWrapper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const StatCard = ({ label, value, icon, color }) => (
    <View className="bg-white p-4 rounded-2xl border border-gray-100 flex-1 mx-1 shadow-sm">
        <Icon name={icon} size={20} color={color} />
        <Text className="text-gray-500 text-[10px] mt-2 font-bold uppercase">{label}</Text>
        <Text className="text-gray-900 text-lg font-black">{value}</Text>
    </View>
);

const HomeScreen = ({ navigation }) => {
    return (
        <View className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="bg-[#d32f2f] pt-12 pb-4 px-4 flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Icon name="menu" size={28} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white text-xl font-bold ml-4">Dashboard</Text>
                </View>
                <View className="flex-row">
                    <Icon name="magnify" size={26} color="white" className="mr-4" />
                    <Icon name="bell-outline" size={26} color="white" />
                </View>
            </View>

            <ScrollView className="flex-1">
                {/* Banner Section */}
                <View className="m-4 bg-teal-700 rounded-2xl overflow-hidden p-6 relative">
                    <View className="z-10">
                        <Text className="text-white text-lg font-bold">Your Performance</Text>
                        <Text className="text-teal-100 text-sm mt-1">Check your stats from last match</Text>
                        <TouchableOpacity className="bg-white self-start px-4 py-2 rounded-full mt-4">
                            <Text className="text-teal-800 font-bold text-xs uppercase">View Analysis</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="absolute right-[-20] bottom-[-20] opacity-20">
                        <Icon name="cricket" size={150} color="white" />
                    </View>
                </View>

                {/* Stats Row */}
                <View className="flex-row px-3 mb-6">
                    <StatCard label="Matches" value="24" icon="cricket" color="#d32f2f" />
                    <StatCard label="Runs" value="842" icon="run-fast" color="#1976d2" />
                    <StatCard label="Wickets" value="12" icon="bowling" color="#388e3c" />
                </View>

                {/* Active Matches */}
                <View className="px-4 mb-4 flex-row justify-between items-center">
                    <Text className="text-gray-900 text-lg font-bold">Live Matches</Text>
                    <TouchableOpacity>
                        <Text className="text-teal-600 font-bold">View All</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-4">
                    {[1, 2].map((i) => (
                        <View key={i} className="bg-white p-4 rounded-2xl w-80 mr-4 border border-gray-100 shadow-sm mb-4">
                            <View className="flex-row justify-between items-center mb-4">
                                <View className="bg-red-100 px-2 py-0.5 rounded">
                                    <Text className="text-red-600 text-[10px] font-bold uppercase">Live • T20</Text>
                                </View>
                                <Text className="text-gray-400 text-[10px]">Stadium Ground, City</Text>
                            </View>

                            <View className="flex-row items-center justify-between mb-4">
                                <View className="flex-row items-center">
                                    <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center mr-2">
                                        <Text className="text-blue-700 font-bold">K</Text>
                                    </View>
                                    <Text className="font-bold text-gray-800 text-base">Kings XI</Text>
                                </View>
                                <Text className="font-black text-gray-900 text-lg">142/4 (16.2)</Text>
                            </View>

                            <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center">
                                    <View className="w-8 h-8 bg-orange-100 rounded-full items-center justify-center mr-2">
                                        <Text className="text-orange-700 font-bold">R</Text>
                                    </View>
                                    <Text className="font-bold text-gray-800 text-base">Royal Club</Text>
                                </View>
                                <Text className="font-medium text-gray-400 text-sm">Yet to bat</Text>
                            </View>

                            <View className="mt-4 pt-4 border-t border-gray-50">
                                <Text className="text-teal-700 text-xs font-bold">Kings XI needs 59 runs in 22 balls</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                <View className="p-4">
                    <TouchableOpacity className="bg-teal-600 p-4 rounded-2xl flex-row items-center justify-center">
                        <Icon name="plus-circle-outline" size={24} color="white" />
                        <Text className="text-white font-bold ml-2 text-base">Start A New Match</Text>
                    </TouchableOpacity>
                </View>

                <View className="h-24" />
            </ScrollView>
        </View>
    );
};

export default HomeScreen;

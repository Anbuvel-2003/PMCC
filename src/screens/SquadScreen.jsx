import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import GradientWrapper from '../components/GradientWrapper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const squadData = [
    { id: '1', name: 'Anbu', role: 'Captain', rank: 'Platinum' },
    { id: '2', name: 'Vel', role: 'Vice-Captain', rank: 'Gold' },
    { id: '3', name: 'Rahul', role: 'Batsman', rank: 'Silver' },
    { id: '4', name: 'Siva', role: 'Bowler', rank: 'Gold' },
    { id: '5', name: 'Arun', role: 'All-rounder', rank: 'Platinum' },
    { id: '6', name: 'Vicky', role: 'Batsman', rank: 'Silver' },
    { id: '7', name: 'Mani', role: 'Bowler', rank: 'Bronze' },
];

const PlayerAvatar = ({ name, color }) => {
    const firstLetter = name.charAt(0).toUpperCase();
    return (
        <View className="w-12 h-12 rounded-full bg-red-600/20 items-center justify-center border border-red-500/30">
            <Text className="text-[#ef4444] font-black text-lg italic">{firstLetter}</Text>
        </View>
    );
};

const PlayerCard = ({ player, onPress }) => {
    const isCaptain = player.role === 'Captain' || player.role === 'Vice-Captain';

    return (
        <TouchableOpacity
            onPress={onPress}
            className="bg-white/5 p-4 rounded-3xl border border-white/10 flex-row items-center mb-4"
        >
            <PlayerAvatar name={player.name} />
            <View className="ml-4 flex-1">
                <View className="flex-row items-center">
                    <Text className="text-white font-bold text-base italic">{player.name}</Text>
                    {isCaptain && (
                        <View className="ml-2 bg-red-600/20 px-2 py-0.5 rounded-full border border-red-500/30">
                            <Text className="text-red-500 text-[8px] font-black uppercase tracking-widest">
                                {player.role === 'Captain' ? 'C' : 'VC'}
                            </Text>
                        </View>
                    )}
                </View>
                <Text className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-0.5">
                    {player.role} • {player.rank}
                </Text>
            </View>
            <View className="bg-white/5 p-2 rounded-xl">
                <Icon name="chevron-right" size={20} color="#475569" />
            </View>
        </TouchableOpacity>
    );
};

const SquadScreen = ({ navigation }) => {
    const [search, setSearch] = useState('');

    const filteredSquad = squadData.filter(player =>
        player.name.toLowerCase().includes(search.toLowerCase())
    );

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
                        <Text className="text-white text-2xl font-black italic uppercase tracking-tighter">MY SQUAD</Text>
                        <View className="h-1 w-12 bg-red-600 rounded-full mt-1" />
                    </View>
                </View>

                <View className="px-6 mb-6">
                    <View className="bg-white/5 flex-row items-center px-4 rounded-2xl border border-white/10 h-14">
                        <Icon name="magnify" size={20} color="#475569" />
                        <TextInput
                            className="flex-1 text-white ml-3 text-sm"
                            placeholder="Search players..."
                            placeholderTextColor="#475569"
                            value={search}
                            onChangeText={setSearch}
                        />
                    </View>
                </View>

                <ScrollView className="flex-1 px-6 pb-20" showsVerticalScrollIndicator={false}>
                    {filteredSquad.map(player => (
                        <PlayerCard
                            key={player.id}
                            player={player}
                            onPress={() => navigation.navigate('PlayerProfile', { player })}
                        />
                    ))}
                    {filteredSquad.length === 0 && (
                        <View className="items-center mt-10">
                            <Icon name="account-search-outline" size={60} color="#1e293b" />
                            <Text className="text-gray-500 mt-4 font-bold">No players found</Text>
                        </View>
                    )}
                    <View className="h-24" />
                </ScrollView>
            </GradientWrapper>
        </View>
    );
};

export default SquadScreen;

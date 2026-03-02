import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    StatusBar,
    StyleSheet,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import GradientWrapper from '../components/GradientWrapper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CreateTeamScreen = ({ navigation }) => {
    // Form State
    const [newTeam, setNewTeam] = useState({
        name: '',
        location: '',
        players: [],
        captain: '',
        viceCaptain: ''
    });
    const [playerName, setPlayerName] = useState('');

    const addPlayer = () => {
        if (playerName.trim()) {
            setNewTeam({
                ...newTeam,
                players: [...newTeam.players, playerName.trim()]
            });
            setPlayerName('');
        }
    };

    const handleCreateTeam = () => {
        if (!newTeam.name || !newTeam.location || newTeam.players.length === 0 || !newTeam.captain) {
            alert('Please fill all mandatory fields (Name, Location, Players, Captain)');
            return;
        }

        // In a real app, you'd send this to an API or global state
        // For now, we just go back. Ideally, we'd pass the new team back or update a store.
        navigation.goBack();
    };

    return (
        <View className="flex-1 bg-[#0f172a]" style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <GradientWrapper colors={['#0f172a', '#1e293b', '#0f172a']} style={{ flex: 1 }}>
                <View className="pt-16 pb-6 px-6 flex-row items-center justify-between">
                    <View>
                        <Text className="text-white text-3xl font-black italic uppercase tracking-tighter">Form Squad</Text>
                        <View className="h-1.5 w-16 bg-red-600 rounded-full mt-1" />
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="bg-white/5 p-3 rounded-2xl border border-white/10"
                    >
                        <Icon name="close" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    className="flex-1"
                >
                    <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6 pt-4">
                        {/* Team Name */}
                        <View className="mb-6">
                            <Text className="text-gray-500 text-[10px] font-black uppercase tracking-[2px] mb-3">Team Name *</Text>
                            <View className="bg-white/5 border border-white/10 rounded-2xl h-16 px-4 flex-row items-center">
                                <Icon name="shield-outline" size={20} color="#ef4444" />
                                <TextInput
                                    className="flex-1 text-white ml-3 text-base font-bold"
                                    placeholder="e.g. Thunder Strikers"
                                    placeholderTextColor="#475569"
                                    value={newTeam.name}
                                    onChangeText={text => setNewTeam({ ...newTeam, name: text })}
                                />
                            </View>
                        </View>

                        {/* Location */}
                        <View className="mb-6">
                            <Text className="text-gray-500 text-[10px] font-black uppercase tracking-[2px] mb-3">Home Ground / City *</Text>
                            <View className="bg-white/5 border border-white/10 rounded-2xl h-16 px-4 flex-row items-center">
                                <Icon name="map-marker-outline" size={20} color="#ef4444" />
                                <TextInput
                                    className="flex-1 text-white ml-3 text-base font-bold"
                                    placeholder="e.g. Mumbai, MH"
                                    placeholderTextColor="#475569"
                                    value={newTeam.location}
                                    onChangeText={text => setNewTeam({ ...newTeam, location: text })}
                                />
                            </View>
                        </View>

                        {/* Add Players */}
                        <View className="mb-8">
                            <Text className="text-gray-500 text-[10px] font-black uppercase tracking-[2px] mb-3">Build Your Roster</Text>
                            <View className="flex-row items-center bg-white/5 border border-white/10 rounded-2xl h-16 px-4">
                                <Icon name="account-plus-outline" size={20} color="#ef4444" />
                                <TextInput
                                    className="flex-1 text-white ml-3 text-base font-bold"
                                    placeholder="Enter Player Name"
                                    placeholderTextColor="#475569"
                                    value={playerName}
                                    onChangeText={setPlayerName}
                                    onSubmitEditing={addPlayer}
                                />
                                {playerName.length > 0 && (
                                    <TouchableOpacity
                                        className="bg-red-600 px-4 py-2 rounded-xl"
                                        onPress={addPlayer}
                                    >
                                        <Text className="text-white font-black text-[10px] uppercase">Add</Text>
                                    </TouchableOpacity>
                                )}
                            </View>

                            {/* Player List Roster */}
                            {newTeam.players.length > 0 && (
                                <View className="mt-6 bg-white/5 rounded-3xl border border-white/10 overflow-hidden">
                                    <View className="bg-white/5 px-4 py-3 border-b border-white/5">
                                        <Text className="text-gray-400 text-[9px] font-black uppercase tracking-widest">Team Roster ({newTeam.players.length})</Text>
                                    </View>
                                    <View className="p-2 flex-row flex-wrap">
                                        {newTeam.players.map((p, idx) => (
                                            <View
                                                key={idx}
                                                className="bg-slate-800 border border-white/10 px-4 py-2.5 rounded-2xl m-1.5 flex-row items-center"
                                            >
                                                <View className="w-5 h-5 bg-red-600 rounded-full items-center justify-center mr-2">
                                                    <Text className="text-white text-[9px] font-black">{idx + 1}</Text>
                                                </View>
                                                <Text className="text-white text-xs font-bold mr-3">{p}</Text>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        const updated = newTeam.players.filter((_, i) => i !== idx);
                                                        setNewTeam({ ...newTeam, players: updated });
                                                    }}
                                                >
                                                    <Icon name="close" size={14} color="#475569" />
                                                </TouchableOpacity>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            )}
                        </View>

                        {newTeam.players.length > 1 && (
                            <View className="mb-4 bg-red-600/5 p-6 rounded-3xl border border-red-500/10">
                                <Text className="text-red-500 text-[10px] font-black uppercase tracking-[3px] mb-5 text-center">Assign Leadership</Text>

                                {/* Captain */}
                                <View className="mb-6">
                                    <View className="flex-row items-center mb-3">
                                        <View className="bg-red-600 p-1.5 rounded-lg mr-2">
                                            <Icon name="crown" size={14} color="white" />
                                        </View>
                                        <Text className="text-gray-300 text-xs font-black uppercase italic">Team Captain</Text>
                                    </View>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                                        {newTeam.players.map((p, idx) => (
                                            <TouchableOpacity
                                                key={idx}
                                                onPress={() => setNewTeam({ ...newTeam, captain: p })}
                                                className={`px-5 py-3 rounded-2xl mr-3 border-2 ${newTeam.captain === p ? 'bg-red-600 border-white/20' : 'bg-white/5 border-white/5'}`}
                                            >
                                                <Text className={`text-[11px] font-black uppercase ${newTeam.captain === p ? 'text-white' : 'text-gray-500'}`}>{p}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>

                                {/* Vice Captain */}
                                <View>
                                    <View className="flex-row items-center mb-3">
                                        <View className="bg-slate-700 p-1.5 rounded-lg mr-2">
                                            <Icon name="shield-star" size={14} color="white" />
                                        </View>
                                        <Text className="text-gray-300 text-xs font-black uppercase italic">Vice Captain</Text>
                                    </View>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                                        {newTeam.players.map((p, idx) => (
                                            <TouchableOpacity
                                                key={idx}
                                                onPress={() => setNewTeam({ ...newTeam, viceCaptain: p })}
                                                className={`px-5 py-3 rounded-2xl mr-3 border-2 ${newTeam.viceCaptain === p ? 'bg-slate-700 border-white/20' : 'bg-white/5 border-white/5'}`}
                                            >
                                                <Text className={`text-[11px] font-black uppercase ${newTeam.viceCaptain === p ? 'text-white' : 'text-gray-500'}`}>{p}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>
                            </View>
                        )}

                        <TouchableOpacity
                            className="bg-red-600 py-6 rounded-2xl mt-8 mb-20 shadow-2xl shadow-red-900/50"
                            onPress={handleCreateTeam}
                        >
                            <Text className="text-white text-center font-black text-xl italic uppercase tracking-widest">Register Team</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>
            </GradientWrapper>
        </View>
    );
};

export default CreateTeamScreen;

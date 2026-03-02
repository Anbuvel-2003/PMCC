import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Share,
    StatusBar,
    StyleSheet,
    Modal,
    Pressable,
    Alert
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import GradientWrapper from '../components/GradientWrapper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import QRCode from 'react-native-qrcode-svg';

const PlayerListItem = ({ name, role, onPress }) => (
    <TouchableOpacity
        onPress={onPress}
        className="flex-row items-center justify-between py-4 border-b border-white/5"
    >
        <View className="flex-row items-center">
            <View className="w-10 h-10 bg-white/5 rounded-full items-center justify-center border border-white/10 mr-3">
                <Text className="text-[#ef4444] font-black text-sm italic">{name.charAt(0)}</Text>
            </View>
            <View>
                <Text className="text-white font-bold text-sm tracking-tight">{name}</Text>
                <Text className="text-gray-500 text-[9px] uppercase font-black tracking-widest">{role}</Text>
            </View>
        </View>
        <View className="bg-white/5 p-2 rounded-xl">
            <Icon name="chevron-right" size={16} color="#475569" />
        </View>
    </TouchableOpacity>
);

const TeamDashboardScreen = ({ route, navigation }) => {
    const { team = { name: "Team Alpha", location: "Local Ground", captain: "Captain" } } = route.params || {};
    const [qrVisible, setQrVisible] = useState(false);

    const dummyPlayers = [
        { name: "Anbu", role: "Captain / All-rounder" },
        { name: "Suresh", role: "Batsman" },
        { name: "Ramesh", role: "Batsman" },
        { name: "Kumar", role: "Bowler" },
        { name: "Vijay", role: "Bowler" },
        { name: "Manikandan", role: "Wicket Keeper" },
    ];

    const teamCode = `JOIN-${team.name.substring(0, 3).toUpperCase()}-2024`;
    const finalCode = (team.name.substring(0, 3).toUpperCase() + Math.random().toString().substring(2, 7)).substring(0, 8);

    const onShare = async () => {
        try {
            await Share.share({
                message: `Join ${team.name} on PMCC! Use code: ${finalCode}`,
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    const copyToClipboard = () => {
        Clipboard.setString(finalCode);
        Alert.alert('Copied', 'Team code copied to clipboard!');
    };

    return (
        <View className="flex-1 bg-[#0f172a]" style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <GradientWrapper colors={['#0f172a', '#1e293b', '#0f172a']} style={{ flex: 1 }}>
                {/* Header */}
                <View className="pt-16 pb-6 px-6 flex-row items-center justify-between">
                    <View className="flex-row items-center gap-4">
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            className="bg-white/5 p-3 rounded-2xl border border-white/10"
                        >
                            <Icon name="chevron-left" size={24} color="white" />
                        </TouchableOpacity>
                        <View>
                            <Text className="text-white text-2xl font-black italic uppercase tracking-tighter">{team.name}</Text>
                            <View className="h-1 w-12 bg-red-600 rounded-full mt-1" />
                        </View>
                    </View>
                    <View className="flex-row items-center gap-2">
                        <TouchableOpacity
                            onPress={() => setQrVisible(true)}
                            className="bg-white/5 p-3 rounded-2xl border border-white/10"
                        >
                            <Icon name="qrcode" size={20} color="#ef4444" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onShare}
                            className="bg-red-600/10 p-3 rounded-2xl border border-red-500/20"
                        >
                            <Icon name="share-variant" size={20} color="#ef4444" />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>


                    {/* Team Info Card */}
                    <View className="bg-white/5 p-6 rounded-[32px] border border-white/10 mb-8 overflow-hidden relative">
                        <View className="z-10">
                            <View className="flex-row items-center mb-4">
                                <View className="bg-red-600/20 px-3 py-1 rounded-full border border-red-500/30 mr-2">
                                    <Text className="text-red-500 text-[8px] font-black uppercase tracking-widest">Active Team</Text>
                                </View>
                                <View className="flex-row items-center">
                                    <Icon name="map-marker" size={12} color="#64748b" />
                                    <Text className="text-gray-400 text-[10px] ml-1 font-bold uppercase tracking-widest">{team.location}</Text>
                                </View>
                            </View>

                            <View className="mb-6">
                                <Text className="text-gray-500 text-[10px] uppercase font-black tracking-[2px] mb-1">Squad Captain</Text>
                                <Text className="text-white text-2xl font-black italic leading-tight">{team.captain}</Text>
                            </View>

                            <TouchableOpacity
                                onPress={copyToClipboard}
                                className="flex-row items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5"
                            >
                                <View>
                                    <Text className="text-gray-500 text-[10px] uppercase font-black tracking-[2px] mb-1">Join Code</Text>
                                    <Text className="text-white text-xl font-black tracking-widest">{finalCode}</Text>
                                </View>
                                <Icon name="content-copy" size={20} color="#ef4444" />
                            </TouchableOpacity>
                        </View>
                        <View className="absolute right-[-20] top-[-20] opacity-10">
                            <Icon name="shield-star" size={150} color="#ef4444" />
                        </View>
                    </View>

                    {/* Ground Info Section */}
                    <View className="mb-8">
                        <View className="flex-row justify-between items-center mb-4 px-2">
                            <Text className="text-white text-lg font-black italic uppercase">Home ground</Text>
                            <Icon name="map-search" size={20} color="#ef4444" />
                        </View>
                        <View className="bg-white/5 p-5 rounded-3xl border border-white/10 flex-row items-center">
                            <View className="w-12 h-12 rounded-2xl bg-white/5 items-center justify-center border border-white/10">
                                <Icon name="stadium" size={24} color="#ef4444" />
                            </View>
                            <View className="ml-4">
                                <Text className="text-white font-bold text-sm tracking-tight">{team.location.split(',')[0]} Stadium</Text>
                                <Text className="text-gray-500 text-[10px] uppercase font-black mt-1">International Standard Pitch</Text>
                            </View>
                        </View>
                    </View>

                    {/* Player List */}
                    <View className="mb-20">
                        <View className="flex-row justify-between items-center mb-4 px-2">
                            <Text className="text-white text-lg font-black italic uppercase">Player List</Text>
                            <Text className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{dummyPlayers.length} Active</Text>
                        </View>
                        <View className="bg-white/5 p-4 rounded-3xl border border-white/10">
                            {dummyPlayers.map((player, index) => (
                                <PlayerListItem
                                    key={index}
                                    name={player.name}
                                    role={player.role}
                                    onPress={() => navigation.navigate('PlayerProfile', { player })}
                                />
                            ))}
                        </View>
                    </View>
                </ScrollView>

                {/* QR Modal (Screen Style) */}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={qrVisible}
                    onRequestClose={() => setQrVisible(false)}
                >
                    <View className="flex-1 bg-[#0f172a]">
                        <GradientWrapper colors={['#0f172a', '#1e293b', '#0f172a']} style={{ flex: 1 }}>
                            {/* Modal Header */}
                            <View className="pt-16 pb-6 px-6 flex-row items-center justify-between">
                                <View className="flex-row items-center gap-4">
                                    <TouchableOpacity
                                        onPress={() => setQrVisible(false)}
                                        className="bg-white/5 p-3 rounded-2xl border border-white/10"
                                    >
                                        <Icon name="chevron-left" size={24} color="white" />
                                    </TouchableOpacity>
                                    <View>
                                        <Text className="text-white text-2xl font-black italic uppercase tracking-tighter">{team.name} QR</Text>
                                        <View className="h-1 w-12 bg-red-600 rounded-full mt-1" />
                                    </View>
                                </View>
                                <TouchableOpacity
                                    onPress={onShare}
                                    className="bg-red-600/10 p-3 rounded-2xl border border-red-500/20"
                                >
                                    <Icon name="share-variant" size={20} color="#ef4444" />
                                </TouchableOpacity>
                            </View>

                            <View className="flex-1 items-center justify-center px-10">
                                <View className="bg-white/5 p-8 rounded-[40px] border border-white/10 items-center w-full">
                                    <View className="p-4 bg-white rounded-3xl overflow-hidden mb-8">
                                        <QRCode
                                            value={finalCode}
                                            size={220}
                                            color="#0f172a"
                                            backgroundColor="white"
                                        />
                                    </View>

                                    <Text className="text-gray-500 text-[10px] font-black uppercase tracking-[3px] mb-4">Team Join Code</Text>

                                    <TouchableOpacity
                                        onPress={copyToClipboard}
                                        className="flex-row items-center bg-white/5 px-6 py-4 rounded-2xl border border-white/10"
                                    >
                                        <Text className="text-white text-3xl font-black tracking-[4px]">{finalCode}</Text>
                                        <Icon name="content-copy" size={20} color="#ef4444" style={{ marginLeft: 12 }} />
                                    </TouchableOpacity>
                                </View>

                                <Text className="text-gray-500 text-center text-[10px] mt-10 px-6 font-black uppercase tracking-widest leading-loose">
                                    Invite players to your squad by sharing this code
                                </Text>
                            </View>
                        </GradientWrapper>
                    </View>
                </Modal>
            </GradientWrapper>
        </View>
    );
};

export default TeamDashboardScreen;

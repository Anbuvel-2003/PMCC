import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    StyleSheet,
    Dimensions,
    Share,
    Alert,
    Modal,
    Pressable
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import GradientWrapper from '../components/GradientWrapper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, { Circle, Line, Text as SvgText, G } from 'react-native-svg';
import QRCode from 'react-native-qrcode-svg';

const { width } = Dimensions.get('window');

const StatCard = ({ label, value, subValue, icon, color }) => (
    <View className="bg-white/5 p-4 rounded-3xl border border-white/10 flex-1 mx-1 mb-2">
        <View className="flex-row items-center mb-2">
            <View className="p-1.5 rounded-lg bg-white/5 mr-2">
                <Icon name={icon} size={14} color={color || "#ef4444"} />
            </View>
            <Text className="text-gray-500 text-[9px] font-black uppercase tracking-widest">{label}</Text>
        </View>
        <Text className="text-white text-xl font-black italic">{value}</Text>
        {subValue && <Text className="text-gray-500 text-[8px] font-bold uppercase mt-1">{subValue}</Text>}
    </View>
);

const HitMap = () => {
    const size = width * 0.7;
    const center = size / 2;
    const radius = size * 0.4;

    // Dummy hit data (angles for 4s and 6s)
    const hits = [
        { type: '6', angle: 45, color: '#ef4444' },
        { type: '4', angle: 120, color: '#f59e0b' },
        { type: '6', angle: 210, color: '#ef4444' },
        { type: '4', angle: 300, color: '#f59e0b' },
        { type: '6', angle: 10, color: '#ef4444' },
    ];

    return (
        <View className="items-center justify-center py-6">
            <Svg width={size} height={size}>
                {/* Field Circle */}
                <Circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="2"
                    fill="rgba(255,255,255,0.02)"
                />

                {/* Sector Dividers */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                    const x = center + radius * Math.cos((angle * Math.PI) / 180);
                    const y = center + radius * Math.sin((angle * Math.PI) / 180);
                    return (
                        <Line
                            key={i}
                            x1={center}
                            y1={center}
                            x2={x}
                            y2={y}
                            stroke="rgba(255,255,255,0.05)"
                            strokeWidth="1"
                        />
                    );
                })}

                {/* Pitch (Center) */}
                <View style={{ position: 'absolute', top: center - 15, left: center - 5 }}>
                    <View className="w-2.5 h-8 bg-amber-900/30 rounded-sm border border-amber-900/50" />
                </View>

                {/* Hits */}
                {hits.map((hit, i) => {
                    const hitRadius = hit.type === '6' ? radius + 15 : radius - 5;
                    const x = center + hitRadius * Math.cos((hit.angle * Math.PI) / 180);
                    const y = center + hitRadius * Math.sin((hit.angle * Math.PI) / 180);
                    return (
                        <G key={i}>
                            <Line
                                x1={center}
                                y1={center}
                                x2={x}
                                y2={y}
                                stroke={hit.color}
                                strokeWidth="2"
                                strokeDasharray="4,2"
                                opacity="0.6"
                            />
                            <Circle cx={x} cy={y} r="4" fill={hit.color} />
                        </G>
                    );
                })}

                <SvgText
                    x={center}
                    y={center + radius + 30}
                    fill="#475569"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                >
                    360° PERFORMANCE ANALYSIS
                </SvgText>
            </Svg>
        </View>
    );
};

const PlayerProfileScreen = ({ route, navigation }) => {
    const { player = { name: "Anbu", role: "All-rounder" } } = route.params || {};

    const [qrVisible, setQrVisible] = useState(false);
    const profileCode = `PLAYER-${player.name.substring(0, 3).toUpperCase()}-777`;

    const onShare = async () => {
        try {
            await Share.share({
                message: `Check out ${player.name}'s performance on PMCC! Profile Code: ${profileCode}`,
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    const copyToClipboard = () => {
        Clipboard.setString(profileCode);
        Alert.alert('Copied', 'Player code copied to clipboard!');
    };

    return (
        <View className="flex-1 bg-[#0f172a]" style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <GradientWrapper colors={['#0f172a', '#1e293b', '#0f172a']} style={{ flex: 1 }}>
                {/* Header */}
                <View className="pt-16 pb-6 px-6 flex-row items-center justify-between">
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="bg-white/5 p-3 rounded-2xl border border-white/10"
                    >
                        <Icon name="chevron-left" size={24} color="white" />
                    </TouchableOpacity>
                    <View className="items-center">
                        <Text className="text-white text-xl font-black italic uppercase tracking-tighter">Player Stats</Text>
                        <View className="h-1 w-8 bg-red-600 rounded-full mt-1" />
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

                <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                    {/* Hero Section */}
                    <View className="items-center pt-4 mb-8">
                        <View className="relative">
                            <View className="w-32 h-32 rounded-[48px] bg-red-600 items-center justify-center border-4 border-white/10 shadow-2xl rotate-3">
                                <Text className="text-white text-6xl font-black italic -rotate-3">{player.name.charAt(0)}</Text>
                            </View>
                            <View className="absolute -bottom-2 -right-2 bg-slate-900 p-3 rounded-2xl border border-white/10 shadow-lg">
                                <Icon name="medal" size={20} color="#f59e0b" />
                            </View>
                        </View>
                        <Text className="text-white text-4xl font-black italic mt-6 uppercase tracking-tighter">{player.name}</Text>
                        <Text className="text-red-500 font-bold tracking-[8px] text-[10px] uppercase mt-2">{player.role}</Text>
                    </View>

                    {/* Stats Grid */}
                    <View className="px-6 mb-8">
                        <View className="flex-row justify-between mb-4">
                            <StatCard label="Matches" value="42" icon="cricket" />
                            <StatCard label="Total Runs" value="1,284" subValue="HS: 86*" icon="run-fast" />
                        </View>
                        <View className="flex-row justify-between mb-4">
                            <StatCard label="Wickets" value="38" subValue="BBI: 4/12" icon="bowling" />
                            <StatCard label="Average" value="34.2" subValue="S/R: 142.8" icon="chart-areaspline" />
                        </View>
                    </View>

                    {/* 360 Hit Map Section */}
                    <View className="mx-6 bg-slate-900/50 rounded-[40px] border border-white/5 p-6 mb-20 items-center overflow-hidden">
                        <View className="absolute top-0 right-0 p-6 opacity-10">
                            <Icon name="target" size={150} color="#ef4444" />
                        </View>
                        <HitMap />
                        <View className="flex-row gap-6 mt-4">
                            <View className="flex-row items-center">
                                <View className="w-2 h-2 rounded-full bg-[#ef4444] mr-2" />
                                <Text className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Sixes (42)</Text>
                            </View>
                            <View className="flex-row items-center">
                                <View className="w-2 h-2 rounded-full bg-[#f59e0b] mr-2" />
                                <Text className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Fours (98)</Text>
                            </View>
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
                                        <Text className="text-white text-2xl font-black italic uppercase tracking-tighter">{player.name} QR</Text>
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
                                            value={profileCode}
                                            size={220}
                                            color="#0f172a"
                                            backgroundColor="white"
                                        />
                                    </View>

                                    <Text className="text-gray-500 text-[10px] font-black uppercase tracking-[3px] mb-4">Player Profile Code</Text>

                                    <TouchableOpacity
                                        onPress={copyToClipboard}
                                        className="flex-row items-center bg-white/5 px-6 py-4 rounded-2xl border border-white/10"
                                    >
                                        <Text className="text-white text-xl font-black tracking-[2px]">{profileCode}</Text>
                                        <Icon name="content-copy" size={20} color="#ef4444" style={{ marginLeft: 12 }} />
                                    </TouchableOpacity>
                                </View>

                                <Text className="text-gray-500 text-center text-[10px] mt-10 px-6 font-black uppercase tracking-widest leading-loose">
                                    Share this profile for league verification and scouting
                                </Text>
                            </View>
                        </GradientWrapper>
                    </View>
                </Modal>
            </GradientWrapper>
        </View>
    );
};

export default PlayerProfileScreen;

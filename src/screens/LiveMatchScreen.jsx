import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    StyleSheet,
    Dimensions,
    Alert
} from 'react-native';
import GradientWrapper from '../components/GradientWrapper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const LiveMatchScreen = ({ route, navigation }) => {
    const { matchDetails } = route.params || {
        matchDetails: {
            teamA: "Kings XI",
            teamB: "Royal Club",
            overs: "20",
            location: "Local Ground",
            tossWinner: "Kings XI",
            tossDecision: "bat",
            striker: "Player One",
            nonStriker: "Player Two",
            bowler: "Bowler"
        }
    };

    const battingTeam = matchDetails.tossDecision === 'bat' ? matchDetails.tossWinner : (matchDetails.tossWinner === matchDetails.teamA ? matchDetails.teamB : matchDetails.teamA);
    const bowlingTeam = battingTeam === matchDetails.teamA ? matchDetails.teamB : matchDetails.teamA;

    const [score, setScore] = useState(0);
    const [wickets, setWickets] = useState(0);
    const [balls, setBalls] = useState(0);
    const [recentOvers, setRecentOvers] = useState([]);

    // Actual Players from Setup
    const currentStriker = matchDetails.striker || "Striker";
    const currentNonStriker = matchDetails.nonStriker || "Non-Striker";
    const currentBowler = matchDetails.bowler || "Bowler";

    const addRun = (runs) => {
        setScore(score + runs);
        setBalls(balls + 1);
        setRecentOvers([runs, ...recentOvers.slice(0, 5)]);
    };

    const addWicket = () => {
        if (wickets < 10) {
            setWickets(wickets + 1);
            setBalls(balls + 1);
            setRecentOvers(['W', ...recentOvers.slice(0, 5)]);
        } else {
            Alert.alert("Innings Over", "All wickets fallen!");
        }
    };

    const addExtra = (type) => {
        setScore(score + 1);
        setRecentOvers([type, ...recentOvers.slice(0, 5)]);
    };

    const currentOvers = Math.floor(balls / 6) + (balls % 6) / 10;

    return (
        <View className="flex-1 bg-[#0f172a]">
            <StatusBar barStyle="light-content" />
            <GradientWrapper colors={['#0f172a', '#1e293b', '#0f172a']}>
                {/* Header */}
                <View className="pt-16 pb-4 px-6 flex-row items-center justify-between border-b border-white/5">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="chevron-left" size={32} color="white" />
                    </TouchableOpacity>
                    <View className="items-center">
                        <Text className="text-red-500 font-black italic uppercase text-[10px] tracking-[4px]">Live In-Play</Text>
                        <Text className="text-white font-bold text-sm tracking-tighter">{matchDetails.location.split(',')[0]} Stadium</Text>
                    </View>
                    <TouchableOpacity className="bg-red-600/20 px-3 py-1.5 rounded-full border border-red-500/30">
                        <Text className="text-red-500 text-[9px] font-black uppercase tracking-widest">UPLOAD LIVE</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                    {/* Scorecard Hero */}
                    <View className="m-6 bg-slate-900 rounded-[40px] p-8 border border-white/10 shadow-2xl overflow-hidden relative">
                        <View className="flex-row justify-between items-start z-10">
                            <View>
                                <Text className="text-gray-500 text-[10px] font-black uppercase tracking-[3px] mb-2">Now Batting</Text>
                                <Text className="text-white text-3xl font-black italic leading-tight uppercase">{battingTeam}</Text>
                            </View>
                            <View className="items-end">
                                <Text className="text-red-600 text-5xl font-black italic">{score}-{wickets}</Text>
                                <Text className="text-gray-400 font-bold mt-1 uppercase text-[11px] tracking-widest">({currentOvers} / {matchDetails.overs} Ov)</Text>
                            </View>
                        </View>

                        <View className="mt-10 flex-row items-center justify-between z-10">
                            <View className="flex-row items-center">
                                <View className="w-10 h-10 bg-white/5 rounded-full items-center justify-center border border-white/10 mr-3">
                                    <Icon name="account" size={24} color="#64748b" />
                                </View>
                                <View>
                                    <Text className="text-white font-black italic text-sm">{currentStriker}*</Text>
                                    <Text className="text-red-500 text-xs font-black">24 <Text className="text-gray-500 font-medium">(18b)</Text></Text>
                                </View>
                            </View>
                            <View className="flex-row items-center">
                                <View className="items-end mr-3">
                                    <Text className="text-white font-black italic text-sm">{currentNonStriker}</Text>
                                    <Text className="text-gray-500 text-xs font-bold">12 (10b)</Text>
                                </View>
                                <View className="w-10 h-10 bg-white/5 rounded-full items-center justify-center border border-white/10">
                                    <Icon name="account" size={24} color="#64748b" />
                                </View>
                            </View>
                        </View>

                        {/* Current Bowler Info */}
                        <View className="mt-8 pt-6 border-t border-white/5 flex-row items-center justify-between z-10">
                            <View className="flex-row items-center">
                                <View className="bg-slate-800 p-2 rounded-xl mr-3 border border-white/10">
                                    <Icon name="bowling" size={16} color="#ef4444" />
                                </View>
                                <View>
                                    <Text className="text-gray-500 text-[9px] font-black uppercase tracking-widest">Bowling</Text>
                                    <Text className="text-white font-black italic text-sm">{currentBowler}</Text>
                                </View>
                            </View>
                            <View className="items-end">
                                <Text className="text-white font-black italic text-sm">0-{wickets}</Text>
                                <Text className="text-gray-500 text-[10px] font-bold">{currentOvers} Overs</Text>
                            </View>
                        </View>

                        <View className="absolute right-[-40] top-[-40] opacity-[0.03]">
                            <Icon name="cricket" size={250} color="white" />
                        </View>
                    </View>

                    {/* Timeline / Recent Balls */}
                    <View className="px-6 mb-8">
                        <Text className="text-gray-500 text-[10px] font-black uppercase tracking-[2px] mb-4">Last 6 Balls</Text>
                        <View className="flex-row space-x-3">
                            {recentOvers.length > 0 ? recentOvers.map((ball, idx) => (
                                <View key={idx} className={`w-10 h-10 rounded-full items-center justify-center border ${ball === 'W' ? 'bg-red-600 border-white/20' : ball === '6' || ball === '4' ? 'bg-white/10 border-red-500/50' : 'bg-white/5 border-white/10'}`}>
                                    <Text className={`font-black ${ball === 'W' || ball === '6' || ball === '4' ? 'text-white' : 'text-gray-400'}`}>{ball}</Text>
                                </View>
                            )) : [0, 0, 0, 0, 0, 0].map((_, i) => (
                                <View key={i} className="w-10 h-10 rounded-full border border-white/5 bg-transparent" />
                            ))}
                        </View>
                    </View>

                    {/* Controls Grid */}
                    <View className="px-6 pb-20">
                        <Text className="text-gray-500 text-[10px] font-black uppercase tracking-[2px] mb-6 text-center">Update Scoreboard</Text>

                        <View className="flex-row space-x-4 mb-4">
                            {[0, 1, 2].map((r) => (
                                <TouchableOpacity
                                    key={r}
                                    onPress={() => addRun(r)}
                                    className="flex-1 bg-white/5 aspect-square rounded-3xl items-center justify-center border border-white/10"
                                >
                                    <Text className="text-white text-2xl font-black italic">{r}</Text>
                                    <Text className="text-gray-500 text-[10px] font-black uppercase mt-1">{r === 1 ? 'Single' : r === 0 ? 'Dot' : 'Double'}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View className="flex-row space-x-4 mb-4">
                            {[3, 4, 6].map((r) => (
                                <TouchableOpacity
                                    key={r}
                                    onPress={() => addRun(r)}
                                    className={`flex-1 aspect-square rounded-3xl items-center justify-center border ${r >= 4 ? 'bg-red-600/10 border-red-600/30' : 'bg-white/5 border-white/10'}`}
                                >
                                    <Text className={`text-2xl font-black italic ${r >= 4 ? 'text-red-500' : 'text-white'}`}>{r}</Text>
                                    <Text className="text-gray-500 text-[10px] font-black uppercase mt-1">{r === 3 ? 'Triple' : r === 4 ? 'FOUR' : 'SIX'}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View className="flex-row space-x-4">
                            <TouchableOpacity
                                onPress={() => addWicket()}
                                className="flex-1 h-20 bg-red-600 rounded-3xl items-center justify-center shadow-xl shadow-red-900/40"
                            >
                                <Text className="text-white text-xl font-black italic uppercase tracking-widest">OUT</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => addExtra('WD')}
                                className="flex-1 h-20 bg-white/5 border border-white/10 rounded-3xl items-center justify-center"
                            >
                                <Text className="text-white text-xl font-black italic">WD</Text>
                                <Text className="text-gray-500 text-[10px] font-black uppercase">Wide</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => addExtra('NB')}
                                className="flex-1 h-20 bg-white/5 border border-white/10 rounded-3xl items-center justify-center"
                            >
                                <Text className="text-white text-xl font-black italic">NB</Text>
                                <Text className="text-gray-500 text-[10px] font-black uppercase">No Ball</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </GradientWrapper>
        </View>
    );
};

export default LiveMatchScreen;

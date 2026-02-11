import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import GradientWrapper from '../components/GradientWrapper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MatchResultCard = ({
    matchType = "League Match",
    date,
    overs,
    location,
    team1,
    team2,
    score1,
    score2,
    overs1,
    overs2,
    result,
    winner
}) => (
    <View className="bg-white/5 p-5 rounded-3xl border border-white/10 mb-5">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-4">
            <View className="flex-row items-center">
                <Icon name="history" size={14} color="#64748b" />
                <Text className="text-gray-400 text-[10px] font-black uppercase tracking-[2px] ml-2">{matchType}</Text>
            </View>
            <View className="bg-red-600/20 px-3 py-1 rounded-full border border-red-500/30">
                <Text className="text-red-500 text-[9px] font-black uppercase tracking-widest">FINAL RESULT</Text>
            </View>
        </View>

        <View className="flex-row items-center mb-6">
            <Icon name="map-marker-outline" size={12} color="#475569" />
            <Text className="text-gray-500 text-[10px] font-bold ml-1">{date} • {location.split(',')[0]} • {overs} Overs</Text>
        </View>

        {/* Scores Section */}
        <View className="space-y-4">
            <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                    <View className={`w-2 h-2 rounded-full mr-3 ${winner === team1 ? 'bg-red-600' : 'bg-transparent border border-gray-600'}`} />
                    <Text className={`text-lg italic ${winner === team1 ? 'font-black text-white' : 'font-bold text-gray-500'}`}>{team1}</Text>
                </View>
                <View className="flex-row items-baseline">
                    <Text className={`text-xl ${winner === team1 ? 'font-black text-white' : 'font-bold text-gray-500'}`}>{score1}</Text>
                    <Text className="text-gray-600 text-[10px] font-bold ml-1">({overs1})</Text>
                </View>
            </View>

            <View className="flex-row justify-between items-center mt-2">
                <View className="flex-row items-center">
                    <View className={`w-2 h-2 rounded-full mr-3 ${winner === team2 ? 'bg-red-600' : 'bg-transparent border border-gray-600'}`} />
                    <Text className={`text-lg italic ${winner === team2 ? 'font-black text-white' : 'font-bold text-gray-500'}`}>{team2}</Text>
                </View>
                <View className="flex-row items-baseline">
                    <Text className={`text-xl ${winner === team2 ? 'font-black text-white' : 'font-bold text-gray-500'}`}>{score2}</Text>
                    <Text className="text-gray-600 text-[10px] font-bold ml-1">({overs2})</Text>
                </View>
            </View>
        </View>

        <View className="h-[1px] bg-white/5 my-5" />

        {/* Footer Text */}
        <Text className="text-gray-400 text-xs font-bold italic mb-4">{result}</Text>

        {/* Action Buttons */}
        <View className="flex-row justify-end space-x-3">
            <TouchableOpacity className="bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <Text className="text-red-500 text-[10px] font-black uppercase tracking-widest">Scorecard</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-red-600 px-4 py-2 rounded-full">
                <Text className="text-white text-[10px] font-black uppercase tracking-widest">Analytics</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const HistoryScreen = () => {
    return (
        <View className="flex-1 bg-[#0f172a]">
            <StatusBar barStyle="light-content" />
            <GradientWrapper colors={['#0f172a', '#1e293b', '#0f172a']}>
                <View className="pt-16 pb-6 px-6">
                    <Text className="text-white text-3xl font-black italic uppercase tracking-tighter">Match History</Text>
                    <View className="h-1.5 w-16 bg-red-600 rounded-full mt-1" />
                </View>

                <ScrollView
                    className="flex-1 px-6"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 120 }}
                >
                    <MatchResultCard
                        date="08-Feb-26"
                        overs="8"
                        location="Tirupur, Boys Are Back Ground"
                        team1="Boys Are Back"
                        team2="Silent Killers"
                        score1="108/1"
                        score2="111/4"
                        overs1="8.0"
                        overs2="7.3"
                        winner="Silent Killers"
                        result="Silent Killers won by 6 wickets"
                    />

                    <MatchResultCard
                        date="05-Feb-26"
                        overs="20"
                        location="Chennai City Stadium"
                        team1="Kings XI"
                        team2="Super Stars"
                        score1="210/3"
                        score2="145/10"
                        overs1="20.0"
                        overs2="16.4"
                        winner="Kings XI"
                        result="Kings XI won by 65 runs"
                    />
                </ScrollView>
            </GradientWrapper>
        </View>
    );
};

export default HistoryScreen;

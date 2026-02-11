import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MatchResultCard = ({
    matchType = "Individual Match",
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
    <View className="bg-white p-4 rounded-2xl border border-gray-100 mb-4 shadow-sm">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-1">
            <Text className="text-gray-400 text-sm font-medium">{matchType}</Text>
            <View className="bg-black px-3 py-1 rounded-full">
                <Text className="text-white text-[10px] font-bold uppercase">Result</Text>
            </View>
        </View>
        <Text className="text-gray-400 text-xs mb-3">{date} | {overs} Ov. | {location}</Text>

        <View className="h-[1px] bg-gray-50 mb-4" />

        {/* Scores Section */}
        <View className="flex-row justify-between items-center mb-3">
            <Text className={`text-lg ${winner === team1 ? 'font-bold text-gray-900' : 'text-gray-400'}`}>{team1}</Text>
            <View className="flex-row items-baseline">
                <Text className={`text-xl ${winner === team1 ? 'font-bold text-gray-900' : 'text-gray-400'}`}>{score1}</Text>
                <Text className="text-gray-300 text-xs ml-1">({overs1} Ov)</Text>
            </View>
        </View>

        <View className="flex-row justify-between items-center mb-4">
            <Text className={`text-lg ${winner === team2 ? 'font-bold text-gray-900' : 'text-gray-400'}`}>{team2}</Text>
            <View className="flex-row items-baseline">
                <Text className={`text-xl ${winner === team2 ? 'font-bold text-gray-900' : 'text-gray-400'}`}>{score2}</Text>
                <Text className="text-gray-300 text-xs ml-1">({overs2} Ov)</Text>
            </View>
        </View>

        <View className="h-[1px] bg-gray-50 mb-3" />

        {/* Footer Text */}
        <Text className="text-gray-700 text-sm font-medium mb-4">{result}</Text>

        {/* Action Buttons */}
        <View className="flex-row justify-end space-x-6">
            <TouchableOpacity>
                <Text className="text-teal-600 font-bold text-sm">Insights</Text>
            </TouchableOpacity>
            <TouchableOpacity className="ml-6">
                <Text className="text-teal-600 font-bold text-sm">Squads</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const HistoryScreen = () => {
    return (
        <View className="flex-1 bg-gray-50">
            <View className="bg-[#d32f2f] pt-12 pb-4 px-4">
                <Text className="text-white text-xl font-bold">Match History</Text>
            </View>
            <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
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

                <View className="h-20" />
            </ScrollView>
        </View>
    );
};

export default HistoryScreen;

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, Share } from 'react-native';
import GradientWrapper from '../components/GradientWrapper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// --- Static Data ---
const inningsData = {
    1: {
        team: "Boys Are Back",
        toss: "Silent Killers won the toss and elected to field",
        batsmen: [
            { id: 'b1', name: "Anbu", dismissal: "c Rahul b Siva", runs: 42, balls: 28, fours: 4, sixes: 2 },
            { id: 'b2', name: "Vel", dismissal: "not out", runs: 56, balls: 32, fours: 6, sixes: 3 },
            { id: 'b3', name: "Siva", dismissal: "lbw b Rahul", runs: 12, balls: 15, fours: 1, sixes: 0 },
        ],
        bowlers: [
            { id: 'bw1', name: "Rahul", overs: 4, maidens: 0, runs: 32, wickets: 1, econ: 8.0 },
            { id: 'bw2', name: "Siva", overs: 4, maidens: 0, runs: 28, wickets: 1, econ: 7.0 },
        ],
        overs: [
            {
                number: 1,
                bowler: "Rahul",
                score: "8/0",
                balls: ["1", "0", "4", "1", "2", "0"]
            },
            {
                number: 2,
                bowler: "Siva",
                score: "15/0",
                balls: ["1", "1", "1", "4", "0", "0"]
            },
            {
                number: 3,
                bowler: "Rahul",
                score: "24/1",
                balls: ["1", "W", "0", "4", "4", "0"]
            },
            {
                number: 4,
                bowler: "Siva",
                score: "32/1",
                balls: ["1", "1", "2", "1", "1", "2"]
            }
        ]
    },
    2: {
        team: "Silent Killers",
        toss: "Silent Killers won the toss and elected to field",
        batsmen: [
            { id: 'b4', name: "Rahul", dismissal: "run out", runs: 15, balls: 10, fours: 2, sixes: 0 },
            { id: 'b5', name: "Siva", dismissal: "b Anbu", runs: 28, balls: 20, fours: 3, sixes: 1 },
            { id: 'b6', name: "Sanjay", dismissal: "not out", runs: 45, balls: 12, fours: 4, sixes: 4 },
        ],
        bowlers: [
            { id: 'bw3', name: "Anbu", overs: 3.3, maidens: 0, runs: 18, wickets: 2, econ: 5.4 },
            { id: 'bw4', name: "Vel", overs: 4, maidens: 1, runs: 24, wickets: 1, econ: 6.0 },
        ],
        overs: [
            {
                number: 1,
                bowler: "Anbu",
                score: "6/0",
                balls: ["1", "0", "1", "4", "0", "0"]
            },
            {
                number: 2,
                bowler: "Vel",
                score: "18/0",
                balls: ["4", "4", "1", "1", "2", "0"]
            },
            {
                number: 3,
                bowler: "Anbu",
                score: "22/1",
                balls: ["1", "W", "1", "1", "1", "0"]
            }
        ]
    }
};

// --- Sub-Components ---
const BatsmanRow = ({ player }) => (
    <View className="px-6 py-4 border-b border-white/5 flex-row justify-between items-center">
        <View className="flex-1 mr-2">
            <Text className="text-white font-bold text-sm italic">{player.name}</Text>
            <Text className="text-gray-500 text-[9px] font-bold mt-1 uppercase" numberOfLines={1}>{player.dismissal}</Text>
        </View>
        <View className="flex-row gap-6">
            <Text className="text-white font-black text-sm w-6 text-center">{player.runs}</Text>
            <Text className="text-gray-400 font-bold text-sm w-6 text-center">{player.balls}</Text>
            <Text className="text-gray-500 font-bold text-sm w-6 text-center">{player.fours}</Text>
            <Text className="text-gray-500 font-bold text-sm w-6 text-center">{player.sixes}</Text>
        </View>
    </View>
);

const BowlerRow = ({ bowler }) => (
    <View className="px-6 py-4 border-b border-white/5 flex-row justify-between items-center">
        <Text className="text-white font-bold text-sm italic flex-1">{bowler.name}</Text>
        <View className="flex-row gap-6">
            <Text className="text-white font-black text-sm w-6 text-center">{bowler.overs}</Text>
            <Text className="text-gray-400 font-bold text-sm w-6 text-center">{bowler.maidens}</Text>
            <Text className="text-gray-400 font-bold text-sm w-6 text-center">{bowler.runs}</Text>
            <Text className="text-red-500 font-black text-sm w-6 text-center">{bowler.wickets}</Text>
        </View>
    </View>
);

const BallCircle = ({ score }) => {
    let bgColor = "bg-white/5";
    let textColor = "text-gray-400";
    let borderColor = "border-white/10";

    if (score === "4") {
        bgColor = "bg-amber-500/10";
        textColor = "text-amber-500";
        borderColor = "border-amber-500/20";
    } else if (score === "6") {
        bgColor = "bg-red-600/10";
        textColor = "text-red-500";
        borderColor = "border-red-500/20";
    } else if (score === "W") {
        bgColor = "bg-red-600";
        textColor = "text-white";
        borderColor = "border-red-600";
    }

    return (
        <View className={`w-8 h-8 rounded-full items-center justify-center border ${borderColor} ${bgColor} mr-2`}>
            <Text className={`${textColor} text-[10px] font-black`}>{score}</Text>
        </View>
    );
};

const OverCard = ({ over }) => (
    <View className="bg-white/5 rounded-3xl border border-white/10 p-5 mb-4">
        <View className="flex-row justify-between items-center mb-4">
            <View className="flex-row items-center">
                <View className="bg-red-600/20 px-3 py-1 rounded-full border border-red-500/30 mr-3">
                    <Text className="text-red-500 text-[10px] font-black uppercase">Over {over.number}</Text>
                </View>
                <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">By {over.bowler}</Text>
            </View>
            <Text className="text-white font-black italic">{over.score}</Text>
        </View>
        <View className="flex-row">
            {over.balls.map((ball, idx) => (
                <BallCircle key={idx} score={ball} />
            ))}
        </View>
    </View>
);

// --- Main Screen ---
const ScorecardScreen = ({ route, navigation }) => {
    const { matchId = '1' } = route.params || {};
    const [activeInnings, setActiveInnings] = useState(1);
    const [activeTab, setActiveTab] = useState('scorecard'); // 'scorecard' or 'ballbyball'

    const onShare = async () => {
        try {
            await Share.share({
                message: "Check out this match scorecard on PMCC!",
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    const currentData = inningsData[activeInnings];

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
                        <Text className="text-white text-xl font-black italic uppercase tracking-tighter">Match Details</Text>
                        <View className="h-1 w-8 bg-red-600 rounded-full mt-1" />
                    </View>
                    <View className="flex-row gap-2">
                        <TouchableOpacity
                            onPress={onShare}
                            className="bg-white/5 p-3 rounded-2xl border border-white/10"
                        >
                            <Icon name="share-variant" size={20} color="#ef4444" />
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-red-600/10 p-3 rounded-2xl border border-red-500/20">
                            <Icon name="file-pdf-box" size={20} color="#ef4444" />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

                    {/* Toss Info */}
                    <View className="px-6 mb-6">
                        <View className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex-row items-center">
                            <Icon name="ammunition" size={18} color="#f59e0b" />
                            <Text className="text-amber-500 text-[10px] font-black uppercase tracking-widest ml-3 flex-1">
                                {currentData.toss}
                            </Text>
                        </View>
                    </View>

                    {/* Innings Selector */}
                    <View className="px-6 mb-6">
                        <View className="flex-row bg-white/5 rounded-2xl p-1.5 border border-white/10">
                            <TouchableOpacity
                                onPress={() => setActiveInnings(1)}
                                className={`flex-1 py-3 rounded-xl items-center ${activeInnings === 1 ? 'bg-red-600' : ''}`}
                            >
                                <Text className={`text-[10px] font-black uppercase tracking-widest ${activeInnings === 1 ? 'text-white' : 'text-gray-500'}`}>1st Innings</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setActiveInnings(2)}
                                className={`flex-1 py-3 rounded-xl items-center ${activeInnings === 2 ? 'bg-red-600' : ''}`}
                            >
                                <Text className={`text-[10px] font-black uppercase tracking-widest ${activeInnings === 2 ? 'text-white' : 'text-gray-500'}`}>2nd Innings</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Tab Selector */}
                    <View className="px-6 mb-8 flex-row gap-4">
                        <TouchableOpacity
                            onPress={() => setActiveTab('scorecard')}
                            className={`px-6 py-2 rounded-full border ${activeTab === 'scorecard' ? 'bg-white border-white' : 'bg-transparent border-white/10'}`}
                        >
                            <Text className={`text-[10px] font-black uppercase tracking-widest ${activeTab === 'scorecard' ? 'text-[#0f172a]' : 'text-gray-500'}`}>Scorecard</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setActiveTab('ballbyball')}
                            className={`px-6 py-2 rounded-full border ${activeTab === 'ballbyball' ? 'bg-white border-white' : 'bg-transparent border-white/10'}`}
                        >
                            <Text className={`text-[10px] font-black uppercase tracking-widest ${activeTab === 'ballbyball' ? 'text-[#0f172a]' : 'text-gray-500'}`}>Ball-by-Ball</Text>
                        </TouchableOpacity>
                    </View>

                    {activeTab === 'scorecard' ? (
                        <>
                            {/* POM Highlight */}
                            <View className="px-6 mb-8">
                                <View className="bg-white/5 rounded-[32px] border border-white/10 p-6 flex-row items-center">
                                    <View className="w-16 h-16 rounded-2xl bg-red-600 items-center justify-center rotate-3">
                                        <Text className="text-white text-3xl font-black italic -rotate-3">A</Text>
                                    </View>
                                    <View className="ml-5 flex-1">
                                        <Text className="text-red-500 text-[10px] font-black uppercase tracking-[3px] mb-1">Player of the Match</Text>
                                        <Text className="text-white text-2xl font-black italic uppercase tracking-tighter">Anbuvel</Text>
                                        <Text className="text-gray-500 text-xs font-bold mt-1">42 (28) & 2/18 (4.0)</Text>
                                    </View>
                                    <Icon name="medal" size={32} color="#f59e0b" />
                                </View>
                            </View>

                            <View className="px-6 mb-10">
                                {/* Batting Section */}
                                <View className="bg-white/5 rounded-[40px] border border-white/10 overflow-hidden mb-6">
                                    <View className="bg-white/5 px-6 py-4 border-b border-white/10 flex-row justify-between items-center">
                                        <Text className="text-white font-black italic uppercase tracking-widest text-[10px]">Batting - {currentData.team}</Text>
                                        <View className="flex-row gap-6">
                                            <Text className="text-gray-500 font-bold text-[9px] w-6 text-center">R</Text>
                                            <Text className="text-gray-500 font-bold text-[9px] w-6 text-center">B</Text>
                                            <Text className="text-gray-500 font-bold text-[9px] w-6 text-center">4s</Text>
                                            <Text className="text-gray-500 font-bold text-[9px] w-6 text-center">6s</Text>
                                        </View>
                                    </View>
                                    {currentData.batsmen.map((player) => (
                                        <BatsmanRow key={player.id} player={player} />
                                    ))}
                                </View>

                                {/* Bowling Section */}
                                <View className="bg-white/5 rounded-[40px] border border-white/10 overflow-hidden">
                                    <View className="bg-white/5 px-6 py-4 border-b border-white/10 flex-row justify-between items-center">
                                        <Text className="text-white font-black italic uppercase tracking-widest text-[10px]">Bowling</Text>
                                        <View className="flex-row gap-6">
                                            <Text className="text-gray-500 font-bold text-[9px] w-6 text-center">O</Text>
                                            <Text className="text-gray-500 font-bold text-[9px] w-6 text-center">M</Text>
                                            <Text className="text-gray-500 font-bold text-[9px] w-6 text-center">R</Text>
                                            <Text className="text-gray-500 font-bold text-[9px] w-6 text-center">W</Text>
                                        </View>
                                    </View>
                                    {currentData.bowlers.map((bowler) => (
                                        <BowlerRow key={bowler.id} bowler={bowler} />
                                    ))}
                                </View>
                            </View>
                        </>
                    ) : (
                        <View className="px-6 pb-10">
                            {currentData.overs.map((over) => (
                                <OverCard key={over.number} over={over} />
                            ))}
                            {currentData.overs.length === 0 && (
                                <Text className="text-gray-500 text-center py-20 font-bold italic uppercase text-[10px] tracking-widest">No over data available</Text>
                            )}
                        </View>
                    )}

                    {/* Footer Info */}
                    <View className="px-10 pb-20 items-center">
                        <View className="bg-red-600/10 px-6 py-3 rounded-2xl border border-red-500/20 mb-4">
                            <Text className="text-red-500 font-black tracking-widest uppercase text-[10px]">Match Result</Text>
                        </View>
                        <Text className="text-white text-center text-lg font-black italic uppercase tracking-tighter">Silent Killers won by 6 wickets</Text>
                    </View>

                </ScrollView>
            </GradientWrapper>
        </View>
    );
};

export default ScorecardScreen;

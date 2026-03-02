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
    Platform,
    Alert
} from 'react-native';
import GradientWrapper from '../components/GradientWrapper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MatchSetupScreen = ({ navigation }) => {
    const [step, setStep] = useState(1);

    // Match State
    const [matchDetails, setMatchDetails] = useState({
        teamA: '',
        teamB: '',
        location: '',
        overs: '20',
        tossWinner: '',
        tossDecision: '', // 'bat' or 'bowl'
        betAmount: '',
        striker: '',
        nonStriker: '',
        bowler: '',
    });

    const teams = ["Kings XI", "Red Warriors", "Strikers CC", "Victory Strikers", "Elite Cricket Club", "Royal Club"];
    const overOptions = ["5", "8", "10", "12", "15", "20", "50"];

    // Mock players for selection
    const teamAPlayers = ["Anbu", "Sam", "John", "Ram", "Vijay", "Rahul", "Dinesh", "Suresh"];
    const teamBPlayers = ["Kohli", "Rohit", "Dhoni", "Jadeja", "Hardik", "Bumrah", "Shami", "Pant"];

    const battingTeam = matchDetails.tossDecision === 'bat' ? matchDetails.tossWinner : (matchDetails.tossWinner === matchDetails.teamA ? matchDetails.teamB : matchDetails.teamA);
    const bowlingTeam = battingTeam === matchDetails.teamA ? matchDetails.teamB : matchDetails.teamA;

    const battingPlayers = battingTeam === matchDetails.teamA ? teamAPlayers : teamBPlayers;
    const bowlingPlayers = bowlingTeam === matchDetails.teamA ? teamAPlayers : teamBPlayers;

    const nextStep = () => {
        if (step === 1 && (!matchDetails.teamA || !matchDetails.teamB)) {
            Alert.alert("Selection Required", "Please select both teams to continue.");
            return;
        }
        if (step === 1 && matchDetails.teamA === matchDetails.teamB) {
            Alert.alert("Invalid Match", "A team cannot play against itself.");
            return;
        }
        if (step === 2 && !matchDetails.location) {
            Alert.alert("Location Required", "Please enter the ground location.");
            return;
        }
        if (step === 4 && (!matchDetails.tossWinner || !matchDetails.tossDecision)) {
            Alert.alert("Toss Required", "Please select toss winner and their decision.");
            return;
        }
        if (step === 5 && (!matchDetails.striker || !matchDetails.nonStriker || !matchDetails.bowler)) {
            Alert.alert("Lineup Required", "Please select Striker, Non-Striker and the Opening Bowler.");
            return;
        }
        setStep(step + 1);
    };

    const prevStep = () => setStep(step - 1);

    const startMatch = () => {
        navigation.navigate('LiveMatch', { matchDetails });
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <View className="flex-1">
                        <Text className="text-gray-500 text-[10px] font-black uppercase tracking-[2px] mb-6">Step 1: Select Competitors</Text>

                        <Text className="text-white text-xs font-bold uppercase mb-3">Team A (Home)</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8">
                            {teams.map((team) => (
                                <TouchableOpacity
                                    key={`teamA-${team}`}
                                    onPress={() => setMatchDetails({ ...matchDetails, teamA: team })}
                                    className={`px-6 py-4 rounded-2xl mr-3 border-2 ${matchDetails.teamA === team ? 'bg-red-600 border-white/20' : 'bg-white/5 border-white/5'}`}
                                >
                                    <Text className={`font-black uppercase italic ${matchDetails.teamA === team ? 'text-white' : 'text-gray-500'}`}>{team}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <View className="items-center my-4">
                            <View className="bg-white/5 p-2 rounded-full border border-white/10">
                                <Icon name="sword-cross" size={24} color="#ef4444" />
                            </View>
                        </View>

                        <Text className="text-white text-xs font-bold uppercase mb-3">Team B (Away)</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8">
                            {teams.map((team) => (
                                <TouchableOpacity
                                    key={`teamB-${team}`}
                                    onPress={() => setMatchDetails({ ...matchDetails, teamB: team })}
                                    className={`px-6 py-4 rounded-2xl mr-3 border-2 ${matchDetails.teamB === team ? 'bg-red-600 border-white/20' : 'bg-white/5 border-white/5'}`}
                                >
                                    <Text className={`font-black uppercase italic ${matchDetails.teamB === team ? 'text-white' : 'text-gray-500'}`}>{team}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                );
            case 2:
                return (
                    <View className="flex-1">
                        <Text className="text-gray-500 text-[10px] font-black uppercase tracking-[2px] mb-6">Step 2: Venue & Format</Text>

                        <View className="mb-8">
                            <Text className="text-white text-xs font-bold uppercase mb-3">Ground Location</Text>
                            <View className="bg-white/5 border border-white/10 rounded-2xl h-16 px-4 flex-row items-center">
                                <Icon name="stadium-variant" size={20} color="#ef4444" />
                                <TextInput
                                    className="flex-1 text-white ml-3 text-base font-bold"
                                    placeholder="e.g. Marina Ground, Chennai"
                                    placeholderTextColor="#475569"
                                    value={matchDetails.location}
                                    onChangeText={text => setMatchDetails({ ...matchDetails, location: text })}
                                />
                            </View>
                        </View>

                        <Text className="text-white text-xs font-bold uppercase mb-3">Innings Length (Overs)</Text>
                        <View className="flex-row flex-wrap">
                            {overOptions.map((over) => (
                                <TouchableOpacity
                                    key={over}
                                    onPress={() => setMatchDetails({ ...matchDetails, overs: over })}
                                    className={`px-8 py-4 rounded-2xl mr-2 mb-2 border-2 ${matchDetails.overs === over ? 'bg-red-600 border-white/20' : 'bg-white/5 border-white/5'}`}
                                >
                                    <Text className={`font-black ${matchDetails.overs === over ? 'text-white' : 'text-gray-500'}`}>{over}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                );
            case 3:
                return (
                    <View className="flex-1">
                        <Text className="text-gray-500 text-[10px] font-black uppercase tracking-[2px] mb-6">Step 3: Stakes</Text>

                        <View className="mb-8 bg-white/5 p-8 rounded-[40px] border border-white/10 items-center justify-center">
                            <View className="bg-red-600/10 p-6 rounded-full border border-red-500/20 mb-6">
                                <Icon name="currency-usd" size={40} color="#ef4444" />
                            </View>
                            <Text className="text-white text-2xl font-black italic uppercase text-center">Match Betting</Text>
                            <Text className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-2">Enter the prize pool amount</Text>

                            <View className="w-full mt-8 flex-row items-center justify-center border-b-2 border-red-600/30 pb-4">
                                <Text className="text-red-500 text-3xl font-black mr-2">₹</Text>
                                <TextInput
                                    className="text-white text-5xl font-black italic"
                                    placeholder="0"
                                    placeholderTextColor="#1e293b"
                                    keyboardType="numeric"
                                    value={matchDetails.betAmount}
                                    onChangeText={text => setMatchDetails({ ...matchDetails, betAmount: text })}
                                />
                            </View>
                        </View>
                    </View>
                );
            case 4:
                return (
                    <View className="flex-1">
                        <Text className="text-gray-500 text-[10px] font-black uppercase tracking-[2px] mb-6">Step 4: The Toss outcome</Text>

                        <View className="bg-white/5 p-6 rounded-3xl border border-white/10 mb-8">
                            <Text className="text-white text-center font-black italic uppercase mb-6 tracking-widest">Who won the toss?</Text>
                            <View className="flex-row space-x-4">
                                <TouchableOpacity
                                    onPress={() => setMatchDetails({ ...matchDetails, tossWinner: matchDetails.teamA })}
                                    className={`flex-1 p-5 rounded-2xl border-2 items-center ${matchDetails.tossWinner === matchDetails.teamA ? 'bg-red-600 border-white/20' : 'bg-white/5 border-white/5'}`}
                                >
                                    <Text className="text-white font-black italic text-center text-sm">{matchDetails.teamA}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setMatchDetails({ ...matchDetails, tossWinner: matchDetails.teamB })}
                                    className={`flex-1 p-5 rounded-2xl border-2 items-center ${matchDetails.tossWinner === matchDetails.teamB ? 'bg-red-600 border-white/20' : 'bg-white/5 border-white/5'}`}
                                >
                                    <Text className="text-white font-black italic text-center text-sm">{matchDetails.teamB}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {matchDetails.tossWinner && (
                            <View className="bg-slate-900/50 p-6 rounded-3xl border border-white/10">
                                <Text className="text-white text-center font-black italic uppercase mb-6 tracking-widest">Election?</Text>
                                <View className="flex-row space-x-4">
                                    <TouchableOpacity
                                        onPress={() => setMatchDetails({ ...matchDetails, tossDecision: 'bat' })}
                                        className={`flex-1 flex-row items-center justify-center p-5 rounded-2xl border-2 ${matchDetails.tossDecision === 'bat' ? 'bg-red-600 border-white/20' : 'bg-white/5 border-white/5'}`}
                                    >
                                        <Icon name="cricket" size={20} color="white" />
                                        <Text className="text-white font-black uppercase ml-2">BAT</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => setMatchDetails({ ...matchDetails, tossDecision: 'bowl' })}
                                        className={`flex-1 flex-row items-center justify-center p-5 rounded-2xl border-2 ${matchDetails.tossDecision === 'bowl' ? 'bg-red-600 border-white/20' : 'bg-white/5 border-white/5'}`}
                                    >
                                        <Icon name="bowling" size={20} color="white" />
                                        <Text className="text-white font-black uppercase ml-2">BOWL</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                );
            case 5:
                return (
                    <View className="flex-1">
                        <Text className="text-gray-500 text-[10px] font-black uppercase tracking-[2px] mb-6">Step 5: Select Opening Lineup</Text>

                        <View className="bg-white/5 p-6 rounded-3xl border border-white/10 mb-6">
                            <Text className="text-red-500 text-[10px] font-black uppercase mb-4 tracking-widest">Batting: {battingTeam}</Text>

                            <View className="mb-6">
                                <Text className="text-white text-xs font-bold uppercase mb-3">Striker Batsman</Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    {battingPlayers.map((p) => (
                                        <TouchableOpacity
                                            key={`striker-${p}`}
                                            onPress={() => setMatchDetails({ ...matchDetails, striker: p })}
                                            className={`px-5 py-3 rounded-2xl mr-2 border-2 ${matchDetails.striker === p ? 'bg-red-600 border-white/20' : 'bg-white/5 border-white/5'}`}
                                        >
                                            <Text className={`font-black italic uppercase text-xs ${matchDetails.striker === p ? 'text-white' : 'text-gray-500'}`}>{p}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>

                            <View>
                                <Text className="text-white text-xs font-bold uppercase mb-3">Non-Striker Batsman</Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    {battingPlayers.map((p) => (
                                        <TouchableOpacity
                                            key={`nonStriker-${p}`}
                                            disabled={matchDetails.striker === p}
                                            onPress={() => setMatchDetails({ ...matchDetails, nonStriker: p })}
                                            className={`px-5 py-3 rounded-2xl mr-2 border-2 ${matchDetails.nonStriker === p ? 'bg-red-600 border-white/20' : 'bg-white/5 border-white/5'} ${matchDetails.striker === p ? 'opacity-20' : 'opacity-100'}`}
                                        >
                                            <Text className={`font-black italic uppercase text-xs ${matchDetails.nonStriker === p ? 'text-white' : 'text-gray-500'}`}>{p}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        </View>

                        <View className="bg-white/5 p-6 rounded-3xl border border-white/10">
                            <Text className="text-gray-400 text-[10px] font-black uppercase mb-4 tracking-widest">Bowling: {bowlingTeam}</Text>
                            <Text className="text-white text-xs font-bold uppercase mb-3">Opening Bowler</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {bowlingPlayers.map((p) => (
                                    <TouchableOpacity
                                        key={`bowler-${p}`}
                                        onPress={() => setMatchDetails({ ...matchDetails, bowler: p })}
                                        className={`px-5 py-3 rounded-2xl mr-2 border-2 ${matchDetails.bowler === p ? 'bg-slate-700 border-white/20' : 'bg-white/5 border-white/5'}`}
                                    >
                                        <Text className={`font-black italic uppercase text-xs ${matchDetails.bowler === p ? 'text-white' : 'text-gray-500'}`}>{p}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                );
        }
    };

    return (
        <View className="flex-1 bg-[#0f172a]" style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <GradientWrapper colors={['#0f172a', '#1e293b', '#0f172a']} style={{ flex: 1 }}>
                <View className="pt-16 pb-6 px-6 flex-row items-center justify-between">
                    <View>
                        <Text className="text-white text-3xl font-black italic uppercase tracking-tighter">Match Setup</Text>
                        <View className="h-1.5 w-16 bg-red-600 rounded-full mt-1" />
                    </View>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="close" size={28} color="white" />
                    </TouchableOpacity>
                </View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    className="flex-1"
                >
                    <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
                        {renderStep()}

                        <View className="flex-row mt-12 mb-10 space-x-4">
                            {step > 1 && (
                                <TouchableOpacity
                                    onPress={prevStep}
                                    className="flex-1 bg-white/5 py-5 rounded-2xl border border-white/10 items-center"
                                >
                                    <Text className="text-gray-400 font-black uppercase italic tracking-widest">Back</Text>
                                </TouchableOpacity>
                            )}

                            {step < 5 ? (
                                <TouchableOpacity
                                    onPress={nextStep}
                                    className="flex-[2] bg-red-600 py-5 rounded-2xl shadow-xl shadow-red-900/50 items-center"
                                >
                                    <Text className="text-white font-black uppercase italic tracking-widest">Continue</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    onPress={startMatch}
                                    className="flex-[2] bg-red-600 py-5 rounded-2xl shadow-xl shadow-red-900/50 flex-row items-center justify-center"
                                >
                                    <Icon name="play" size={24} color="white" />
                                    <Text className="text-white font-black uppercase italic tracking-widest ml-2">Start Game</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </GradientWrapper>
        </View>
    );
};

export default MatchSetupScreen;

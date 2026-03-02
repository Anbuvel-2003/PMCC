import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    StatusBar,
    StyleSheet
} from 'react-native';
import GradientWrapper from '../components/GradientWrapper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TeamCard = ({ name, members, captain, location, viceCaptain, navigation }) => (
    <View className="bg-white/5 p-5 rounded-3xl border border-white/10 mb-5">
        <View className="flex-row items-center justify-between mb-5">
            <View className="flex-row items-center flex-1">
                <View className="w-14 h-14 bg-red-600 rounded-full items-center justify-center mr-4 border-2 border-white/20 shadow-lg shadow-red-900/40">
                    <Text className="text-white font-black text-xl italic">{name.charAt(0)}</Text>
                </View>
                <View className="flex-1">
                    <Text className="text-white font-black text-lg italic uppercase tracking-tighter" numberOfLines={1}>{name}</Text>
                    <Text className="text-gray-400 text-xs font-bold">C: <Text className="text-white">{captain}</Text> {viceCaptain ? `| VC: ${viceCaptain}` : ''}</Text>
                </View>
            </View>
            <View className="items-end">
                <View className="flex-row items-center bg-white/5 px-2 py-1 rounded-full border border-white/10">
                    <Icon name="map-marker" size={12} color="#ef4444" />
                    <Text className="text-gray-400 text-[10px] ml-1 font-bold">{location.split(',')[0]}</Text>
                </View>
            </View>
        </View>

        <View className="border-t border-white/5 pt-4 flex-row justify-between items-center">
            <View className="flex-row items-center">
                <Icon name="account-group-outline" size={16} color="#64748b" />
                <Text className="text-gray-400 text-xs ml-2 font-bold">{members} Members</Text>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate('TeamDashboard', { team: { name, members, captain, location, viceCaptain } })}
                className="bg-white/5 px-4 py-2 rounded-full border border-white/10"
            >
                <Text className="text-red-500 text-[10px] font-black uppercase tracking-widest">Team Profile</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const TeamsScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [teams] = useState([
        { name: "Kings XI", members: "15", captain: "Anbu", location: "Tirupur, TN" },
        { name: "Red Warriors", members: "12", captain: "Sam", location: "Coimbatore, TN" },
        { name: "Strikers CC", members: "16", captain: "John", location: "Chennai, TN" },
        { name: "Victory Strikers", members: "11", captain: "Ram", location: "Madurai, TN" },
        { name: "Elite Cricket Club", members: "18", captain: "Vijay", location: "Salem, TN" },
    ]);

    const filteredTeams = teams.filter(team =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.captain.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View className="flex-1 bg-[#0f172a]" style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <GradientWrapper colors={['#0f172a', '#1e293b', '#0f172a']} style={{ flex: 1 }}>
                {/* Header with Search */}
                <View className="pt-14 pb-6 px-6">
                    <View className="flex-row items-center justify-between mb-6">
                        <View>
                            <Text className="text-white text-3xl font-black italic uppercase tracking-tighter">My Teams</Text>
                            <View className="h-1.5 w-16 bg-red-600 rounded-full mt-1" />
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('CreateTeam')}
                            className="bg-white/10 p-2.5 rounded-xl border border-white/10"
                        >
                            <Icon name="account-plus" size={24} color="#ef4444" />
                        </TouchableOpacity>
                    </View>

                    <View className="bg-white/5 flex-row items-center px-4 rounded-2xl h-14 border border-white/10">
                        <Icon name="magnify" size={24} color="#ef4444" />
                        <TextInput
                            className="flex-1 text-white ml-3 text-base"
                            placeholder="Find teams or captains..."
                            placeholderTextColor="#475569"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity onPress={() => setSearchQuery('')}>
                                <Icon name="close-circle" size={20} color="#64748b" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {/* List */}
                <ScrollView
                    className="flex-1 px-6"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                >
                    {filteredTeams.length > 0 ? (
                        filteredTeams.map((team, index) => (
                            <TeamCard key={index} {...team} navigation={navigation} />
                        ))
                    ) : (
                        <View className="items-center justify-center pt-20">
                            <View className="bg-white/5 p-8 rounded-full border border-white/10 mb-6">
                                <Icon name="account-search-outline" size={60} color="#475569" />
                            </View>
                            <Text className="text-gray-500 font-bold text-lg">No teams found in league</Text>
                        </View>
                    )}
                </ScrollView>
            </GradientWrapper>
        </View>
    );
};

export default TeamsScreen;

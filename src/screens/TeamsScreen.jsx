import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TeamCard = ({ name, members, captain, location }) => (
    <View className="bg-white p-4 rounded-2xl border border-gray-100 mb-4 shadow-sm">
        <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center flex-1">
                <View className="w-12 h-12 bg-red-100 rounded-full items-center justify-center mr-3">
                    <Text className="text-red-700 font-bold text-lg">{name.charAt(0)}</Text>
                </View>
                <View className="flex-1">
                    <Text className="text-gray-900 font-bold text-lg" numberOfLines={1}>{name}</Text>
                    <Text className="text-gray-500 text-xs">Captain: {captain}</Text>
                </View>
            </View>
            <View className="flex-row items-center ml-2">
                <Icon name="map-marker" size={14} color="#94a3b8" />
                <Text className="text-slate-400 text-xs ml-1">{location}</Text>
            </View>
        </View>

        <View className="border-t border-gray-50 pt-3 flex-row justify-between items-center">
            <Text className="text-gray-500 text-xs">{members} Members</Text>
            <TouchableOpacity>
                <Text className="text-teal-600 text-xs font-bold uppercase">View Members</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const TeamsScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const teams = [
        { name: "Kings XI", members: "15", captain: "Anbu", location: "Tirupur, TN" },
        { name: "Red Warriors", members: "12", captain: "Sam", location: "Coimbatore, TN" },
        { name: "Strikers CC", members: "16", captain: "John", location: "Chennai, TN" },
        { name: "Victory Strikers", members: "11", captain: "Ram", location: "Madurai, TN" },
        { name: "Elite Cricket Club", members: "18", captain: "Vijay", location: "Salem, TN" },
    ];

    const filteredTeams = teams.filter(team =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.captain.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View className="flex-1 bg-gray-50">
            {/* Top Section with Search */}
            <View className="bg-white pt-12 pb-4 px-4 border-b border-gray-100">
                <Text className="text-gray-900 text-2xl font-black mb-4">My Teams</Text>
                <View className="bg-gray-100 flex-row items-center px-4 rounded-2xl h-12">
                    <Icon name="magnify" size={22} color="#94a3b8" />
                    <TextInput
                        className="flex-1 text-gray-800 ml-2 text-base"
                        placeholder="Search teams or captains..."
                        placeholderTextColor="#94a3b8"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Icon name="close-circle" size={18} color="#94a3b8" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Scrollable Team List */}
            <ScrollView
                className="flex-1 px-4 pt-4"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {filteredTeams.length > 0 ? (
                    filteredTeams.map((team, index) => (
                        <TeamCard key={index} {...team} />
                    ))
                ) : (
                    <View className="items-center justify-center pt-20">
                        <Icon name="account-search-outline" size={60} color="#cbd5e1" />
                        <Text className="text-slate-400 mt-4 text-lg">No teams found</Text>
                    </View>
                )}
            </ScrollView>

            {/* Static Bottom Button */}
            <View className="absolute bottom-6 left-6 right-6">
                <TouchableOpacity
                    className="bg-teal-600 flex-row items-center justify-center p-4 rounded-2xl shadow-lg"
                    activeOpacity={0.8}
                >
                    <Icon name="plus-circle" size={24} color="white" />
                    <Text className="text-white font-bold ml-2 text-lg">Create New Team</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TeamsScreen;

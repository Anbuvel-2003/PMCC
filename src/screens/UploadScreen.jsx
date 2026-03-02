import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StatusBar, ScrollView } from 'react-native';
import GradientWrapper from '../components/GradientWrapper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const UploadScreen = () => {
    return (
        <View className="flex-1 bg-[#0f172a]" style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <GradientWrapper colors={['#0f172a', '#1e293b', '#0f172a']} style={{ flex: 1 }}>
                <View className="pt-16 pb-6 px-6">
                    <Text className="text-white text-3xl font-black italic uppercase tracking-tighter">Upload Highlights</Text>
                    <View className="h-1.5 w-16 bg-red-600 rounded-full mt-1" />
                </View>

                <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
                    <TouchableOpacity
                        className="w-full aspect-video bg-white/5 rounded-3xl items-center justify-center border-2 border-dashed border-white/10 mb-8 overflow-hidden"
                        activeOpacity={0.8}
                    >
                        <View className="bg-red-600/10 p-6 rounded-full border border-red-500/20">
                            <Icon name="video-plus-outline" size={40} color="#ef4444" />
                        </View>
                        <Text className="text-gray-400 font-bold mt-4 uppercase tracking-widest text-xs">Select Media</Text>
                        <Text className="text-gray-600 text-[10px] mt-1">MP4, MOV or JPEG</Text>
                    </TouchableOpacity>

                    <View className="bg-white/5 p-6 rounded-3xl border border-white/10">
                        <Text className="text-gray-500 text-[10px] font-black uppercase tracking-[3px] mb-3">Match Commentary</Text>
                        <TextInput
                            multiline
                            numberOfLines={4}
                            className="text-white text-base font-medium"
                            placeholder="Describe your epic moments..."
                            placeholderTextColor="#475569"
                            style={{ textAlignVertical: 'top', minHeight: 100 }}
                        />
                    </View>

                    <TouchableOpacity
                        className="bg-red-600 w-full py-5 rounded-2xl mt-10 flex-row items-center justify-center shadow-2xl shadow-red-900/50"
                        activeOpacity={0.9}
                    >
                        <Icon name="cloud-upload-outline" size={24} color="white" />
                        <Text className="text-white font-black ml-2 text-lg italic uppercase tracking-widest">Post Highlights</Text>
                    </TouchableOpacity>

                    <View className="h-32" />
                </ScrollView>
            </GradientWrapper>
        </View>
    );
};

export default UploadScreen;

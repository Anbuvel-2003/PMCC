import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const UploadScreen = () => {
    return (
        <View className="flex-1 bg-gray-50">
            <View className="bg-[#d32f2f] pt-12 pb-4 px-4">
                <Text className="text-white text-xl font-bold">Upload Highlights</Text>
            </View>
            <View className="p-6 items-center">
                <TouchableOpacity className="w-full aspect-video bg-gray-200 rounded-3xl items-center justify-center border-2 border-dashed border-gray-300 mb-6">
                    <Icon name="video-plus" size={48} color="#666" />
                    <Text className="text-gray-500 font-bold mt-2">Select Video or Photo</Text>
                </TouchableOpacity>

                <View className="w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                    <Text className="text-gray-400 text-[10px] font-bold uppercase mb-1">Description</Text>
                    <TextInput
                        multiline
                        numberOfLines={4}
                        className="text-gray-800 text-base"
                        placeholder="Write something about this match..."
                        placeholderTextColor="#999"
                        style={{ textAlignVertical: 'top' }}
                    />
                </View>

                <TouchableOpacity className="bg-teal-600 w-full py-4 rounded-2xl mt-8 flex-row items-center justify-center shadow-lg">
                    <Icon name="cloud-upload" size={20} color="white" />
                    <Text className="text-white font-bold ml-2 text-lg">Post to Feed</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default UploadScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Share, Modal, Alert, Dimensions } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withDelay,
    withTiming,
    FadeInDown,
    FadeInRight
} from 'react-native-reanimated';
import GradientWrapper from '../components/GradientWrapper';
import GlassButton from '../components/GlassButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import QRCode from 'react-native-qrcode-svg';

const { width } = Dimensions.get('window');

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const ProfileScreen = ({ navigation }) => {
    const [qrVisible, setQrVisible] = useState(false);
    const userName = "Anbu";
    const profileCode = `PLAYER-${userName.substring(0, 3).toUpperCase()}-777`;

    const onShare = async () => {
        try {
            await Share.share({
                message: `Check out my player profile on PMCC! Profile Code: ${profileCode}`,
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
                    <View className="flex-row items-center gap-4">
                        <View>
                            <Text className="text-white text-2xl font-black italic uppercase tracking-tighter">My Profile</Text>
                            <View className="h-1 w-12 bg-red-600 rounded-full mt-1" />
                        </View>
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

                <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
                    {/* User Hero Section */}
                    <Animated.View
                        entering={FadeInDown.duration(800).springify()}
                        className="items-center mb-10 pt-4"
                    >
                        <View className="relative">
                            {/* Inner Glow Effect */}
                            <View className="absolute inset-0 bg-red-600/20 blur-3xl rounded-full scale-150" />

                            <View className="w-32 h-32 rounded-[48px] bg-red-600 items-center justify-center border-4 border-white/20 shadow-2xl rotate-3">
                                <Text className="text-white text-6xl font-black italic -rotate-3">{userName.charAt(0)}</Text>
                            </View>
                            <TouchableOpacity className="absolute -bottom-1 -right-1 bg-slate-900 p-3 rounded-2xl border border-white/10 shadow-lg">
                                <Icon name="pencil" size={16} color="white" />
                            </TouchableOpacity>
                        </View>
                        <Text className="text-white text-4xl font-black italic mt-6 uppercase tracking-tighter shadow-lg">{userName}</Text>

                        <TouchableOpacity
                            onPress={copyToClipboard}
                            className="mt-3 bg-white/10 px-4 py-2 rounded-full border border-white/10 flex-row items-center"
                        >
                            <Text className="text-gray-300 text-[10px] font-black uppercase tracking-[3px] mr-2">{profileCode}</Text>
                            <Icon name="content-copy" size={12} color="#ef4444" />
                        </TouchableOpacity>

                        <Text className="text-red-500 font-bold tracking-[6px] text-[10px] uppercase mt-4">League Champion</Text>
                    </Animated.View>

                    {/* Player Performance Dashboard */}
                    <View className="mb-10">
                        <Animated.View
                            entering={FadeInDown.delay(200).duration(800)}
                            className="flex-row items-center justify-between mb-6"
                        >
                            <Text className="text-white text-xl font-black italic uppercase tracking-tighter">Performance</Text>
                            <View className="bg-red-600/10 px-3 py-1 rounded-full border border-red-500/20">
                                <Text className="text-red-500 text-[8px] font-black uppercase tracking-widest">Season 2026</Text>
                            </View>
                        </Animated.View>

                        <View className="flex-row flex-wrap -mx-2">
                            {[
                                { label: 'Matches', value: '24', icon: 'cricket', color: '#64748b' },
                                { label: 'Total Runs', value: '842', icon: 'run-fast', color: '#ef4444' },
                                { label: 'Sixes', value: '42', icon: 'star-outline', color: '#f59e0b' },
                                { label: 'Dot Balls', value: '156', icon: 'target', color: '#10b981' },
                            ].map((stat, idx) => (
                                <Animated.View
                                    key={idx}
                                    entering={FadeInDown.delay(400 + (idx * 100)).duration(600).springify()}
                                    className="w-1/2 px-2 mb-4"
                                >
                                    <View className="bg-white/5 p-5 rounded-[40px] border border-white/10 items-center overflow-hidden">
                                        <View className="absolute -top-4 -right-4 bg-white/5 p-8 rounded-full blur-2xl" />
                                        <View className="bg-white/10 p-4 rounded-3xl mb-3 border border-white/5">
                                            <Icon name={stat.icon} size={24} color={stat.color} />
                                        </View>
                                        <Text className="text-white text-2xl font-black italic">{stat.value}</Text>
                                        <Text className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-1">{stat.label}</Text>
                                    </View>
                                </Animated.View>
                            ))}
                        </View>
                    </View>

                    {/* My Accolades Section */}
                    <View className="mb-10">
                        <Animated.View
                            entering={FadeInDown.delay(800).duration(800)}
                            className="flex-row items-center justify-between mb-6"
                        >
                            <Text className="text-white text-xl font-black italic uppercase tracking-tighter">Accolades</Text>
                            <TouchableOpacity className="flex-row items-center">
                                <Text className="text-gray-500 text-[10px] font-black uppercase tracking-widest mr-1">View All</Text>
                                <Icon name="chevron-right" size={14} color="#475569" />
                            </TouchableOpacity>
                        </Animated.View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-6 px-6">
                            {[
                                { title: 'Player of the Match', count: '12', icon: 'trophy', color: '#f59e0b' },
                                { title: 'Century Milestone', count: '3', icon: 'shield-star', color: '#ef4444' },
                                { title: 'Top Scorer', count: '8', icon: 'medal', color: '#64748b' },
                            ].map((award, idx) => (
                                <Animated.View
                                    key={idx}
                                    entering={FadeInRight.delay(1000 + (idx * 200)).duration(800)}
                                    className="bg-white/5 p-7 rounded-[40px] border border-white/10 mr-4 items-center w-44"
                                >
                                    <View className="bg-red-600/10 p-5 rounded-[32px] mb-4 border border-red-500/10">
                                        <Icon name={award.icon} size={40} color={award.color} />
                                    </View>
                                    <View className="items-center">
                                        <Text className="text-white text-3xl font-black italic">{award.count}</Text>
                                        <Text className="text-gray-500 text-[10px] font-black uppercase tracking-widest text-center mt-2 leading-tight">{award.title}</Text>
                                    </View>
                                </Animated.View>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Quick Menu */}
                    <View className="space-y-4">
                        {[
                            { icon: 'account-edit-outline', label: 'Player Information' },
                            { icon: 'shield-lock-outline', label: 'Security Access', sub: 'Change Password' },
                            { icon: 'bell-ring-outline', label: 'Match Alerts', sub: 'Notifications' },
                            { icon: 'palette-outline', label: 'Theme Setup', sub: 'Dark / Light' },
                            { icon: 'help-circle-outline', label: 'League Support' },
                        ].map((item, index) => (
                            <AnimatedTouchableOpacity
                                key={index}
                                entering={FadeInDown.delay(1400 + (index * 100)).duration(600)}
                                className="bg-white/5 flex-row items-center p-5 rounded-[32px] border border-white/5 mb-3"
                                activeOpacity={0.7}
                            >
                                <View className="bg-white/10 p-3 rounded-2xl mr-4 border border-white/5">
                                    <Icon name={item.icon} size={22} color="#ef4444" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-white text-lg font-bold italic tracking-tight">{item.label}</Text>
                                    {item.sub && <Text className="text-gray-500 text-[10px] font-black uppercase tracking-[2px] mt-0.5">{item.sub}</Text>}
                                </View>
                                <Icon name="chevron-right" size={20} color="#475569" />
                            </AnimatedTouchableOpacity>
                        ))}
                    </View>

                    <Animated.View
                        entering={FadeInDown.delay(2000).duration(800)}
                        className="mt-8 mb-16"
                    >
                        <GlassButton
                            label="LEAVE STADIUM"
                            containerStyle="py-5 rounded-3xl bg-red-600/10 border border-red-500/20 shadow-2xl shadow-red-900/40"
                            textStyle="text-red-500 font-black tracking-[4px] uppercase text-xs"
                        />
                        <TouchableOpacity className="mt-8 items-center">
                            <Text className="text-gray-600 text-[10px] font-black uppercase tracking-[4px] border-b border-gray-800 pb-1">Delete Account</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </ScrollView>

                {/* QR Modal */}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={qrVisible}
                    onRequestClose={() => setQrVisible(false)}
                >
                    <View className="flex-1 bg-[#0f172a]">
                        <GradientWrapper colors={['#0f172a', '#1e293b', '#0f172a']} style={{ flex: 1 }}>
                            <View className="pt-16 pb-6 px-6 flex-row items-center justify-between">
                                <View className="flex-row items-center gap-4">
                                    <TouchableOpacity
                                        onPress={() => setQrVisible(false)}
                                        className="bg-white/5 p-3 rounded-2xl border border-white/10"
                                    >
                                        <Icon name="chevron-left" size={24} color="white" />
                                    </TouchableOpacity>
                                    <View>
                                        <Text className="text-white text-2xl font-black italic uppercase tracking-tighter">My QR Code</Text>
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

export default ProfileScreen;

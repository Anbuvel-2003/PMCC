import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import GradientWrapper from '../components/GradientWrapper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, { Circle, Line, Rect, G, Text as SvgText } from 'react-native-svg';

const { width } = Dimensions.get('window');

const ManhattanChart = () => {
    // Dummy over-by-over data
    const data = [4, 8, 12, 6, 15, 9, 7, 11];
    const maxVal = Math.max(...data);
    const chartHeight = 120;
    const barWidth = 20;
    const gap = 12;

    return (
        <View className="items-center py-6">
            <Text className="text-gray-500 font-black uppercase tracking-[3px] text-[9px] mb-6">Manhattan Chart (Runs Per Over)</Text>
            <Svg width={data.length * (barWidth + gap)} height={chartHeight + 20}>
                {data.map((val, i) => {
                    const h = (val / maxVal) * chartHeight;
                    return (
                        <G key={i}>
                            <Rect
                                x={i * (barWidth + gap)}
                                y={chartHeight - h}
                                width={barWidth}
                                height={h}
                                fill={i % 2 === 0 ? "#ef4444" : "#475569"}
                                rx="4"
                            />
                            <SvgText
                                x={i * (barWidth + gap) + barWidth / 2}
                                y={chartHeight + 15}
                                fill="#64748b"
                                fontSize="10"
                                fontWeight="bold"
                                textAnchor="middle"
                            >
                                {i + 1}
                            </SvgText>
                        </G>
                    );
                })}
            </Svg>
        </View>
    );
};

const AnalyticalHitMap = () => {
    const size = width * 0.7;
    const center = size / 2;
    const radius = size * 0.4;

    return (
        <View className="items-center py-6">
            <Text className="text-gray-500 font-black uppercase tracking-[3px] text-[9px] mb-6">360° Field Scoring Pattern</Text>
            <Svg width={size} height={size}>
                <Circle cx={center} cy={center} r={radius} stroke="#1e293b" strokeWidth="2" fill="#0f172a" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                    const x = center + radius * Math.cos((angle * Math.PI) / 180);
                    const y = center + radius * Math.sin((angle * Math.PI) / 180);
                    return <Line key={i} x1={center} y1={center} x2={x} y2={y} stroke="#1e293b" strokeWidth="1" strokeDasharray="4,2" />;
                })}
                {/* Dummy hits cluster */}
                {[30, 150, 220, 310].map((angle, i) => (
                    <Circle
                        key={i}
                        cx={center + (radius - 20) * Math.cos((angle * Math.PI) / 180)}
                        cy={center + (radius - 20) * Math.sin((angle * Math.PI) / 180)}
                        r="6"
                        fill="#ef4444"
                        opacity="0.8"
                    />
                ))}
            </Svg>
        </View>
    );
};

const AnalyticsScreen = ({ navigation }) => {
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
                        <Text className="text-white text-xl font-black italic uppercase tracking-tighter">Match Analytics</Text>
                        <View className="h-1 w-8 bg-red-600 rounded-full mt-1" />
                    </View>
                    <TouchableOpacity className="bg-white/5 p-3 rounded-2xl border border-white/10">
                        <Icon name="share-variant" size={20} color="#ef4444" />
                    </TouchableOpacity>
                </View>

                <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                    {/* Manhattan Chart */}
                    <View className="mx-6 bg-white/5 rounded-[40px] border border-white/10 p-6 mb-6">
                        <ManhattanChart />
                    </View>

                    {/* 360 Hit Map */}
                    <View className="mx-6 bg-white/5 rounded-[40px] border border-white/10 p-6 mb-6">
                        <AnalyticalHitMap />
                    </View>

                    {/* Partnership Section */}
                    <View className="mx-6 bg-red-600/5 rounded-[40px] border border-red-500/10 p-8 mb-20">
                        <Text className="text-red-500 text-[10px] font-black uppercase tracking-[3px] mb-6 text-center">Top Partnership</Text>
                        <View className="flex-row items-center justify-between">
                            <View className="items-center">
                                <View className="w-12 h-12 rounded-full bg-white/5 items-center justify-center border border-white/10">
                                    <Text className="text-white font-black italic">A</Text>
                                </View>
                                <Text className="text-white text-[10px] font-bold mt-2">Anbu</Text>
                            </View>
                            <View className="items-center flex-1 mx-4">
                                <Text className="text-white text-2xl font-black italic">84</Text>
                                <Text className="text-gray-500 text-[8px] font-black uppercase tracking-widest mt-1">Runs (52 Balls)</Text>
                                <View className="h-[2px] w-full bg-red-600/20 mt-4 rounded-full" />
                            </View>
                            <View className="items-center">
                                <View className="w-12 h-12 rounded-full bg-white/5 items-center justify-center border border-white/10">
                                    <Text className="text-white font-black italic">V</Text>
                                </View>
                                <Text className="text-white text-[10px] font-bold mt-2">Vel</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </GradientWrapper>
        </View>
    );
};

export default AnalyticsScreen;

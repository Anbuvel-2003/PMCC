import React from 'react';
import { TouchableOpacity, Text, View, Platform } from 'react-native';
import { BlurView } from '@react-native-community/blur';

const GlassButton = ({
    onPress,
    children,
    containerStyle = "px-6 py-4 rounded-2xl overflow-hidden border border-white/20",
    textStyle = "text-white font-semibold text-center text-lg",
    label
}) => {
    const isIOS = Platform.OS === 'ios';

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            className={`relative ${containerStyle}`}
        >
            {isIOS ? (
                <BlurView
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                    blurType="light"
                    blurAmount={10}
                />
            ) : (
                <View
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                    className="bg-white/10"
                />
            )}
            <View className="items-center justify-center">
                {label ? <Text className={textStyle}>{label}</Text> : children}
            </View>
        </TouchableOpacity>
    );
};

export default GlassButton;

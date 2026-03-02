import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';

const GlassButton = ({
    onPress,
    children,
    containerStyle = "px-6 py-4 rounded-2xl overflow-hidden border border-white/20",
    textStyle = "text-white font-semibold text-center text-lg",
    label,
    disabled = false
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            disabled={disabled}
            className={`relative ${containerStyle} ${disabled ? 'opacity-50' : ''}`}
        >
            <BlurView
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                blurType="light"
                blurAmount={15}
                overlayColor="rgba(255, 255, 255, 0.1)"
            />
            <LinearGradient
                colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)', 'transparent']}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '50%' }}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            />
            <View className="items-center justify-center">
                {label ? <Text className={textStyle}>{label}</Text> : children}
            </View>
        </TouchableOpacity>
    );
};

export default GlassButton;

import React, { useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withDelay,
    withSequence,
    withTiming
} from 'react-native-reanimated';
import GradientWrapper from '../components/GradientWrapper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
    const scale = useSharedValue(0.3);
    const opacity = useSharedValue(0);
    const textOpacity = useSharedValue(0);

    useEffect(() => {
        scale.value = withSpring(1);
        opacity.value = withTiming(1, { duration: 1000 });
        textOpacity.value = withDelay(800, withTiming(1, { duration: 800 }));

        // Navigate to Login after 3 seconds
        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const logoStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    const textStyle = useAnimatedStyle(() => ({
        opacity: textOpacity.value,
        marginTop: 20,
    }));

    return (
        <GradientWrapper className="items-center justify-center">
            <Animated.View style={[logoStyle]} className="bg-white/20 p-8 rounded-[40px] border border-white/30">
                <Icon name="atom" size={100} color="#60a5fa" />
            </Animated.View>

            <Animated.View style={textStyle}>
                <Text className="text-white text-4xl font-bold tracking-widest text-center">
                    PMCC
                </Text>
                <Text className="text-blue-300 text-lg font-light tracking-[8px] text-center mt-2 uppercase">
                    Innovation
                </Text>
            </Animated.View>

            <View className="absolute bottom-12 w-full items-center">
                <Text className="text-white/40 text-xs uppercase tracking-widest">
                    Powered by Advanced Tech
                </Text>
            </View>
        </GradientWrapper>
    );
};

export default SplashScreen;

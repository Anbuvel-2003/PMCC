import React, { useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withDelay,
    withSequence,
    withTiming,
    interpolate,
    Extrapolate
} from 'react-native-reanimated';
import GradientWrapper from '../components/GradientWrapper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
    const ballScale = useSharedValue(0);
    const ballY = useSharedValue(-200);
    const ballOpacity = useSharedValue(0);
    const textOpacity = useSharedValue(0);
    const textY = useSharedValue(20);
    const lightOpacity = useSharedValue(0);

    useEffect(() => {
        // Animation Sequence
        ballY.value = withSequence(
            withTiming(0, { duration: 800 }),
            withSpring(0, { damping: 10, stiffness: 100 })
        );
        ballScale.value = withSpring(1, { damping: 12 });
        ballOpacity.value = withTiming(1, { duration: 600 });

        lightOpacity.value = withDelay(400, withTiming(0.15, { duration: 1000 }));

        textOpacity.value = withDelay(1000, withTiming(1, { duration: 800 }));
        textY.value = withDelay(1000, withSpring(0));

        // Check auth status and navigate after 3.5 seconds
        const timer = setTimeout(() => {
            const user = auth().currentUser;
            if (user) {
                navigation.replace('Main');
            } else {
                navigation.replace('Login');
            }
        }, 3500);

        return () => clearTimeout(timer);
    }, []);

    const ballAnimatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: ballY.value },
            { scale: ballScale.value }
        ],
        opacity: ballOpacity.value,
    }));

    const textAnimatedStyle = useAnimatedStyle(() => ({
        opacity: textOpacity.value,
        transform: [{ translateY: textY.value }],
    }));

    const lightStyle = useAnimatedStyle(() => ({
        opacity: lightOpacity.value,
    }));

    return (
        <View style={styles.container}>
            {/* Dark background with a hint of field green and stadium red */}
            <GradientWrapper colors={['#0f172a', '#1e293b', '#0f172a']} style={styles.gradient}>

                {/* Stadium Light Rays Effect */}
                <Animated.View style={[styles.lightRay, styles.lightRay1, lightStyle]} />
                <Animated.View style={[styles.lightRay, styles.lightRay2, lightStyle]} />

                <View className="items-center justify-center">
                    <Animated.View
                        style={[ballAnimatedStyle]}
                        className="bg-red-600 p-10 rounded-full border-4 border-white/20 shadow-2xl shadow-red-900"
                    >
                        <Icon name="cricket" size={100} color="white" />
                        {/* Stitching detail emulator using absolute positioned lines could be added if needed */}
                    </Animated.View>

                    <Animated.View style={[textAnimatedStyle, { marginTop: 40 }]}>
                        <Text className="text-white text-5xl font-black tracking-tighter text-center italic">
                            PMCC
                        </Text>
                        <View className="h-1 w-20 bg-red-600 self-center mt-1 rounded-full" />
                        <Text className="text-gray-400 text-sm font-bold tracking-[10px] text-center mt-4 uppercase">
                            Cricket Pro
                        </Text>
                    </Animated.View>
                </View>

                <Animated.View
                    style={[textAnimatedStyle, styles.footer]}
                >
                    <Text className="text-white/30 text-[10px] uppercase font-bold tracking-[4px]">
                        Premium Cricket Experience
                    </Text>
                </Animated.View>
            </GradientWrapper>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lightRay: {
        position: 'absolute',
        width: width * 1.5,
        height: 100,
        backgroundColor: 'white',
        top: -50,
    },
    lightRay1: {
        left: -width / 2,
        transform: [{ rotate: '45deg' }],
    },
    lightRay2: {
        right: -width / 2,
        transform: [{ rotate: '-45deg' }],
    },
    footer: {
        position: 'absolute',
        bottom: 50,
        width: '100%',
        alignItems: 'center',
    }
});

export default SplashScreen;

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    StatusBar,
    Alert
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    withDelay,
} from 'react-native-reanimated';
import GradientWrapper from '../components/GradientWrapper';
import GlassButton from '../components/GlassButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const { width } = Dimensions.get('window');

// Configure Google Sign-In
GoogleSignin.configure({
    webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com', // Replace with your web client ID from Firebase console
});

// Validation Schema
const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

const LoginScreen = ({ navigation }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    // Animation Values
    const formOpacity = useSharedValue(0);
    const formY = useSharedValue(30);
    const logoScale = useSharedValue(0.5);
    const lightOpacity = useSharedValue(0);

    useEffect(() => {
        formOpacity.value = withDelay(400, withTiming(1, { duration: 800 }));
        formY.value = withDelay(400, withSpring(0));
        logoScale.value = withSpring(1);
        lightOpacity.value = withDelay(200, withTiming(0.15, { duration: 1500 }));
    }, []);

    const handleLogin = async (values) => {
        setLoading(true);
        try {
            await auth().signInWithEmailAndPassword(values.email.trim(), values.password);
            navigation.replace('Main');
        } catch (error) {
            console.error(error);
            Alert.alert('Login Failed', error.message);
        } finally {
            setLoading(false);
        }
    };

    const onGoogleButtonPress = async () => {
        setLoading(true);
        try {
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            await auth().signInWithCredential(googleCredential);
            navigation.replace('Main');
        } catch (error) {
            console.error(error);
            Alert.alert('Google Sign-In Failed', error.message);
        } finally {
            setLoading(false);
        }
    };

    const logoAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: logoScale.value }],
    }));

    const formAnimatedStyle = useAnimatedStyle(() => ({
        opacity: formOpacity.value,
        transform: [{ translateY: formY.value }],
    }));

    const lightStyle = useAnimatedStyle(() => ({
        opacity: lightOpacity.value,
    }));

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <GradientWrapper colors={['#0f172a', '#1e293b', '#0f172a']} style={styles.gradient}>

                {/* Stadium Light Rays (Reference from Splash) */}
                <Animated.View style={[styles.lightRay, styles.lightRay1, lightStyle]} />
                <Animated.View style={[styles.lightRay, styles.lightRay2, lightStyle]} />

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={LoginSchema}
                    onSubmit={handleLogin}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            className="flex-1 justify-center px-8"
                        >
                            <Animated.View style={[logoAnimatedStyle, { alignItems: 'center', marginBottom: 48 }]}>
                                <View className="bg-red-600 p-6 rounded-full border-4 border-white/20 shadow-2xl shadow-red-900">
                                    <Icon name="cricket" size={60} color="white" />
                                </View>
                                <View className="mt-4 items-center">
                                    <Text className="text-white text-4xl font-black tracking-tighter italic">
                                        PMCC
                                    </Text>
                                    <View className="h-1 w-12 bg-red-600 rounded-full mt-1" />
                                    <Text className="text-gray-400 text-[10px] font-bold tracking-[8px] uppercase mt-2">
                                        Welcome Back
                                    </Text>
                                </View>
                            </Animated.View>

                            <Animated.View style={formAnimatedStyle} className="space-y-6">
                                <View>
                                    <Text className="text-gray-400 mb-2 ml-1 text-[10px] uppercase tracking-[3px] font-bold">Mobile / Email</Text>
                                    <View className={`bg-white/5 flex-row items-center px-4 rounded-2xl border ${touched.email && errors.email ? 'border-red-500' : 'border-white/10'} h-16`}>
                                        <Icon name="account-outline" size={24} color="#ef4444" />
                                        <TextInput
                                            className="flex-1 text-white ml-3 text-base"
                                            placeholder="Enter identifier"
                                            placeholderTextColor="#475569"
                                            value={values.email}
                                            onChangeText={(text) => setFieldValue('email', text.toLowerCase())}
                                            onBlur={handleBlur('email')}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                        />
                                    </View>
                                    {touched.email && errors.email && (
                                        <Text className="text-red-500 text-[10px] mt-1 ml-1 font-bold italic">{errors.email}</Text>
                                    )}
                                </View>

                                <View className="mt-4">
                                    <Text className="text-gray-400 mb-2 ml-1 text-[10px] uppercase tracking-[3px] font-bold">Secure Access</Text>
                                    <View className={`bg-white/5 flex-row items-center px-4 rounded-2xl border ${touched.password && errors.password ? 'border-red-500' : 'border-white/10'} h-16`}>
                                        <Icon name="lock-outline" size={24} color="#ef4444" />
                                        <TextInput
                                            className="flex-1 text-white ml-3 text-base"
                                            placeholder="••••••••"
                                            placeholderTextColor="#475569"
                                            value={values.password}
                                            secureTextEntry={!showPassword}
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                        />
                                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                            <Icon
                                                name={showPassword ? "eye-outline" : "eye-off-outline"}
                                                size={22}
                                                color="#475569"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    {touched.password && errors.password && (
                                        <Text className="text-red-500 text-[10px] mt-1 ml-1 font-bold italic">{errors.password}</Text>
                                    )}
                                </View>

                                <TouchableOpacity className="items-end mt-2">
                                    <Text className="text-red-500 font-bold text-sm">Forgot Password?</Text>
                                </TouchableOpacity>

                                <View className="mt-10">
                                    <GlassButton
                                        onPress={handleSubmit}
                                        label={loading ? "LOGGING IN..." : "LOGIN"}
                                        containerStyle="py-5 rounded-2xl overflow-hidden border border-red-500/50 bg-red-600/20 shadow-xl shadow-red-900/40"
                                        textStyle="text-white font-bold text-center text-base tracking-wide uppercase"
                                        disabled={loading}
                                    />
                                </View>

                                <View className="mt-6">
                                    <TouchableOpacity
                                        onPress={onGoogleButtonPress}
                                        className="flex-row items-center justify-center bg-white py-4 rounded-2xl border border-gray-200 shadow-sm"
                                        disabled={loading}
                                    >
                                        <Icon name="google" size={20} color="#DB4437" />
                                        <Text className="text-gray-800 font-bold ml-3 text-base tracking-wide">
                                            Continue with Google
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </Animated.View>

                            <Animated.View
                                style={[formAnimatedStyle, { marginTop: 40, alignItems: 'center' }]}
                            >
                                <View className="flex-row">
                                    <Text className="text-gray-500 font-medium">New to the League? </Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                        <Text className="text-red-500 font-bold text-base tracking-wide capitalize">Register</Text>
                                    </TouchableOpacity>
                                </View>
                            </Animated.View>
                        </KeyboardAvoidingView>
                    )}
                </Formik>
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
});

export default LoginScreen;

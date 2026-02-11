import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import GradientWrapper from '../components/GradientWrapper';
import GlassButton from '../components/GlassButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Basic navigation to Home (Main Drawer)
        navigation.replace('Main');
    };

    return (
        <GradientWrapper>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1 justify-center px-8"
            >
                <View className="items-center mb-12">
                    <View className="bg-blue-500/20 p-4 rounded-3xl mb-4 border border-blue-400/30">
                        <Icon name="shield-lock" size={60} color="#60a5fa" />
                    </View>
                    <Text className="text-white text-3xl font-bold">Welcome Back</Text>
                    <Text className="text-slate-400 mt-2">Sign in to continue your journey</Text>
                </View>

                <View className="space-y-6">
                    <View>
                        <Text className="text-slate-400 mb-2 ml-1 text-xs uppercase tracking-widest font-bold">Email Address</Text>
                        <View className="bg-white/10 flex-row items-center px-4 rounded-2xl border border-white/10 h-16">
                            <Icon name="email-outline" size={24} color="#94a3b8" />
                            <TextInput
                                className="flex-1 text-white ml-3 text-lg"
                                placeholder="hello@example.com"
                                placeholderTextColor="#64748b"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    <View className="mt-4">
                        <Text className="text-slate-400 mb-2 ml-1 text-xs uppercase tracking-widest font-bold">Password</Text>
                        <View className="bg-white/10 flex-row items-center px-4 rounded-2xl border border-white/10 h-16">
                            <Icon name="lock-outline" size={24} color="#94a3b8" />
                            <TextInput
                                className="flex-1 text-white ml-3 text-lg"
                                placeholder="••••••••"
                                placeholderTextColor="#64748b"
                                value={password}
                                secureTextEntry
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity>
                                <Icon name="eye-off-outline" size={22} color="#64748b" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity className="items-end mt-2">
                        <Text className="text-blue-400 font-medium">Forgot Password?</Text>
                    </TouchableOpacity>

                    <View className="mt-10">
                        <GlassButton
                            onPress={handleLogin}
                            label="Sign In"
                            containerStyle="py-5 rounded-2xl overflow-hidden border border-blue-400/30 bg-blue-600/20"
                        />
                    </View>
                </View>

                <View className="flex-row justify-center items-center mt-12">
                    <Text className="text-slate-400">Don't have an account? </Text>
                    <TouchableOpacity>
                        <Text className="text-blue-400 font-bold">Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </GradientWrapper>
    );
};

export default LoginScreen;

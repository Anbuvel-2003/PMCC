import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Dimensions,
    Alert,
    StyleSheet,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Dropdown } from 'react-native-element-dropdown';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    runOnJS,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GradientWrapper from '../components/GradientWrapper';
import GlassButton from '../components/GlassButton';

import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import BarcodeMask from 'react-native-barcode-mask';

const { width, height } = Dimensions.get('window');

// Step 1 Validation Schema
const Step1Schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    age: Yup.number().required('Age is required').min(5, 'Invalid age'),
    gender: Yup.string().required('Gender is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string()
        .matches(/^[0-9]+$/, 'Must be only digits')
        .length(10, 'Must be exactly 10 digits')
        .required('Phone number is required'),
    password: Yup.string().min(6, 'Min 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
});

// Step 2 Validation Schema (teamCode is now optional)
const Step2Schema = Yup.object().shape({
    teamCode: Yup.string(),
});

const genderData = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
];

const ageData = Array.from({ length: 96 }, (_, i) => ({
    label: (i + 5).toString(),
    value: (i + 5).toString(),
}));

const RegisterScreen = ({ navigation }) => {
    const [step, setStep] = useState(1);
    const [showScanner, setShowScanner] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const formikRef = useRef(null);
    const formOpacity = useSharedValue(1);

    // Camera Setup (Safely)
    const device = useCameraDevice('back');

    // Safely initialize code scanner
    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {
            if (codes.length > 0) {
                const value = codes[0].value;
                formikRef.current?.setFieldValue('teamCode', value);
                setShowScanner(false);
                Alert.alert('Scan Success', `Team Code: ${value}`);
            }
        }
    });

    // Permission check
    const requestPermission = async () => {
        try {
            const permission = await Camera.requestCameraPermission();
            if (permission === 'denied') {
                Alert.alert('Permission Required', 'Camera access is needed to scan QR codes.');
                return false;
            }
            return true;
        } catch (error) {
            console.error('Camera permission error:', error);
            return false;
        }
    };

    const toggleScanner = async () => {
        if (!showScanner) {
            const hasPermission = await requestPermission();
            if (hasPermission) setShowScanner(true);
        } else {
            setShowScanner(false);
        }
    };

    const nextStep = () => {
        formOpacity.value = withTiming(0, { duration: 300 }, () => {
            runOnJS(setStep)(2);
            formOpacity.value = withTiming(1, { duration: 300 });
        });
    };

    const prevStep = () => {
        formOpacity.value = withTiming(0, { duration: 300 }, () => {
            runOnJS(setStep)(1);
            formOpacity.value = withTiming(1, { duration: 300 });
        });
    };

    const animatedFormStyle = useAnimatedStyle(() => ({
        opacity: formOpacity.value,
    }));

    const renderInput = (label, icon, field, formikProps, extraProps = {}) => {
        const isPassword = field === 'password' || field === 'confirmPassword';
        const isSecure = isPassword ? (field === 'password' ? !showPassword : !showConfirmPassword) : false;

        return (
            <View className="mb-4">
                <Text className="text-gray-400 mb-2 ml-1 text-[10px] uppercase tracking-[2px] font-bold">{label}</Text>
                <View
                    className={`bg-white/5 flex-row items-center px-4 rounded-2xl border ${formikProps.touched[field] && formikProps.errors[field] ? 'border-red-500' : 'border-white/10'} h-14`}
                    style={{ height: 56 }}
                >
                    <Icon name={icon} size={20} color="#ef4444" />
                    <TextInput
                        className="flex-1 text-white ml-3 text-sm"
                        placeholderTextColor="#475569"
                        value={formikProps.values[field]}
                        onChangeText={field === 'email' ? (text) => formikProps.setFieldValue(field, text.toLowerCase()) : formikProps.handleChange(field)}
                        onBlur={formikProps.handleBlur(field)}
                        secureTextEntry={isSecure}
                        {...extraProps}
                    />
                    {isPassword && (
                        <TouchableOpacity
                            onPress={() => {
                                if (field === 'password') setShowPassword(!showPassword);
                                else setShowConfirmPassword(!showConfirmPassword);
                            }}
                            className="ml-2"
                        >
                            <Icon
                                name={(field === 'password' ? showPassword : showConfirmPassword) ? 'eye-off-outline' : 'eye-outline'}
                                size={20}
                                color="#475569"
                            />
                        </TouchableOpacity>
                    )}
                </View>
                {formikProps.touched[field] && formikProps.errors[field] && (
                    <Text className="text-red-500 text-[9px] mt-1 ml-1 font-bold italic">{formikProps.errors[field]}</Text>
                )}
            </View>
        );
    };

    if (showScanner && device) {
        return (
            <View className="flex-1 bg-black">
                <Camera
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={true}
                    codeScanner={codeScanner}
                />
                <BarcodeMask edgeColor="#ef4444" showAnimatedLine={true} />
                <TouchableOpacity
                    onPress={() => setShowScanner(false)}
                    className="absolute top-16 left-6 bg-white/10 p-4 rounded-full border border-white/20"
                >
                    <Icon name="close" size={24} color="white" />
                </TouchableOpacity>
                <View className="absolute bottom-20 w-full items-center">
                    <Text className="text-white font-bold text-lg bg-black/50 px-6 py-3 rounded-2xl overflow-hidden">
                        Scan Team QR Code
                    </Text>
                </View>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-[#0f172a]" style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <GradientWrapper colors={['#0f172a', '#1e293b', '#0f172a']} style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    className="flex-1"
                    style={{ flex: 1 }}
                >
                    <View className="pt-16 pb-6 px-6 flex-row items-center">
                        <TouchableOpacity
                            onPress={() => step === 1 ? navigation.goBack() : prevStep()}
                            className="bg-white/5 p-3 rounded-2xl border border-white/10"
                        >
                            <Icon name="chevron-left" size={24} color="white" />
                        </TouchableOpacity>
                        <View className="ml-4">
                            <Text className="text-white text-2xl font-black italic uppercase tracking-tighter">
                                {step === 1 ? 'Player Info' : 'Team Info'}
                            </Text>
                            <View className="h-1 w-12 bg-red-600 rounded-full mt-1" />
                        </View>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-8">
                        <Animated.View style={animatedFormStyle}>
                            <Formik
                                innerRef={formikRef}
                                initialValues={{
                                    name: '',
                                    age: '',
                                    gender: '',
                                    email: '',
                                    phone: '',
                                    password: '',
                                    confirmPassword: '',
                                    teamCode: '',
                                }}
                                validationSchema={step === 1 ? Step1Schema : Step2Schema}
                                onSubmit={(values) => {
                                    if (step === 1) {
                                        nextStep();
                                    } else {
                                        // Final submission
                                        Alert.alert('Registration Complete', 'Welcome to the League!', [
                                            { text: 'OK', onPress: () => navigation.replace('Main') }
                                        ]);
                                    }
                                }}
                            >
                                {(formikProps) => (
                                    <View className="pb-20">
                                        {step === 1 ? (
                                            <>
                                                {renderInput('Full Name', 'account-outline', 'name', formikProps, { placeholder: 'Enter your name' })}
                                                <View className="flex-row justify-between mb-4">
                                                    <View style={{ width: '48%' }}>
                                                        <Text className="text-gray-400 mb-2 ml-1 text-[10px] uppercase tracking-[2px] font-bold">Age</Text>
                                                        <Dropdown
                                                            style={[
                                                                styles.dropdown,
                                                                formikProps.touched.age && formikProps.errors.age && styles.dropdownError
                                                            ]}
                                                            placeholderStyle={styles.placeholderStyle}
                                                            selectedTextStyle={styles.selectedTextStyle}
                                                            inputSearchStyle={styles.inputSearchStyle}
                                                            iconStyle={styles.iconStyle}
                                                            containerStyle={styles.dropdownContainer}
                                                            itemTextStyle={styles.itemTextStyle}
                                                            activeColor="rgba(239, 68, 68, 0.2)"
                                                            data={ageData}
                                                            maxHeight={300}
                                                            labelField="label"
                                                            valueField="value"
                                                            placeholder="Select"
                                                            value={formikProps.values.age}
                                                            onChange={item => {
                                                                formikProps.setFieldValue('age', item.value);
                                                            }}
                                                            renderLeftIcon={() => (
                                                                <Icon style={styles.icon} color="#ef4444" name="calendar-outline" size={20} />
                                                            )}
                                                        />
                                                        {formikProps.touched.age && formikProps.errors.age && (
                                                            <Text className="text-red-500 text-[9px] mt-1 ml-1 font-bold italic">{formikProps.errors.age}</Text>
                                                        )}
                                                    </View>
                                                    <View style={{ width: '48%' }}>
                                                        <Text className="text-gray-400 mb-2 ml-1 text-[10px] uppercase tracking-[2px] font-bold">Gender</Text>
                                                        <Dropdown
                                                            style={[
                                                                styles.dropdown,
                                                                formikProps.touched.gender && formikProps.errors.gender && styles.dropdownError
                                                            ]}
                                                            placeholderStyle={styles.placeholderStyle}
                                                            selectedTextStyle={styles.selectedTextStyle}
                                                            inputSearchStyle={styles.inputSearchStyle}
                                                            iconStyle={styles.iconStyle}
                                                            containerStyle={styles.dropdownContainer}
                                                            itemTextStyle={styles.itemTextStyle}
                                                            activeColor="rgba(239, 68, 68, 0.2)"
                                                            data={genderData}
                                                            maxHeight={300}
                                                            labelField="label"
                                                            valueField="value"
                                                            placeholder="Select"
                                                            value={formikProps.values.gender}
                                                            onChange={item => {
                                                                formikProps.setFieldValue('gender', item.value);
                                                            }}
                                                            renderLeftIcon={() => (
                                                                <Icon style={styles.icon} color="#ef4444" name="account-group-outline" size={20} />
                                                            )}
                                                        />
                                                        {formikProps.touched.gender && formikProps.errors.gender && (
                                                            <Text className="text-red-500 text-[9px] mt-1 ml-1 font-bold italic">{formikProps.errors.gender}</Text>
                                                        )}
                                                    </View>
                                                </View>
                                                {renderInput('Email Address', 'email-outline', 'email', formikProps, { placeholder: 'you@example.com', autoCapitalize: 'none' })}
                                                {renderInput('Phone Number', 'phone-outline', 'phone', formikProps, { placeholder: '1234567890', keyboardType: 'phone-pad', maxLength: 10 })}
                                                {renderInput('Password', 'lock-outline', 'password', formikProps, { placeholder: '••••••••' })}
                                                {renderInput('Confirm Password', 'lock-check-outline', 'confirmPassword', formikProps, { placeholder: '••••••••' })}

                                                <View className="mt-8">
                                                    <GlassButton
                                                        onPress={formikProps.handleSubmit}
                                                        label="NEXT: TEAM SELECTION"
                                                        containerStyle="py-5 rounded-2xl overflow-hidden border border-red-500/50 bg-red-600/20 shadow-xl"
                                                        textStyle="text-white font-bold text-center text-base tracking-wide uppercase"
                                                    />
                                                </View>
                                            </>
                                        ) : (
                                            <View className="mt-4">
                                                <Text className="text-gray-400 mb-6 text-sm text-center">
                                                    Connect with your squad to start playing. Join an existing team or create your own.
                                                </Text>

                                                {/* Join by Code */}
                                                <View className="mb-2">
                                                    <Text className="text-gray-400 mb-2 ml-1 text-[10px] uppercase tracking-[2px] font-bold">Join via Code</Text>
                                                    <View className={`bg-white/5 flex-row items-center px-4 rounded-2xl border ${formikProps.touched.teamCode && formikProps.errors.teamCode ? 'border-red-500' : 'border-white/10'} h-16`}>
                                                        <Icon name="tag-outline" size={24} color="#ef4444" />
                                                        <TextInput
                                                            className="flex-1 text-white ml-3 text-lg font-bold tracking-widest"
                                                            placeholder="ENTER TEAM CODE"
                                                            placeholderTextColor="#475569"
                                                            value={formikProps.values.teamCode}
                                                            onChangeText={(text) => formikProps.setFieldValue('teamCode', text.toUpperCase())}
                                                            onBlur={formikProps.handleBlur('teamCode')}
                                                            autoCapitalize="characters"
                                                        />
                                                    </View>
                                                    {formikProps.touched.teamCode && formikProps.errors.teamCode && (
                                                        <Text className="text-red-500 text-[9px] mt-1 ml-1 font-bold italic">{formikProps.errors.teamCode}</Text>
                                                    )}
                                                </View>

                                                {/* Scan to Join */}
                                                <TouchableOpacity
                                                    onPress={async () => {
                                                        const hasPermission = await requestPermission();
                                                        if (hasPermission) {
                                                            setShowScanner(true);
                                                        }
                                                    }}
                                                    className="bg-white/5 border border-white/10 py-8 rounded-3xl items-center justify-center mb-8 border-dashed"
                                                >
                                                    <View className="bg-red-600/20 p-4 rounded-full mb-3">
                                                        <Icon name="qrcode-scan" size={32} color="#ef4444" />
                                                    </View>
                                                    <Text className="text-white font-black text-sm uppercase tracking-[2px]">Scan Team QR</Text>
                                                    <Text className="text-gray-500 text-[10px] mt-1">Instant Squad Connection</Text>
                                                </TouchableOpacity>

                                                <GlassButton
                                                    onPress={formikProps.handleSubmit}
                                                    label="COMPLETE REGISTRATION"
                                                    containerStyle="py-5 rounded-2xl overflow-hidden border border-red-500/50 bg-red-600/20 shadow-xl"
                                                    textStyle="text-white font-bold text-center text-base tracking-wide uppercase"
                                                />

                                                <TouchableOpacity
                                                    onPress={() => {
                                                        Alert.alert(
                                                            'Register Without Team?',
                                                            'You can always join a team later from your profile settings.',
                                                            [
                                                                { text: 'Cancel', style: 'cancel' },
                                                                {
                                                                    text: 'Yes, Register',
                                                                    onPress: () => navigation.replace('Main')
                                                                }
                                                            ]
                                                        );
                                                    }}
                                                    className="mt-6 self-center"
                                                >
                                                    <Text className="text-gray-500 font-bold text-[10px] uppercase tracking-[2px] opacity-60">Skip For Now</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    </View>
                                )}
                            </Formik>
                        </Animated.View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </GradientWrapper>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    dropdown: {
        height: 56,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    dropdownError: {
        borderColor: '#ef4444',
    },
    icon: {
        marginRight: 12,
    },
    placeholderStyle: {
        fontSize: 14,
        color: '#475569',
    },
    selectedTextStyle: {
        fontSize: 14,
        color: 'white',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 14,
        color: 'white',
        backgroundColor: '#1e293b',
        borderRadius: 8,
    },
    dropdownContainer: {
        backgroundColor: '#1e293b',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        marginTop: 4,
    },
    itemTextStyle: {
        fontSize: 14,
        color: 'white',
    },
});

export default RegisterScreen;

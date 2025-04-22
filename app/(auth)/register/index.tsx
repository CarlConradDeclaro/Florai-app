import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useAuth from "@/hooks/useAuth";

export default function Register() {
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { register, error2 } = useAuth();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  // Animation values
  const modalAnimation = useRef(new Animated.Value(0)).current;
  const checkmarkAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(0.8)).current;

  const router = useRouter();

  useEffect(() => {
    if (modalVisible) {
      modalAnimation.setValue(0);
      checkmarkAnimation.setValue(0);
      scaleAnimation.setValue(0.8);
      Animated.sequence([
        Animated.parallel([
          Animated.timing(modalAnimation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.out(Easing.back(1.5)),
          }),
          Animated.timing(scaleAnimation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.out(Easing.back(1.5)),
          }),
        ]),
        Animated.timing(checkmarkAnimation, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.bezier(0.175, 0.885, 0.32, 1.275),
        }),
      ]).start();
    }
  }, [modalVisible]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility1 = () => {
    setPasswordVisible(!passwordVisible);
  };

  const togglePasswordVisibility2 = () => {
    setPasswordVisible2(!passwordVisible2);
  };

  const handleRegister = async () => {
    try {
      console.log("Registering a user with", form);
      const response = await register(
        form.email,
        form.username,
        form.password,
        form.password2
      );

      if (response) setModalVisible(true);
    } catch (error) {
      console.log("errorrrrr");
    }
  };

  const navigateToLogin = () => {
    setModalVisible(false);
    setForm({
      username: "",
      email: "",
      password: "",
      password2: "",
    });
    router.replace("/login");
  };

  return (
    <ScrollView className="flex-1 bg-white p-9">
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <Animated.View
            style={{
              transform: [{ scale: scaleAnimation }],
              opacity: modalAnimation,
            }}
            className="bg-white p-6 rounded-2xl w-4/5 items-center shadow-lg"
          >
            <View className="w-20 h-20 rounded-full bg-green-50 justify-center items-center mb-4">
              <Animated.View
                style={{
                  opacity: checkmarkAnimation,
                  transform: [
                    {
                      scale: checkmarkAnimation.interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [0, 1.2, 1],
                      }),
                    },
                  ],
                }}
              >
                <Ionicons name="checkmark-circle" size={60} color="#00cc00" />
              </Animated.View>
            </View>

            <View className="w-full items-center">
              <Text className="text-green-600 text-2xl font-bold mb-2">
                Success!
              </Text>
              <Text className="text-gray-600 text-center mb-6">
                Your account has been created successfully.
              </Text>

              <TouchableOpacity
                className="w-full bg-green-500 py-3.5 rounded-full flex-row justify-center items-center mb-2 shadow"
                onPress={navigateToLogin}
                activeOpacity={0.8}
              >
                <Text className="text-white font-bold text-base mr-2">
                  Continue to Login
                </Text>
                <Ionicons name="arrow-forward" size={18} color="white" />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>

      {/* Back Button */}
      <TouchableOpacity
        className="w-10 h-10 rounded-full bg-green-500 justify-center items-center"
        onPress={() => router.replace("/login")}
      >
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>

      {/* Header */}
      <View className="items-center mb-3">
        <Text className="text-3xl font-bold text-green-800 mb-1">Register</Text>
        <Text className="text-base text-gray-400">Create your new account</Text>
      </View>

      {/* Form */}
      {error2?.username && (
        <Text className="text-red-500">{error2?.username}</Text>
      )}
      <View className="w-full">
        {/* Username Input */}
        <View className="flex-row items-center   bg-['#e8f0e8'] rounded-lg mb-4 px-4 h-[60px]">
          <View className="mr-2">
            <View className="items-center">
              <View className="w-3 h-3 rounded-full bg-green-500" />
              <View className="w-5 h-2.5 rounded-t-lg bg-green-500 -mt-0.5" />
            </View>
          </View>
          <TextInput
            className="flex-1 h-12 text-gray-800"
            placeholder="Username"
            value={form.username}
            onChangeText={(text) => handleChange("username", text)}
            placeholderTextColor="#333"
          />
        </View>

        {/* Email Input */}
        {error2?.email && <Text className="text-red-500">{error2?.email}</Text>}
        <View className="flex-row items-center bg-['#e8f0e8'] rounded-lg mb-4 px-4 h-[60px]">
          <View className="mr-2">
            <View className="w-5 h-5 justify-center items-center">
              <Text className="text-base text-green-500">✉</Text>
            </View>
          </View>
          <TextInput
            className="flex-1 h-12 text-gray-800"
            placeholder="user@gmail.com"
            value={form.email}
            onChangeText={(text) => handleChange("email", text)}
            placeholderTextColor="#333"
            keyboardType="email-address"
          />
        </View>

        {/* Password Input */}
        {error2?.password && (
          <Text className="text-red-500">{error2?.password}</Text>
        )}
        <View className="flex-row items-center bg-['#e8f0e8'] rounded-lg mb-4 px-4 h-[60px]">
          <View className="mr-2">
            <View className="w-5 h-5 justify-center items-center">
              <Text className="text-base text-green-500">🔒</Text>
            </View>
          </View>
          <TextInput
            className="flex-1 h-12 text-gray-800"
            placeholder="password"
            value={form.password}
            onChangeText={(text) => handleChange("password", text)}
            placeholderTextColor="#333"
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity className="p-1" onPress={togglePasswordVisibility1}>
            <Ionicons
              name={passwordVisible ? "eye-off" : "eye"}
              size={20}
              color="#87CEEB"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password Input */}
        {error2?.password2 && (
          <Text className="text-red-500">{error2?.password2}</Text>
        )}
        <View className="flex-row items-center  bg-['#e8f0e8'] rounded-lg mb-4 px-4 h-[60px]">
          <View className="mr-2">
            <View className="w-5 h-5 justify-center items-center">
              <Text className="text-base text-green-500">🔒</Text>
            </View>
          </View>
          <TextInput
            className="flex-1 h-12 text-gray-800"
            placeholder="confirm password"
            value={form.password2}
            onChangeText={(text) => handleChange("password2", text)}
            placeholderTextColor="#333"
            secureTextEntry={!passwordVisible2}
          />
          <TouchableOpacity className="p-1" onPress={togglePasswordVisibility2}>
            <Ionicons
              name={passwordVisible2 ? "eye-off" : "eye"}
              size={20}
              color="#87CEEB"
            />
          </TouchableOpacity>
        </View>

        {/* Register Button */}
        <TouchableOpacity
          className="bg-green-500 rounded-full h-16 justify-center items-center my-5"
          onPress={handleRegister}
        >
          <Text className="text-white font-bold text-base">Register</Text>
        </TouchableOpacity>

        {/* Remember Me */}
        <View className="flex-row justify-between items-center mb-8">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => setRememberMe(!rememberMe)}
          >
            <View
              className={`w-5 h-5 rounded-full border ${
                rememberMe ? "bg-green-500 border-green-500" : "border-gray-200"
              } mr-2 justify-center items-center`}
            >
              {rememberMe && <Text className="text-xs text-white">✓</Text>}
            </View>
            <Text className="text-sm text-gray-400">Remember Me</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-sm text-gray-700">Forgot password?</Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="flex-row items-center mb-5">
          <View className="flex-1 h-px bg-gray-200" />
          <Text className="text-sm text-gray-400 px-2.5">Or continue with</Text>
          <View className="flex-1 h-px bg-gray-200" />
        </View>

        {/* Social Login */}
        <View className="flex-row justify-center mb-8">
          <TouchableOpacity className="w-10 h-10 rounded-full border border-gray-200 justify-center items-center mx-2.5">
            <Text className="text-lg text-gray-700">f</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 rounded-full border border-gray-200 justify-center items-center mx-2.5">
            <Text className="text-lg text-red-500">G</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 rounded-full border border-gray-200 justify-center items-center mx-2.5">
            <Text className="text-lg text-gray-700">🍎</Text>
          </TouchableOpacity>
        </View>

        {/* Login Link */}
        <View className="flex-row justify-center items-center">
          <Text className="text-sm text-gray-400">
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => router.replace("/login")}>
            <Text className="text-sm font-bold text-green-500"> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

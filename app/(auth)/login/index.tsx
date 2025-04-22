import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { user, login, error } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    // Handle login logic here
    setLoading(true);
    await login(email, password);
    setLoading(false);
    console.log("Logging in with:", email, password);
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    if (user && !loading) {
      router.replace("/(tabs)");
    }
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton}>
        <View style={styles.backButtonCircle}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </View>
      </TouchableOpacity>

      {/* Welcome text */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome Back</Text>
        <Text style={styles.loginInfoText}>Login to your account</Text>
      </View>

      {error && (
        <View className="flex-row m-3">
          <Ionicons
            name="warning"
            size={22}
            color="red"
            style={styles.inputIcon}
          />
          {error && <Text className="text-red-600 font-semibold">{error}</Text>}
        </View>
      )}

      {/* Login form */}
      <View style={styles.formContainer}>
        {/* Username input */}

        <View style={styles.inputContainer}>
          <Ionicons
            name="person"
            size={22}
            color="#4c784c"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        {/* Password input */}
        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed"
            size={22}
            color="#4c784c"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={passwordVisible ? "eye-off" : "eye"}
              size={20}
              color="#87CEEB"
            />
          </TouchableOpacity>
        </View>

        {/* Remember me and forgot password */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.rememberContainer}
            onPress={toggleRememberMe}
          >
            <View style={styles.checkboxContainer}>
              {rememberMe && (
                <Ionicons name="checkmark" size={14} color="white" />
              )}
            </View>
            <Text style={styles.rememberText}>Remember Me</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>
            {loading ? "Please wait..." : "Login"}
          </Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>Or continue with</Text>
          <View style={styles.divider} />
        </View>

        {/* Social Login */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialIcon}>f</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialIconGoogle}>G</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialIcon}>🍎</Text>
          </TouchableOpacity>
        </View>

        {/* Sign up option */}
        <View style={styles.signupContainer}>
          <Text style={styles.noAccountText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.replace("/register")}>
            <Text style={styles.signupText}> Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f3f0",
    padding: 20,
  },
  backButton: {
    marginTop: 10,
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#00cc00",
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeContainer: {
    marginTop: 60,
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#345f34",
    marginBottom: 8,
  },
  loginInfoText: {
    fontSize: 16,
    color: "#b0b0b0",
  },
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e8f0e8",
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 12,
    height: 56,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
  },
  eyeIcon: {
    padding: 5,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxContainer: {
    width: 20,
    height: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#00cc00",
    backgroundColor: "#00cc00",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  rememberText: {
    fontSize: 14,
    color: "#888",
  },
  forgotText: {
    fontSize: 14,
    color: "#555",
  },
  loginButton: {
    backgroundColor: "#00cc00",
    borderRadius: 30,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  noAccountText: {
    fontSize: 14,
    color: "#888",
  },
  signupText: {
    color: "#00cc00",
    fontWeight: "bold",
    fontSize: 14,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#e0e0e0",
  },
  dividerText: {
    color: "#90a4ae",
    paddingHorizontal: 10,
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  socialIcon: {
    fontSize: 18,
    color: "#333",
  },
  socialIconGoogle: {
    fontSize: 18,
    color: "#DB4437",
  },
});

export default LoginScreen;

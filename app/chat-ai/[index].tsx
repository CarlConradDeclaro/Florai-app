import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState, useEffect, useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Markdown from "react-native-markdown-display";

export default function ChatbotScreen() {
  const router = useRouter();
  const { plant } = useLocalSearchParams();
  const scrollViewRef = useRef(null);

  const [inputText, setInputText] = useState("");
  const [conversation, setConversation] = useState([
    {
      ai: "Hi PlantPal, I am your AI assistant. Feel free to ask about any specific plant you have in mind!",
    },
  ]);
  const [status, setStatus] = useState("idle");
  const [isStreaming, setIsStreaming] = useState(false);
  const [plantResults, setPlantResults] = useState([]);

  useEffect(() => {
    if (plant) {
      const plantInfo = JSON.parse(plant);
      const message = `Tell me about ${plantInfo.common_name}`;
      setInputText(message);
      handleSendMessage(message);
    }
  }, [plant]);

  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [conversation]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      if (scrollViewRef.current) {
        setTimeout(() => {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }, 100);
      }
    });
    return () => {
      showSubscription.remove();
    };
  }, []);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { user: text };
    setConversation((prev) => [...prev, userMessage]);
    setInputText("");
    setConversation((prev) => [
      ...prev,
      { ai: "Thinking...", isLoading: true },
    ]);
    setStatus("processing...");
    setIsStreaming(true);
    setPlantResults([]);

    try {
      const res = await fetch(
        `http://10.0.2.2:8000/ai-deepseek2/?q=${encodeURIComponent(text)}`
      );

      if (!res.ok) {
        updateAIResponse("Sorry, I couldn't process your request right now.");
        setStatus("Error fetching response ❌");
        return;
      }

      const responseText = await res.text();
      let introText = "",
        jsonData = [],
        summaryText = "";

      const jsonStartIdx = responseText.indexOf("```json");
      if (jsonStartIdx !== -1) {
        const jsonEndIdx = responseText.indexOf("```", jsonStartIdx + 7);
        if (jsonEndIdx !== -1) {
          introText = responseText.slice(0, jsonStartIdx);
          try {
            const jsonBlock = responseText.slice(jsonStartIdx + 7, jsonEndIdx);
            jsonData = JSON.parse(jsonBlock.trim());
            setPlantResults(jsonData);
          } catch (err) {
            console.error("Error parsing JSON:", err);
          }
          summaryText = responseText.slice(jsonEndIdx + 3);
        }
      } else {
        introText = responseText;
      }

      const fullResponse =
        introText + (jsonData.length > 0 ? "" : "") + summaryText;

      updateAIResponse(fullResponse, jsonData);
      setStatus("done ✅");
    } catch (error) {
      console.error("Error:", error);
      updateAIResponse("Sorry, there was an error processing your request.");
      setStatus("error ❌");
    } finally {
      setIsStreaming(false);
    }
  };

  const updateAIResponse = (text, plants = []) => {
    setConversation((prev) => {
      const updated = [...prev];
      updated[updated.length - 1] = {
        ai: text,
        isLoading: false,
        plants: plants.length > 0 ? plants : undefined,
      };
      return updated;
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-gray-50">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
          className="flex-1"
        >
          <View className="flex-1 flex-col">
            {/* Header */}
            <View className="flex-row items-center p-4 bg-white border-b border-gray-200">
              <TouchableOpacity onPress={() => router.back()} className="mr-3">
                <Ionicons name="chevron-back" size={24} color="#4CAF50" />
              </TouchableOpacity>
              <Text className="text-lg font-semibold flex-1">
                PlantPal Assistant
              </Text>
              {status !== "idle" && status !== "done ✅" && (
                <ActivityIndicator size="small" color="#4CAF50" />
              )}
            </View>

            {/* Messages */}
            <ScrollView
              ref={scrollViewRef}
              className="flex-1 p-4"
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ paddingBottom: 20 }}
            >
              {conversation.map((msg, index) => (
                <View key={index} className="mb-4">
                  {msg.user && (
                    <View className="flex-row justify-end">
                      <View className="bg-green-100 rounded-2xl rounded-tr-none p-3 max-w-[80%]">
                        <Text className="text-gray-800">{msg.user}</Text>
                      </View>
                      <View className="w-8 h-8 bg-green-600 rounded-full items-center justify-center ml-2">
                        <Ionicons name="person" size={18} color="white" />
                      </View>
                    </View>
                  )}
                  {msg.ai && (
                    <View className="flex-row justify-start">
                      <View className="w-8 h-8 bg-green-600 rounded-full items-center justify-center mr-2">
                        <Ionicons name="leaf" size={18} color="white" />
                      </View>
                      <View className="bg-white rounded-2xl rounded-tl-none p-3 shadow-sm max-w-[80%]">
                        {msg.isLoading ? (
                          <ActivityIndicator size="small" color="#4CAF50" />
                        ) : (
                          <>
                            <Markdown>{msg.ai}</Markdown>
                            {msg.plants && msg.plants.length > 0 && (
                              <View className="mt-3">
                                <Text className="font-semibold text-green-700 mb-2">
                                  Suggested Plants:
                                </Text>
                                {msg.plants.map((plant, idx) => (
                                  <View
                                    key={idx}
                                    className="bg-gray-50 rounded-lg p-3 mb-2 border border-gray-200"
                                  >
                                    {plant.url && (
                                      <Image
                                        source={{ uri: plant.url }}
                                        style={{
                                          width: "100%",
                                          height: 120,
                                          borderRadius: 8,
                                        }}
                                        resizeMode="cover"
                                      />
                                    )}
                                    <Text className="font-semibold text-green-700 mt-2">
                                      {plant.common_name}
                                    </Text>
                                    <Text className="text-gray-600 text-sm mt-1">
                                      {plant.description}
                                    </Text>
                                  </View>
                                ))}
                              </View>
                            )}
                          </>
                        )}
                      </View>
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>

            {/* Input */}
            <View className="flex-row items-center p-2 bg-white border-t border-gray-200">
              <TouchableOpacity className="p-2">
                <Ionicons name="camera" size={24} color="#4CAF50" />
              </TouchableOpacity>
              <TextInput
                value={inputText}
                onChangeText={setInputText}
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 mx-2 text-base"
                placeholder="Ask about plants..."
                multiline
              />
              <TouchableOpacity
                onPress={() => handleSendMessage(inputText)}
                disabled={!inputText.trim() || isStreaming}
                className={`p-2 rounded-full ${!inputText.trim() || isStreaming ? "opacity-50" : ""}`}
              >
                <Ionicons name="send" size={24} color="#4CAF50" />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

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
import { Plant } from "@/types/Plant";
import { Message } from "@/types/chat-types";
import { BASEURL } from "@/utils/base-url";

export default function ChatbotScreen() {
  const router = useRouter();
  const { plant } = useLocalSearchParams();
  const scrollViewRef = useRef<ScrollView>(null);
  const [inputText, setInputText] = useState("");
  const { index } = useLocalSearchParams();
  const parsed =
    typeof index === "string" && index !== "" ? JSON.parse(index) : index;
  let commonName = parsed
    ? "***" + parsed?.common_name + "***"
    : "any specific plant you have in mind!";
  const [conversation, setConversation] = useState<Message[]>([
    {
      ai:
        "Hi PlantPal, I am your AI assistant. Feel free to ask about " +
        commonName,
    },
  ]);
  const [status, setStatus] = useState("idle");
  const [isStreaming, setIsStreaming] = useState(false);
  const [plantResults, setPlantResults] = useState([]);

  // useEffect(() => {
  //   if (plant) {
  //     const plantInfo = typeof plant == "string" ? JSON.parse(plant) : null;
  //     const message = `Tell me about ${plantInfo.common_name}`;

  //     setInputText(message);
  //     handleSendMessage(message);
  //   }
  // }, []);

  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [conversation]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      if (scrollViewRef.current) {
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    });
    return () => {
      showSubscription.remove();
    };
  }, []);

  const handleSendMessage = async (text: string, conversation: any) => {
    if (!text.trim()) return;

    // Add user message to the conversation
    const userMessage = { user: text };
    setConversation((prev) => [...prev, userMessage]);
    setInputText("");

    // Add "Thinking..." message for AI
    setConversation((prev) => [
      ...prev,
      { ai: "Thinking...", isLoading: true },
    ]);
    setStatus("processing...");
    setIsStreaming(true);
    setPlantResults([]);

    try {
      const res = await fetch(`${BASEURL}/ai-deepseek2_json/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversation: conversation, // Pass conversation as part of the payload
          new_message: text, // Pass the current message
        }),
      });

      if (!res.ok) {
        updateAIResponse("Sorry, I couldn't process your request right now.");
        setStatus("Error fetching response ❌");
        return;
      }

      const json = await res.json();
      const {
        introduction = "",
        relevant_plants = [],
        summary = "",
        full_response = "",
      } = json;

      // Update AI response based on the data received
      if (
        !introduction &&
        !relevant_plants.length &&
        !summary &&
        full_response
      ) {
        updateAIResponse(full_response);
      } else {
        setPlantResults(relevant_plants);
        updateAIResponse(
          introduction.trim().replace(/^\*+$/gm, ""),
          relevant_plants,
          summary.trim().replace(/^\*+$/gm, "")
        );
      }

      setStatus("done ✅");
    } catch (error) {
      console.error("Error:", error);
      updateAIResponse("Sorry, there was an error processing your request.");
      setStatus("error ❌");
    } finally {
      setIsStreaming(false);
    }
  };

  const updateAIResponse = (
    introText: string,
    plants = [],
    summaryText = ""
  ) => {
    // If only one argument (full response) is passed, show it as is
    if (plants.length === 0 && !summaryText) {
      setConversation((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (!last) return prev;
        updated[updated.length - 1] = {
          ...last,
          ai: introText,
          isLoading: false,
        };
        return updated;
      });
      return;
    }

    let index = 0;
    const animationSpeed = 12;

    const animateIntro = () => {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          setConversation((prev) => {
            const updated = [...prev];
            const last = updated[updated.length - 1];
            if (!last || !last.ai) return prev;

            const newText = introText.slice(0, index);
            updated[updated.length - 1] = {
              ...last,
              ai: newText,
              isLoading: false,
            };
            return updated;
          });

          index++;
          if (index > introText.length) {
            clearInterval(interval);
            resolve();
          }
        }, animationSpeed);
      });
    };

    const showPlants = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          setConversation((prev) => {
            const updated = [...prev];
            const last = updated[updated.length - 1];
            if (!last) return prev;

            updated[updated.length - 1] = {
              ...last,
              plants,
            };
            return updated;
          });
          resolve();
        }, 300);
      });
    };

    const showSummary = () => {
      setTimeout(() => {
        setConversation((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (!last) return prev;

          updated[updated.length - 1] = {
            ...last,
            summary: summaryText,
          };
          return updated;
        });
      }, 300);
    };

    animateIntro().then(() => showPlants().then(() => showSummary()));
  };

  const handleViewPlantDetail = (plant: Plant) => {
    router.push({
      pathname: "/plant-detail/[plant]",
      params: {
        plant: JSON.stringify(plant),
      },
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
                                  <TouchableOpacity
                                    key={idx}
                                    className="bg-gray-50 rounded-lg p-3 mb-2 border border-gray-200"
                                    onPress={() => handleViewPlantDetail(plant)}
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
                                  </TouchableOpacity>
                                ))}
                              </View>
                            )}

                            {msg.summary && (
                              <View className="mt-4 border-t pt-3 border-gray-200">
                                <Text className="font-semibold text-green-800 mb-2">
                                  Summary
                                </Text>
                                <Markdown>{msg.summary}</Markdown>
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
                onPress={() => handleSendMessage(inputText, conversation)}
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

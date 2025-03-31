import React from "react";
import { TextInput, View, Text } from "react-native";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  className = "",
  children,
}) => {
  return (
    <View
      className="flex flex-row items-center bg-[#EBF6ED] rounded-xl"
      style={{ elevation: 2, overflow: "hidden" }}
    >
      {children}
      <TextInput
        className={`text-black font-semibold ${className}`}
        placeholder={placeholder}
        placeholderTextColor="#A0A0A0"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default Input;

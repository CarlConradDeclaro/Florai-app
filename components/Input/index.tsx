import React from "react";
import { TextInput, View, Text } from "react-native";

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
      className="flex flex-row items-center  "
      style={{ elevation: 4, overflow: "hidden" }}
    >
      {children}
      <TextInput
        className={`text-black font-semibold ${className}`}
        placeholder={placeholder}
        placeholderTextColor="#A0A0A0"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoFocus={true}
      />
    </View>
  );
};

export default Input;

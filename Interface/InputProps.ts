export interface InputProps {
  label?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry: boolean;
  className?: string;
}

export interface ButtonProps {
  name: string;
}

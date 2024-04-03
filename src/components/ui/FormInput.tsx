import { Input } from '@chakra-ui/react';
import React from 'react';

export interface InputProps {
  type: string;
  placeholder: string;
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormInput = ({ type, placeholder,value, onChange }: InputProps) => {
  return (
    <>
      <Input type={type} placeholder={placeholder} value={value} onInput={onChange} />
    </>
  );
};

import { ViewIcon } from '@chakra-ui/icons';
import {
  InputGroup,
  Input,
  InputRightElement,
  InputProps,
} from '@chakra-ui/react';
import React from 'react';

export function PasswordInput({ value, onChange }: InputProps) {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        type={show ? 'text' : 'password'}
        placeholder="Enter password"
        value={value}
        onChange={onChange}
      />
      <InputRightElement>
        <ViewIcon onClick={handleClick} cursor={'pointer'}></ViewIcon>
      </InputRightElement>
    </InputGroup>
  );
}

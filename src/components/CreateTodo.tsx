import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { TodoModal } from './TodoModal';

export const CreateTodo = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <Button
        type="submit"
        colorScheme="teal"
        w="100%"
        mt={2}
        onClick={() => setIsActive(true)}
      >
        Create Todo
      </Button>
      <TodoModal isOpen={isActive} onClose={() => setIsActive(false)} />
    </>
  );
};

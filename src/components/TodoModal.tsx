import { Button } from "@chakra-ui/react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
  export const TodoModal = ({ isOpen, onClose }: ModalProps) => {
    return (
      <>
        {isOpen ? (
          <div>
            <h1>Open div</h1>
            <Button onClick={onClose}>Close</Button>
          </div>
        ) : (
          <div>
            <h1>Close div</h1>
          </div>
        )}
      </>
    );
  };
  
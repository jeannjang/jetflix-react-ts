import { motion, AnimatePresence } from "motion/react";
import styled from "styled-components";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.black.primaryTransparent};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  padding: 20px;
`;

const ModalContainer = styled(motion.div)`
  background-color: ${(props) => props.theme.black.second};
  border-radius: 8px;
  overflow: hidden;
  position: relative;

  // 모바일: 95% 너비
  width: 95%;
  height: 90vh;

  // 태블릿 이상: 고정 크기
  @media (min-width: 768px) {
    width: 700px;
    height: 90vh;
    max-height: 800px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: ${(props) => props.theme.black.thirdTransparent};
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.white.primary};
  z-index: 1;

  &:hover {
    background: ${(props) => props.theme.black.third};
  }
`;

function Modal({ isOpen, onClose, children }: IModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContainer
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={onClose}>×</CloseButton>
            {children}
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
}

export default Modal;

//jetflix

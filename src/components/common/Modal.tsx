import { motion, AnimatePresence } from "motion/react";
import styled from "styled-components";
import { makeImagePath } from "../../utils/imagePath";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  layoutId?: string;
  imagePath?: string;
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

const BannerImage = styled.div<{ $bgPhoto: string }>`
  height: 300px;
  background-image: linear-gradient(
      to bottom,
      transparent 40%,
      ${(props) => props.theme.black.second}
    ),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center top;
  padding-bottom: 56.25%;

  @media (max-width: 768px) {
    height: 200px;
  }
`;

function Modal({ isOpen, onClose, imagePath, layoutId }: IModalProps) {
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
            layoutId={layoutId}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={onClose}>×</CloseButton>
            {imagePath && (
              <BannerImage $bgPhoto={makeImagePath(imagePath, "w780")} />
            )}
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
}

export default Modal;

//jetflix

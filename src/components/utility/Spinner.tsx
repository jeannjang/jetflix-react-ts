import { motion } from "motion/react";
import styled from "styled-components";

const SpinnerWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.black.primaryTransparent};
`;

const SpinnerContainer = styled(motion.div)`
  width: clamp(40px, 8vw, 60px);
  height: clamp(40px, 8vw, 60px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SpinnerCircle = styled(motion.span)`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-top-color: ${(props) => props.theme.red};
  border-radius: 50%;
`;

const LogoContainer = styled(motion.div)`
  width: 55%;
  height: 55%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

function Spinner(): JSX.Element {
  return (
    <SpinnerWrapper>
      <SpinnerContainer>
        <SpinnerCircle
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <LogoContainer
          animate={{ scale: [0.8, 1, 0.8] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Logo src="/image/jetflix-logo.png" alt="Jetflix" />
        </LogoContainer>
      </SpinnerContainer>
    </SpinnerWrapper>
  );
}

export default Spinner;

//jetflix

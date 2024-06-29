import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styled from 'styled-components';

interface IProps {
  title?: string;
  instructions?: string;
  footer?: string;
}

export const StartGame = ({ title, instructions, footer }: IProps) => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        y: 35,
        repeat: -1,
        yoyo: true,
        duration: 0.8,
        ease: 'power1.inOut',
      });
    }
  }, []);

  return (
    <OverlayContainer>
      <ContentWrapper>
        <Container>
          <Content>
            <Title>{title}</Title>
            <Instructions>{instructions}</Instructions>
          </Content>
        </Container>
        <ImageWrapper>
          <Image
            ref={imageRef}
            src="https://roman1510.github.io/files/monster-fish.PNG"
            alt="Monster Fish"
          />
        </ImageWrapper>
      </ContentWrapper>
      <Footer>{footer}</Footer>
    </OverlayContainer>
  );
};

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 999999;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  padding-left: 5%;
  box-sizing: border-box;
`;

const Container = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h1`
  font-family: 'Oswald', sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-size: 6.5rem;
  color: #d3c6b1;
  text-shadow: 2px 2px 8px #000;
  user-select: none;
  line-height: 1.05;
  text-align: center;
`;

const ImageWrapper = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 250px;
  height: 250px;
`;

const Instructions = styled.p`
  font-family: 'Oswald', sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-size: 2.2rem;
  color: #d3c6b1;
  text-shadow: 1px 1px 4px #000;
  user-select: none;
`;

const Footer = styled.div`
  font-family: 'Oswald', sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-size: 1rem;
  color: #d3c6b1;
  text-shadow: 1px 1px 4px #000;
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 20px;
  user-select: none;
`;

export default StartGame;

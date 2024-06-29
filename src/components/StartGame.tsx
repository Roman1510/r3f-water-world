import styled from 'styled-components';

interface IProps {
  title?: string;
  instructions?: string;
  footer?: string;
}

export const StartGame = ({ title, instructions, footer }: IProps) => {
  return (
    <OverlayContainer>
      <Container>
        <Content>
          <Title>{title}</Title>
          <Instructions>{instructions}</Instructions>
        </Content>
      </Container>
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

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 5%;
  width: 60%;
  height: 100%; /* Ensure the container takes full height */
`;

const Content = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 80px;
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

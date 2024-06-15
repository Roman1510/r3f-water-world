import styled from 'styled-components'

interface IProps {
  setReady: () => void
  title: string
  buttonText: string
}

export const StartGame = ({ setReady, title, buttonText }: IProps) => (
  <Container>
    <Content>
      <Title>{title}</Title>
      <StartButton onClick={setReady}>{buttonText}</StartButton>
    </Content>
  </Container>
)

const Container = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-size: cover;
`

const Content = styled.div`
  margin-left: 10%;
  text-align: center;
`

const Title = styled.h1`
  font-size: 2.5rem;
  color: #ff3333;
  text-shadow: 2px 2px 8px #000;
  font-family: 'Creepster', cursive;
  margin-bottom: 20px;
`

const StartButton = styled.button`
  font-size: 1.5rem;
  color: #fff;
  background-color: #000;
  padding: 15px 30px;
  border: 2px solid #ff3333;
  border-radius: 5px;
  cursor: pointer;
  text-transform: uppercase;
  font-family: 'Creepster', cursive;
  transition: all 0.3s ease;
  text-shadow: 2px 2px 8px #ff3333;

  &:hover {
    background-color: #ff3333;
    color: #000;
    text-shadow: 2px 2px 8px #000;
  }
`

import styled from 'styled-components'

interface IProps {
  title: string
}

export const StartGame = ({ title }: IProps) => {
  console.log('startgame rendered, title:', title)
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999999,
      }}
    >
      <Container>
        <Content>
          <Title>{title}</Title>
        </Content>
      </Container>
    </div>
  )
}

const Container = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
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

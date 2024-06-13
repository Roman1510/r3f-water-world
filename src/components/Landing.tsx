interface IProps {
  setReady: (ready: boolean) => void
}

export const Landing = ({ setReady }: IProps) => (
  <div>
    <h1>click start </h1>
    <button onClick={() => setReady(true)}>Start</button>
  </div>
)

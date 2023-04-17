import { Title, Info } from '../styles'

export function Techs() {
  return (
    <div>
      <Title>Algumas tecnologias usadas nesse projeto</Title>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Info>Next.js</Info>
          <Info>Typescript</Info>
          <Info>Stitches</Info>
          <Info>Stripe</Info>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Info>Redux.js</Info>
          <Info>React Hooks</Info>
          <Info>React Skeleton</Info>
          <Info>React Spring</Info>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Info>Axios</Info>
          <Info>React Toastify</Info>
          <Info>ESlint</Info>
          <Info>Prettier</Info>
        </div>
      </div>
    </div>
  )
}

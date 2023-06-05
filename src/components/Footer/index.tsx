import { Container, MoreInfo, ExpansiveButton, ButtonMoveTop } from './styles'

import { useState } from 'react'
import { Apresetation } from './Apresentation'

import { Contact } from './Contact'
import { FaCaretUp } from 'react-icons/fa'

export function Footer() {
  const [expand, setExpand] = useState(false)

  return (
    <Container>
      <ExpansiveButton
        onClick={() => {
          setExpand(!expand)
        }}
      >
        {expand ? 'Menos informação' : 'Mais informação'}
      </ExpansiveButton>
      <MoreInfo expand={expand}>
        {expand && (
          <>
            <Apresetation />

            <Contact />
          </>
        )}
      </MoreInfo>
      <main>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <strong>{`D'Coffee Shop`} 2023</strong>
          <span>Todos os direitos reservados</span>
        </div>

        <ButtonMoveTop
          onClick={() => {
            document.body.scrollTop = document.documentElement.scrollTop = 0
          }}
        >
          <FaCaretUp size={25} />
        </ButtonMoveTop>
      </main>
    </Container>
  )
}

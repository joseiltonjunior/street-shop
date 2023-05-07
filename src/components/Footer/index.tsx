import Image from 'next/image'
import { Container, MoreInfo, ExpansiveButton, ButtonMoveTop } from './styles'

import caret from '@/assets/caret-down.svg'
import { useState } from 'react'
import { Apresetation } from './Apresentation'

import { Contact } from './Contact'

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

            {/* <div className="mobile">
              <Contact mobile />
            </div> */}
          </>
        )}
      </MoreInfo>
      <main>
        <div>
          <p>{`D'Coffee Shop`} 2023</p>
          <p>Todos os direitos reservados</p>
        </div>

        <ButtonMoveTop
          onClick={() => {
            document.body.scrollTop = document.documentElement.scrollTop = 0
          }}
        >
          <Image src={caret} alt="" />
        </ButtonMoveTop>
      </main>
    </Container>
  )
}

import { ReactNode, SelectHTMLAttributes, useState } from 'react'

import {
  Container,
  DropdownContainer,
  SelectedItem,
  DropdownSelection,
  DropdownItem,
  DropdownItemName,
  SelectedItemName,
} from './styles'

type ItensDropdownProps = {
  value: string
  name: ReactNode
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  itens: ItensDropdownProps[]
  onAction(key: ItensDropdownProps): void
}

export function Select({ itens, onAction, name }: SelectProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <Container
      onMouseEnter={() => {
        setIsDropdownOpen(true)
      }}
    >
      <DropdownSelection
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        isOpen={isDropdownOpen}
      >
        <SelectedItem>
          <SelectedItemName>{name}</SelectedItemName>
        </SelectedItem>
      </DropdownSelection>

      {isDropdownOpen && (
        <DropdownContainer
          onMouseLeave={() => {
            setIsDropdownOpen(false)
          }}
        >
          {itens.map((item, index) => (
            <DropdownItem
              key={item.value}
              onClick={() => {
                onAction(item)
                setIsDropdownOpen(false)
              }}
            >
              <DropdownItemName>{item.name}</DropdownItemName>
            </DropdownItem>
          ))}
        </DropdownContainer>
      )}
    </Container>
  )
}

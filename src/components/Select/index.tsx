import { ReactNode, useState } from 'react'

import {
  Container,
  DropdownContainer,
  DropdownItensContainer,
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

type SelectProps = {
  itens: ItensDropdownProps[]
  onAction(key: ItensDropdownProps): void
}

export function Select({
  itens,

  onAction,
}: SelectProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedItemIndex, setSelectedItemIndex] = useState(0)

  return (
    <Container
      onBlur={() => {
        setTimeout(() => setIsDropdownOpen(false), 200)
      }}
    >
      <DropdownSelection
        onClick={() => {
          setIsDropdownOpen(!isDropdownOpen)
        }}
        isOpen={isDropdownOpen}
      >
        <SelectedItem>
          <SelectedItemName>{itens[selectedItemIndex]?.name}</SelectedItemName>
        </SelectedItem>
      </DropdownSelection>

      {isDropdownOpen && (
        <DropdownContainer>
          <DropdownItensContainer>
            {itens.map((item, index) => (
              <DropdownItem
                key={item.value}
                onClick={() => {
                  setSelectedItemIndex(index)
                  onAction(item)
                  setIsDropdownOpen(false)
                }}
              >
                <DropdownItemName isSelected={index === selectedItemIndex}>
                  {item.name}
                </DropdownItemName>
              </DropdownItem>
            ))}
          </DropdownItensContainer>
        </DropdownContainer>
      )}
    </Container>
  )
}

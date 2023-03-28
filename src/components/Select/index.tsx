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
  const [selectedItemIndex, setSelectedItemIndex] = useState(0)

  return (
    <Container
      onBlur={() => {
        setTimeout(() => setIsDropdownOpen(false), 200)
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
        <DropdownContainer>
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
        </DropdownContainer>
      )}
    </Container>
  )
}

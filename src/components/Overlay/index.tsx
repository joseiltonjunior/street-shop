import { reduxProps } from '@/storage'
import { setSideMenu } from '@/storage/modules/side-menu/action'
import { sideMenuProps } from '@/types/sideMenu'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from './styles'

export function Overlay() {
  const { isVisible } = useSelector<reduxProps, sideMenuProps>(
    (state) => state.sideMenu,
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (isVisible) {
      window.document.body.style.overflow = 'hidden'
    } else {
      window.document.body.style.overflow = 'auto'
    }
  }, [isVisible])

  return (
    <Container
      isVisible={isVisible}
      onMouseEnter={() => dispatch(setSideMenu({ isVisible: false }))}
    />
  )
}

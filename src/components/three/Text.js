import { memo } from 'react'

import { useFont } from '../../hooks'

const Text = memo(
  ({
    children = '',
    size = 2500,
    height = 250,
    color = 'hotpink',
    position = [0, 0, 0],
    rotation = [0, 0, 0],
  }) => {
    const font = useFont()

    const textOptions = { font, size, height }

    if (!font) {
      return null
    }

    return (
      <mesh position={position} rotation={rotation}>
        <textGeometry attach="geometry" args={[children, textOptions]} />
        <meshStandardMaterial attach="material" color={color} />
      </mesh>
    )
  },
)

export default Text

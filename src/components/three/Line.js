import { memo } from 'react'
import * as THREE from 'three'

const Line = memo(({ points, color = 'lightgray', params }) => {
  const vertices = points.map((point) => [point.x, point.y, point.z])
  const key = Number(`${params.width}${params.height}${params.roofAngle}`)

  const position = new THREE.BufferAttribute(
    new Float32Array(vertices.flat()),
    3,
  )

  return (
    <line key={key}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={['attributes', 'position']}
          {...position}
        />
      </bufferGeometry>
      <lineBasicMaterial attach="material" color={color} />
    </line>
  )
})

export default Line

import { memo, useState } from 'react'
import styled from '@emotion/styled'
import * as THREE from 'three'
import { HTML } from 'drei'
import { Earcut } from 'three/src/extras/Earcut'

const Tooltip = styled.div`
  border: 1px solid gray;
  border-radius: 5px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.7);
  div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip;
  }
`

const Floor = memo(({ points, meta }) => {
  const [isHovered, setIsHovered] = useState(false)
  const vertices = points.map((point) => [point.x, point.y, point.z])

  const triangleIndices = Earcut.triangulate(
    vertices.flat(Infinity),
    undefined,
    3,
  )

  const mappedVertices = triangleIndices.map((index) => vertices[index])

  const position = new THREE.BufferAttribute(
    new Float32Array(mappedVertices.flat()),
    3,
  )

  // TODO wrap fns to useCallback
  return (
    <mesh
      onPointerOver={(e) => {
        e.stopPropagation()
        setIsHovered(true)
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setIsHovered(false)
      }}
    >
      <HTML
        scaleFactor={100000}
        position={[position.getX(0), position.getY(0), position.getZ(0)]}
        style={{ pointerEvents: 'none', display: isHovered ? 'block' : 'none' }}
      >
        <Tooltip>
          <div>Area: {meta.area}</div>
          <div>Level: {meta.level}</div>
        </Tooltip>
      </HTML>
      <bufferGeometry
        attach="geometry"
        position={position}
        onUpdate={(self) => {
          self.computeFaceNormals()
          self.computeVertexNormals()
        }}
      >
        <bufferAttribute
          attachObject={['attributes', 'position']}
          {...position}
        />
      </bufferGeometry>
      <meshStandardMaterial
        attach="material"
        color={isHovered ? 'pink' : 'gray'}
        side={THREE.DoubleSide}
        opacity={0.75}
        transparent
      />
    </mesh>
  )
})

export default Floor

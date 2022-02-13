import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { CircularProgress } from '@mui/material'
import * as THREE from 'three'
import { Canvas } from 'react-three-fiber'

import { Building, CameraControls, BuildingsControls } from './components'
import { useBuildings } from './store'

THREE.Object3D.DefaultUp.set(0, 0, 1)

const LoadingWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.5);
  z-index: 2;
`

export default function App() {
  const { fetchData, data, isLoading } = useBuildings()

  useEffect(() => {
    if (!data) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {isLoading && (
        <LoadingWrapper>
          <CircularProgress />
        </LoadingWrapper>
      )}
      <BuildingsControls />
      <Canvas
        style={{ height: '100vh' }}
        camera={{
          up: [0, 0, 1],
          position: [20000, 20000, 20000],
          near: 1000,
          far: 400000,
          fov: 70,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#eeeeee')
        }}
      >
        <ambientLight intensity={1.0} />
        <directionalLight intensity={0.2} position={[1, 1, 1]} />

        {data?.map((building) => (
          <Building
            key={building.tags.name}
            parts={building.items}
            name={building.tags.name}
            params={building.params}
          />
        ))}

        <CameraControls />
      </Canvas>
    </>
  )
}

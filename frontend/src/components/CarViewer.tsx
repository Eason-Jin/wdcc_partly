import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function CarModel() {
  const gltf = useGLTF('/carModel/scene.gltf') // 注意路径是相对 public 的
  return <primitive object={gltf.scene} />
}

export default function CarViewer() {
  return (
    <Canvas camera={{ position: [0, 1, 5], fov: 50 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[2, 2, 5]} />
      <Suspense fallback={null}>
        <CarModel />
      </Suspense>
      <OrbitControls />
    </Canvas>
  )
}

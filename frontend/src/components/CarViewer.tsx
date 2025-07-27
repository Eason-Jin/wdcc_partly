import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three';

function CarModel() {
  const gltf = useGLTF('/carModel/scene.gltf') // 注意路径是相对 public 的
  return <primitive object={gltf.scene} />
}

function RotatingLight() {
  const lightRef = useRef<THREE.DirectionalLight>(null);

  useFrame(({ camera }) => {
    if (lightRef.current) {
      // Make the light follow the camera's position
      lightRef.current.position.copy(camera.position);
    }
  });

  return (
    <>
      <ambientLight intensity={50} />
      <directionalLight ref={lightRef} intensity={50} />
    </>
  );
}

export default function CarViewer() {
  return (
    <Canvas camera={{ position: [0, 1, 5], fov: 50 }}>
      <RotatingLight />
      <Suspense fallback={null}>
        <CarModel />
      </Suspense>
      <OrbitControls />
    </Canvas>
  )
}
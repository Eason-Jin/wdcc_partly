import React, { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three';
import { addInteractivePoint } from './addInteractivePoint';

function CarModel() {
  const gltf = useGLTF('/carModel/scene.gltf') // 注意路径是相对 public 的
  const sceneRef = useRef<THREE.Group>(null);
  
  // set the scale of the model
  useEffect(() => {
    if (gltf.scene) {
      gltf.scene.scale.set(0.03, 0.03, 0.03) // 调整比例大小，试试不同的值
    }
  }, [gltf])


  useEffect(() => {
    if (sceneRef.current) {
      // Add a point marker on the car
      const rearCutPosition = new THREE.Vector3(15, 42, -80); // Adjust the position based on the model's scale and orientation
      const rearCutMarker = addInteractivePoint('RearCutMarker', rearCutPosition, 'Rear Cut');
      rearCutMarker.scale.set(20, 20, 20); 
      sceneRef.current.add(rearCutMarker);

      const tailboardPosition = new THREE.Vector3(15, 42, -90); // Adjust the position based on the model's scale and orientation
      const tailboardMarker = addInteractivePoint('tailboardMarker', tailboardPosition, 'Tailboard Assembly');
      rearCutMarker.scale.set(20, 20, 20); 
      sceneRef.current.add(tailboardMarker);
    }
  }, []);



 return <primitive ref={sceneRef} object={gltf.scene} />;



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
import { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three';
import { addInteractivePoint } from './addInteractivePoint';
import type { InteractiveNode } from '../types/part';
import { dummyParts } from '../assets/data';

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
      const rearCutPosition = new THREE.Vector3(0, 42, -80);
      const rearCutNode: InteractiveNode = {
        position: rearCutPosition,
        marker: addInteractivePoint('RearCutMarker', rearCutPosition, 'Rear Cut'),
        part: dummyParts.find(part => part.id === 'GHCA959')!
      }
      sceneRef.current.add(rearCutNode.marker);

      const tailboardPosition = new THREE.Vector3(0, 30, -102);

      const tailboardNode: InteractiveNode = {
        position: tailboardPosition,
        marker: addInteractivePoint('tailboardMarker', tailboardPosition, 'Tailboard Assembly'),
        part: dummyParts.find(part => part.id === 'GHCA9460')!
      }
      sceneRef.current.add(tailboardNode.marker);

      const rearWindowPosition = new THREE.Vector3(0, 45, -55); // Adjust the position based on the model's scale and orientation
      const rearWindowNode: InteractiveNode = {
        position: rearWindowPosition,
        marker: addInteractivePoint('rearWindowMarker', rearWindowPosition, 'Rear Window Assembly'),
        part: dummyParts.find(part => part.id === 'GHCA9436')!
      }
      sceneRef.current.add(rearWindowNode.marker);
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

export default function CarViewer(props: { selectedPart: string | null }) {
  console.log('Selected Part:', props.selectedPart);
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
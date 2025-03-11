import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CubeWithClipping = () => {
  const cubeSize = 5; // Размер куба
  const sphereRef = useRef();

  // Создаем шесть плоскостей отсечения для граней куба
  const clippingPlanes = [
    new THREE.Plane(new THREE.Vector3(1, 0, 0), cubeSize / 2),   // Правая грань
    new THREE.Plane(new THREE.Vector3(-1, 0, 0), -cubeSize / 2), // Левая грань
    new THREE.Plane(new THREE.Vector3(0, 1, 0), cubeSize / 2),   // Верхняя грань
    new THREE.Plane(new THREE.Vector3(0, -1, 0), -cubeSize / 2),  // Нижняя грань
    new THREE.Plane(new THREE.Vector3(0, 0, 1), cubeSize / 2),    // Передняя грань
    new THREE.Plane(new THREE.Vector3(0, 0, -1), -cubeSize / 2)   // Задняя грань
  ];

  // Анимация увеличения шара
  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.scale.x += 0.01;
      sphereRef.current.scale.y += 0.01;
      sphereRef.current.scale.z += 0.01;
    }
  });

  return (
    <>
      {/* Куб */}
      <mesh>
        <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
        <meshBasicMaterial color="gray" wireframe />
      </mesh>

      {/* Шар с отсечением */}
      <mesh ref={sphereRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="red"
          clippingPlanes={clippingPlanes}
          clipShadows={true}
        />
      </mesh>
    </>
  );
};

const App = () => (
  <Canvas>
    <CubeWithClipping />
  </Canvas>
);

export default App;

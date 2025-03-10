import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {OrbitControls, OrthographicCamera, PerspectiveCamera} from '@react-three/drei';
import { Vector3, Plane, Raycaster } from 'three';

function Sphere({ position }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.125, 30, 30]} />
      <meshStandardMaterial color={0xffea00} metalness={0} roughness={0} />
    </mesh>
  );
}

function Scene({ cameraRef }) {
  const [spheres, setSpheres] = React.useState([]);
  const raycaster = useRef(new Raycaster());
  const mouse = useRef(new Vector3());

  const handleClick = (event) => {
    mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.current.setFromCamera(mouse.current, cameraRef.current);

    const planeNormal = new Vector3();
    const plane = new Plane();
    planeNormal.copy(cameraRef.current.position).normalize();
    plane.setFromNormalAndCoplanarPoint(planeNormal, new Vector3(0, 0, 0));

    const intersectionPoint = new Vector3();
    raycaster.current.ray.intersectPlane(plane, intersectionPoint);

    setSpheres((prev) => [...prev, intersectionPoint.clone()]);
  };

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      <ambientLight intensity={0.333} />
      <directionalLight position={[0, 50, 0]} intensity={0.8} />
      <axesHelper args={[20]} />
      {spheres.map((pos, index) => (
        <Sphere key={index} position={pos} />
      ))}
      <OrbitControls camera={cameraRef.current} />
    </>
  );
}

function Proba() {
  const cameraRef = useRef();

  return (
    <Canvas style={{ height: '100vh' }}>
     <PerspectiveCamera ref={cameraRef} makeDefault fov={75} position={[0, 12, 5]} />
      <Scene cameraRef={cameraRef} />
    </Canvas>
  );
}

export default Proba;

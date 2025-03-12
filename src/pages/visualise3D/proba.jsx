import { useRef, useState, useEffect } from 'react';
import { CSG } from 'three-csg-ts';

const Box = () => {
  const $mesh = useRef();
  const $box = useRef();
  const $sub = useRef();
  const [color] = useState('#8ccbde'); // Цвет по умолчанию
  const [boxScale] = useState(0.6); // Масштаб по умолчанию
  const [geo, setGeo] = useState();

  useEffect(() => {
    // Вычисляем пересечение один раз при монтировании компонента
    const sub = CSG.intersect($mesh.current, $box.current);
    setGeo(sub.geometry);
  }, []);

  return (
    <group>
      <mesh ref={$mesh} visible={false}>
        <icosahedronGeometry args={[1, 2]} />
      </mesh>
      <mesh ref={$box} visible={true}>
        <boxGeometry args={[boxScale, 2, 2]} />
        <meshBasicMaterial wireframe={true} />
      </mesh>
      <mesh ref={$sub} geometry={geo} receiveShadow castShadow>
        <meshStandardMaterial color={color} flatShading />
      </mesh>
    </group>
  );
};

export default Box;
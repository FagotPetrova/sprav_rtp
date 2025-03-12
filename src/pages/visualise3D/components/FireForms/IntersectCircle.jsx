import React, {useState} from 'react';
import {useFrame} from "@react-three/fiber";
import {CSG} from "three-csg-ts";

const IntersectCircle = ({roomWallsRef,karkasRef,fullCircleRef}) => {
    const [intersectCircle, setIntersectCircle] = useState();
    const roomWall= roomWallsRef.current.children[0]
    const karkas=karkasRef.current
    const fullCircle=fullCircleRef.current
    // Анимируем увеличение радиуса
    useFrame(() => {
            console.log(fullCircle)
            console.log(karkas)
            // const sub = CSG.intersect(fullCircle,karkas);
            // setIntersectCircle(sub.geometry)


    });
    return (
        <>
            <mesh geometry={intersectCircle} >
                <meshStandardMaterial color="#8ccbde"/>
            </mesh>

        </>
    )
};

export default IntersectCircle;
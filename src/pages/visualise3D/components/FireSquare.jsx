import React from 'react';
import {useFrame} from "@react-three/fiber";
import {useState, useRef, useEffect} from "react";

import Vectors from "./Vectors";
import FullCircle from "./FireForms/FullCircle";
import IntersectCircle from "./FireForms/IntersectCircle";
import ProbaCylinder from "./FireForms/ProbaCylinder";


const FireSquare = ({initialRadius, position, distances, roomWallsRef, karkasRef}) => {
    //Хранит ту окружность,что обрезана
    const [radius, setRadius] = useState(initialRadius);
    const [minDistance, setMinDistance] = useState(0)
    const fullCircleRef = useRef();
    const probaCylinder=useRef()
    // Логируем minDistance только при изменении distances
    useEffect(() => {
        const newMinDistance = Math.min(...distances.map(item => item.distance));
        setMinDistance(newMinDistance);
        console.log(newMinDistance);
    }, [distances]);
    // Сброс радиуса при каждом обновлении позиции
    useEffect(() => {
        setRadius(initialRadius); // Устанавливаем радиус на 0.1 при каждом клике
    }, [position]); // Зависимость от position
    // Анимируем увеличение радиуса
    useFrame(() => {
        setRadius((prevRadius) => prevRadius + 0.001);
    });

    return (
        <>
            <Vectors position={position} distances={distances}/>
            <ProbaCylinder ref={probaCylinder}/>
            {radius < minDistance || minDistance === 0 ? (
                <FullCircle ref={fullCircleRef} position={[position.x, position.y, position.z]} radius={radius}/>
            ) : (
                <IntersectCircle
                    roomWallsRef={roomWallsRef}
                    karkasRef={karkasRef}
                    fullCircleRef={probaCylinder}
                />
            )}
        </>
    );
};

export default FireSquare;
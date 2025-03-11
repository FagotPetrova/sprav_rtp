import React from 'react';
import {useFrame} from "@react-three/fiber";
import {useState, useRef, useEffect} from "react";

import Vectors from "./Vectors";
import Circle from "./FireForms/Circle";
import SubtractionCSG from "./SubtractionCSG";


const FireSquare = ({initialRadius, position, distances, roomWallsRef}) => {

    const [radius, setRadius] = useState(initialRadius);
    const [formFire, setFormFire] = useState("Circle");
    const [minDistance, setMinDistance] = useState(null)
    const circleRef = useRef();

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
        if (radius >= minDistance) {
            console.log("Достигло стены")

        }
    });

    return (
        <>

            <Vectors position={position} distances={distances}/>
            {formFire === "Circle" && (
                <Circle ref={circleRef} position={[position.x, position.y, position.z]} radius={radius}/>
            )}
            {/* Условный рендеринг SubtractionCSG */}
            {radius >= minDistance && (
                <SubtractionCSG roomWallsRef={roomWallsRef} fireSquarePosition={position}
                                fireSquareRadius={radius}/>
            )}
        </>
    );
};

export default FireSquare;
export const getLenghtByWalls = (roomParams, clickedPoint) => {
    const floorWidth = roomParams.width;
    const floorDepth = roomParams.depth;

    // Вычисляем расстояние до краев
    const distanceToLeftEdge = clickedPoint.x - (roomParams.positionX - floorWidth / 2);
    const distanceToRightEdge = (roomParams.positionX + floorWidth / 2) - clickedPoint.x;
    const distanceToFrontEdge = clickedPoint.z - (roomParams.positionZ - floorDepth / 2);
    const distanceToBackEdge = (roomParams.positionZ + floorDepth / 2) - clickedPoint.z;

    // Создаем объект с итоговыми расстояниями
    const distances = [
        {side: "left", distance: distanceToLeftEdge, description: "левая стена"},
        {side: "right", distance: distanceToRightEdge, description: "правая стена"},
        {side: "front", distance: distanceToFrontEdge, description: "передняя стена"},
        {side: "back", distance: distanceToBackEdge, description: "задняя стена"},
    ];

    console.log(`Расстояние до левого края: ${distanceToLeftEdge}`);
    console.log(`Расстояние до правого края: ${distanceToRightEdge}`);
    console.log(`Расстояние до переднего края: ${distanceToFrontEdge}`);
    console.log(`Расстояние до заднего края: ${distanceToBackEdge}`);

    return distances; // Возвращаем объект с расстояниями
};


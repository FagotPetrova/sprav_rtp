import * as THREE from 'three';
const createPointFire = (event, camera, floorRef, roomParams) => {
    // Получаем координаты мыши
    const mouse = new THREE.Vector2();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Создаем raycaster
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera); // camera - это ваша камера

    // Проверяем пересечения с полом
    const intersects = raycaster.intersectObject(floorRef);
    if (intersects.length > 0) {
        const clickedPoint = intersects[0].point; // Точка, где произошел клик


        return {"x":clickedPoint.x, "y":clickedPoint.y + 0.1, "z":clickedPoint.z};
    }

    return null; // Если нет пересечений, возвращаем null
};

export default createPointFire;
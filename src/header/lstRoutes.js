
import App from "../pages/STP 2.0/main/App";
import Visualise3D from "../pages/visualise3D/Visualise3D";
import RequestFireCard from "../pages/STP 2.0/save_request/components/RequestFireCard";
import Error from "../pages/Error/Error";
import Login from "../pages/Login/Login";




export const privateRoutes = {
    "Методики": [
        { name: "Методика_1", link: "/train", element: <App /> },
        { name: "Методика_2", link: "#", element: null }, // null, если элемента нет
        { name: "Методика_3", link: "#", element: null }
    ],
    "3D": [
        { name: "ППР.Огнетушители", link: "/three_js", element: <Visualise3D /> },
        { name: "Нефтехранилище", link: "/proba", element: <Visualise3D /> }
    ],
    "Справочник РТП": [
        { name: "Раздел 2", link: "#", element: null },
        { name: "Раздел 3", link: "#", element: null }
    ],
    "СТП-2.0": [
        { name: "Создать запрос", link: "/stp_main", element: <App /> },
        { name: "Сохраненные запросы", link: "/request_fire_card", element: <RequestFireCard /> },
    ],
    "error": [
        { name: "Ошибка", link: "/error", element: <Error /> }
    ]
};

export const publicRouters={
    "Авторизация":[
         { name: "Авторизация", link: "/login", element: <Login /> }
    ]
}
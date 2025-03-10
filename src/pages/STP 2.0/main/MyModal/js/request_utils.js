//Из этой функции буду делать запрос на сервер
import $ from './jquery.js';
import api from "../../../../../api"
export default async function get_data(){
    return await api.get("/und_ond_data")
}
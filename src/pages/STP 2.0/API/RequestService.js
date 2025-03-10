import axios from "axios";

export default class RequestService {
    static async getAll() {
        const response = await axios.get('https://dummyjson.com/posts?limit=10')
        return response.data

    }
}
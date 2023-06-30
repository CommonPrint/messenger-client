import { getToken } from './utils/getToken';
import axios from "axios";

const jwt = getToken();

export default axios.create({
    baseURL: "http://localhost:6800/api",
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${jwt}`
    }
})
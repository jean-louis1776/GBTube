import axios from 'axios';
import {API_URL} from "@constants/frontend";

const $api = axios.create({
  baseURL: API_URL,
});

export default $api;

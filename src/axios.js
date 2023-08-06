import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4200", //api {cloud function} URL
});

export default instance;

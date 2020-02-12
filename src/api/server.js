import axios from "axios";

const baseURL = /grouptext/.test(window.location.href)
  ? "https://grouptext.herokuapp.com/"
  : "http://localhost:5000/";

export default axios.create({ baseURL });

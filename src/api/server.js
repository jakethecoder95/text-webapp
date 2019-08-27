import axios from "axios";

const devLoc = "http://localhost:5000/";
// const prodLoc = "https://grouptext.herokuapp.com/";

export default axios.create({ baseURL: devLoc });

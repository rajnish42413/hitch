import Axios from "axios";
import render from "./render";
import paths from "./paths";
const root = document.getElementById("root");
Axios.defaults.baseURL = paths.base;

render(root!);

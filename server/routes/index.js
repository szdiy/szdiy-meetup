import express from "express";
import user from "./user";
import web from "./web";

let root = express.Router();
root.get('/', (req, res) => {
  res.send('It works!');
});


let routes = {
  "/": root,
  "/api/v1/user": user,
  "/web": web,
};

export default routes;

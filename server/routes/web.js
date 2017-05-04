import express from "express";
import models from "../models";

let router = express.Router();

router.get('/topics', (req, res) => {
  res.render('topics', {
    title: "Home - SZDIY Meetup",
  });
});

router.get('/topic/new', (req, res) => {
  
});

router.get('/topic/edit', (req, res) => {

});

router.get('/topic/delete', (req, res) => {

});




export default router;

import express from "express";
import models from "../models";

let router = express.Router();

router.get('/topics', (req, res) => {
  models.Topic.findAll({ 
      order: 'updatedAt DESC',
    })
    .then((topics) => {

   
      res.render('topics', {
        title: "Home",
        topics: topics,
      });
    });
});

router.get('/topic/new', (req, res) => {
  

  res.render('topic/new', {
    title: "New Topic",
    
  });
});

router.get('/topic/edit', (req, res) => {

});

router.get('/topic/delete', (req, res) => {

});




export default router;

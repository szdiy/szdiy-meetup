import express from "express";
import models from "../models";

let router = express.Router();


// CRUD for Topics
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


router.get(/\/topic\/(\d+)$/, (req, res) => {
  let topicId = req.params[0];
  console.log('topic id:', topicId, JSON.stringify(req.params));
  models.Topic.findById(topicId)
    .then((topic) => {
      if (topic) {
        res.render('topic/detail', {
          title: topic.title + " - Topic",
          topic: topic,
        });
      } else {
        res.status(404).send('No record for id: ' + topicId);
      }
    })
  
});

router.get('/topic/new', (req, res) => {
  res.render('topic/new', {
    title: "New Topic",
  });
});

router.post('/topic/new', (req, res) => {
  let title = req.param('title')
  let summary = req.param('summary')

  // TODO: validation
  
  models.Topic.create({ title, summary })
    .then((topic) => {
 
      res.render('topic/new_success', {
        title: "Topic created",
        topic: topic
      });

    });
});

router.get(/\/topic\/(\d+)\/edit$/, (req, res) => {
  let topicId = req.params[0];
  models.Topic.findById(topicId)
    .then((topic) => {

      if (topic) {
        res.render('topic/edit', {
          title: "Edit Topic",
          topic
        });
      } else {
        res.status(404).send('No topic for id: ' + topicId);
      }
    })

});

router.post('/topic/edit', (req, res) => {

  res.render('topic/edit_success', {
    title: "Topic updated",
  });
});

router.get(/\/topic\/(\d+)\/delete$/, (req, res) => {
  let topicId = req.params[0];
  models.Topic.findById(topicId)
    .then((topic) => {

      if (topic) {
        res.render('topic/delete_confirm', {
          title: "Delete Topic",
          topic,
        });
      } else {
        res.status(404).send('No topic for id: ' + topicId);
      }
    });
});

router.post('/topic/delete', (req, res) => {

  if (true) {
    // delete successfully
    res.render('topic/delete_success', {

    });
  }
  else {
    res.render('topic/delete_fail', {

    });
  }
});








export default router;

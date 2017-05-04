import express from "express";
import models from "../models";
import Api from "../utils/api";

let router = express.Router();

router.post('/register', (req, res) => {
  let regForm = {
    username: req.body.username,
    password: req.body.password,
    name: req.body.name || req.body.username,
  };

  models.User.find({ where:{ username:regForm.username } })
    .then((user)=> {
      if (user) { // user exist, return error
        res.send(
          Api.toResponse(Api.Codes.FIELD_INVALID, {
            message: "user already exist",
            error: null,
          })
        );
      }
      else {
        return models.User.create({
            username: regForm.username,
            password: models.User.generateHash(regForm.password),
            name: regForm.name,
          })
          .then((user)=>{
            res.send(
              Api.toResponse(Api.Codes.OK, {
                id: user.id,
                username: user.username,
                name: user.name,
                is_locked: user.is_locked,
                is_deleted: user.is_deleted,
                is_super: user.is_super,
              })
            );
          })
          .catch((err)=>{
            res.send(
              Api.toResponse(Api.Codes.SAVE_ERROR, {
                message: "create user error",
                error: err,
              })
            );
          });
      }
    })
});


router.post('/login', (req, res) => {

  res.send(
    Api.toResponse(Api.Codes.OK, {
    })
  ); 
});

router.get('/list', (req, res) => {
  models.User.findAll({
    where: {
      is_deleted: {
        $ne: true,
      }
    }
  })
  .then((users) => {
    res.send(
      Api.toResponse(Api.Codes.OK, {
        users: users
      })
    );
  });
});

router.post('/:user_id/update', (req, res) => {

  res.send(
    Api.toResponse(Api.Codes.OK, {
    })
  );
});


export default router;

import express from "express";




let root = express.Router();
root.get('/', (req, res) => {
  res.send('It works!');
});

module.exports = {
  '/': root,
  // other modules below

}

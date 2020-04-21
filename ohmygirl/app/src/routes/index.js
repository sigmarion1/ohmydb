const express = require('express');
const Pic = require('../models/pic')
const router = express.Router()



/* GET home page. */
router.get('/', async (req, res) => {

  try {
    const pics = await Pic.find({})
    res.render('index', {
      title : "main",
      pics
    })
  } catch (e) {
    res.status(500).send(e)
  }

})


module.exports = router;

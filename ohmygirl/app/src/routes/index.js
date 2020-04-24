const express = require('express');
const Pic = require('../models/pic')
const ohmygirl = require('../models/ohmygirl')
const router = express.Router()



/* GET home page. */
router.get('/', async (req, res) => {

  try {
    const ohmygirls = await ohmygirl.find({})
    console.log(ohmygirls)
    res.render('index', {
      title : "main",
      ohmygirls
    })
  } catch (e) {
    res.status(500).send(e)
  }

})


module.exports = router;

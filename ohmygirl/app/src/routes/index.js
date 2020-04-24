const express = require('express');
const Pic = require('../models/pic')
const ohmygirl = require('../models/ohmygirl')
const router = express.Router()



/* GET home page. */
router.get('/', async (req, res) => {
  const page = req.query.page

  try {
    const ohmygirls = await ohmygirl.find({}).sort({'crawledTime':-1}).skip((page-1)*20).limit(20)
    res.render('index', {
      title : "main",
      ohmygirls
    })
  } catch (e) {
    res.status(500).send(e)
  }

})


router.get('/find/:member', async (req,res) => {
  const page = req.query.page
  const member = req.params.member

  try {
    const ohmygirls = await ohmygirl.find({ 'who' : [member]}).sort({'crawledTime':-1}).skip((page-1)*20).limit(20)
    res.render('index', {
      title : "find",
      ohmygirls
    })
  } catch (e) {
    res.status(500).send(e)
  }

})



module.exports = router;

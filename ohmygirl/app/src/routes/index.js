const express = require('express');
const Pic = require('../models/pic')
const ohmygirl = require('../models/ohmygirl')
const router = express.Router()



/* GET home page. */
router.get('/', async (req, res) => {
  const get_page = req.query.page
  const get_member = req.query.member
  let page = 1
  let member = null
  let condition = {}

  if(get_page){
    page = Number(get_page)
  }

  if(get_member){
    if(get_member ==='group'){
      member = 'group'
      condition['isGroup'] = true
    } else {
      member = get_member
      condition['who'] = [member]
    }
  }

  try {
    const ohmygirls = await ohmygirl.find(condition).sort({'crawledTime':-1}).skip((page-1)*20).limit(20)
    const last_page = Math.ceil(await ohmygirl.countDocuments(condition) / 20)
    const pg = {
      'previous' : page - 1,
      'current' : page,
      'next' : page + 1,
      'last' : last_page,
      'has_previous' : (page > 1),
      'has_next' : (page < last_page),
      'member' : member
    }

    
    res.render('index', {
      title : "main",
      ohmygirls,
      pg
    })
  } catch (e) {
    res.status(500).send(e)
  }

})


router.get('/find/:member', async (req,res) => {
  const page = req.query.page
  const member = req.params.member

  try {
    if (member === 'group') {
      const ohmygirls = await ohmygirl.find({ 'isGroup' : true}).sort({'crawledTime':-1}).skip((page-1)*20).limit(20)
      res.render('index', {
        title : "find",
        ohmygirls
      })
    } else {
      const ohmygirls = await ohmygirl.find({ 'who' : [member]}).sort({'crawledTime':-1}).skip((page-1)*20).limit(20)
      res.render('index', {
        title : "find",
        ohmygirls
      })
    }
  } catch (e) {
    res.status(500).send(e)
  }

})



module.exports = router;

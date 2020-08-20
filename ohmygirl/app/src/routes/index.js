const express = require('express');
const pic = require('../models/pic')
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
    const pics = await pic.find(condition).sort({'_id':-1}).skip((page-1)*20).limit(20)
    const last_page = Math.ceil(await pic.countDocuments(condition) / 20)
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
      pics,
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
      const pics = await pic.find({ 'isGroup' : true}).sort({'_id':-1}).skip((page-1)*20).limit(20)
      res.render('index', {
        title : "find",
        pics
      })
    } else {
      const pics = await pic.find({ 'who' : [member]}).sort({'_id':-1}).skip((page-1)*20).limit(20)
      res.render('index', {
        title : "find",
        pics
      })
    }
  } catch (e) {
    res.status(500).send(e)
  }

})



module.exports = router;

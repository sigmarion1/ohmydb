const express = require('express');
const Pic = require('../models/pic')
const router = express.Router()

/* GET home page. */
router.get('/', async (req, res) => {
  const page = (req.query.page || 1)
  const get_member = req.query.member
  let member = null
  let condition = {}

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
    const pics = await Pic.find(condition).sort({'crawledTime':-1}).skip((page-1)*20).limit(20)
    res.json(pics)
  } catch (e) {
    res.status(500).send(e)
  }

})

router.get('/test', async (req,res) => {
  res.send('hi')
})


module.exports = router;

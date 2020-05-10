const express = require('express');
const ohmygirl = require('../models/ohmygirl')
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
    const ohmygirls = await ohmygirl.find(condition).sort({'crawledTime':-1}).skip((page-1)*20).limit(20)
    res.send(ohmygirls)
  } catch (e) {
    res.status(500).send(e)
  }

})




module.exports = router;

const express = require('express')

const router = express('router')

router.get('/', function(req,res) {
 res.send("heyy thiss is owner")
})


module.exports = router;
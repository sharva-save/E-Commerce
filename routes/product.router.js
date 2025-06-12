const express = require('express')

const router = express('router')

router.get('/', function(req,res) {
 res.send("heyy this is product")
})


module.exports = router;
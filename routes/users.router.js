const express = require('express')

const router = express('router')

router.get('/', function(req,res) {
 res.send("heyy")
})


module.exports = router;
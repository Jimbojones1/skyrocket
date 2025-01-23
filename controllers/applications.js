const express = require('express')
const router = express.Router()


router.get('/', function(req, res){
	res.render('applications/index.ejs')
})


// we need to mount the router in our server.js in order to use it!
module.exports = router
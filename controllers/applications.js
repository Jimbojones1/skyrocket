const express = require('express')
const router = express.Router()


router.get('/', function(req, res){
	console.log(req.session, ' req.session in index of applications')
	res.render('applications/index.ejs')
})

router.get('/new', function(req, res){
	res.render('applications/new.ejs')
})

// we need to mount the router in our server.js in order to use it!
module.exports = router
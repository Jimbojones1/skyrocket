const express = require("express");
const router = express.Router();

const UserModel = require("../models/user");
const User = require("../models/user");

router.get("/", async function (req, res) {
  console.log(req.session, " req.session in index of applications");
  try {
    const currentUser = await UserModel.findById(req.session.user._id);

    res.render("applications/index.ejs", {
      applications: currentUser.applications,
    });

  } catch (err) {
    console.log(err);
    res.send("Error Rendering all applications check terminal");
  }
});

router.get("/new", function (req, res) {
  res.render("applications/new.ejs");
});

// show route after the new! So express matches the new
router.get('/:applicationId', async function(req, res){
	// THe job of this function is to render a specific application
	try {
		// Look up the user, then grab the application that matches the id in params
		// from the user's applications array
		const currentUser = await User.findById(req.session.user._id)
		// find the application ("The google" Mongoose document methods)
		const application = currentUser.applications.id(req.params.applicationId)
		// respond to the client with the ejs page
		res.render('applications/show.ejs', {
			application: application
		})

	} catch(err){
		console.log(err)
		res.send("error and show page check your terminal!")
	}
})

router.post("/", async function (req, res) {
  try {
    // look up the user
    const currentUser = await UserModel.findById(req.session.user._id);
    // then add the contents of the form to the users applications array
    currentUser.applications.push(req.body);
    // anytime we mutate a document we must tell the database
    // by calling .save
    await currentUser.save();
    console.log(currentUser, " <- currentUser");
    // redirect back to the index route
    res.redirect(`/users/${currentUser._id}/applications`);
  } catch (err) {
    console.log(err);
    res.send("Error check the terminal to debug");
  }
});

// we need to mount the router in our server.js in order to use it!
module.exports = router;

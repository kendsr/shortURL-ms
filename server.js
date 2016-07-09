var express = require("express"),
	app = express(),
	mongoose = require("mongoose"),
	ShortId = require('mongoose-shortid-nodeps'),
	validURL = require('valid-url'),
	appURL = process.env.APPURL || "http://localhost:3000/"
	dbURL = process.env.DATABASEURL || "mongodb://localhost/shortURL_app";
	port = process.env.PORT || 3000,
	url = "",
	title = "ShortuRL";

// Set template enjine
app.set("view engine", "ejs");

// Sites Model
var SiteSchema = new mongoose.Schema({
		shortURL: { type: ShortId, index: true},
		longURL: String        
    });
var Site = mongoose.model("Site", SiteSchema);

// Connect to database
mongoose.connect(dbURL);

// Landing Page 
app.get("/", function(req, res){
	res.render("landing", {title:title});
})

// Find short URL and redirect to long URl or 
// if long URl, validate it and create a short URL
// (*) allows forward slashes in params
app.get("/:url(*)", function(req, res){
	url = req.params.url;
	// If it's a short url (ShortId length of 7) look it up and redirect to longURL
	if (url.length == 7) {
		// Only return longURL value
		Site.findOne({ shortURL: url },{ longURL:1,_id:0 }, 
		function(err, site){
			if (err){ console.log(err); res.redirect("/");}
			if (site != null){
				res.redirect(site.longURL);	
			} else {
				res.json({"shortURL":url, "error":"Not in database"});
			}	
		});
	} else {
		// Must be a long URL
		// Validate and find or create shortURL
		if (url != 'favicon.ico') {
			// To be valid site address must have either "http" or https"
			if (validURL.isWebUri(url)) {
				findOrCreateShortURL(url, res);
			}else {
				res.json({"url":url, "error":"Not a valid URL"});
			}
		} 
	}
});

function findOrCreateShortURL (url, res){
	// Look up the url to find a shortURL
	Site.findOne({ longURL: url },{ shortURL:1, _id:0 }, 
		function(err, site){
			if (err){ console.log(err); res.redirect("/");}
			if (site != null){
				res.json({"shortURL":appURL+site.shortURL, "longURL":url});
			} else {
				// Insert site into database with generated shortURL provided by model
				var obj = { "longURL":url};
				Site.create(obj, function(err, newsite){
					if (err){ console.log(err); res.redirect("/");}
					res.json({"shortURL":appURL+newsite.shortURL, "longURL":url});
				});
			}
		});
}

// Server Start Up
app.listen(port, function(){
	console.log("Server is listening to port "+port);
});
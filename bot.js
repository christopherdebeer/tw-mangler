var sys     = require('sys'),
    tweasy  = require("tweasy"),
    OAuth   = require("oauth").OAuth,
    _       = require('underscore'),
    EE      = require('events').EventEmitter,
    ee      = new EE(),
    now;


// Settings for Bot

var userToReplicate = "christopherdb",
    botsScreenName  = "ronathanjoss",
    botOwner        = "djaykay",
    startupMsg      = "hmmmm #justwokeup /cc @" + botOwner,
    mangleTweet     = /ssdsd/g,
    replaceAts      = true;



var oauthConsumer = new OAuth(
    "http://twitter.com/oauth/request_token",
    "http://twitter.com/oauth/access_token", 
    "dpWq5IKoWJTHv3RRhL9Lrg", "vUk3pa2ZUW1h4gDewvNsu8uKVIKC1Tj51iPOs5Gc", 
    "1.0", null, "HMAC-SHA1");


var twitterClient = tweasy.init(oauthConsumer, {
  access_token : "420351901-R3fxM6UNkJe4HbETFIzuLgkm7tfNUSHFU1BZhpM",
  access_token_secret : "aUsYRqdIidhRDGtkizbLIQyCWRsfSVYHZ9jTVAWsow"
});

function tweet(text) {

  if (replaceAts) {
    var safeText = text.replace(/@/g,"+");
  } else {
    safeText = text;
  }
	twitterClient.updateStatus(safeText,
	  function(er, resp){
     now = new Date();
	    if (!er) {
	      console.log("[" + now.toUTCString() + "] Tweeted: ", safeText);
	    } else {
	      console.log("[" + now.toUTCString() + "] TwitBot error:", er);
	    }
	  });
}

var botsLastTweets = {};


function getTweets(user) {
	twitterClient.userTimeline({screen_name : user, count: 20},
	  function(er, tweets) {
      if (!er) {

        // turn into array of just texts
        now = new Date();
        newtweets = tweets.map(function(t) {return t.text});

        if (user === botsScreenName) { 
          botsLastTweets = newtweets
        }
        else {
          compareTweets(newtweets);
        }
      } else {
        console.log("[" + now.toUTCString() + "] Error: ", er);
        tweet("RUH ROH!, I can haz Error.")
      }
	    
	  });
}


function compareTweets (tweets) {

  // console.log("Mine: ", botsLastTweets );
  // console.log("Theirs: ", tweets);

  var dif = _.difference(tweets, botsLastTweets);

  // remove @ references (for now) 

  if (dif.length > 0) {
    var toTweet = dif;
    toTweet.map(function(t){ tweet(t)});
  }
  
}



// on checkTweets

ee.on('checkTweets', function() {

  now = new Date();
  console.log("[" + now.toUTCString() + "] Checking @" + userToReplicate + " and tweeting as @" + botsScreenName + ".")
  getTweets(botsScreenName);
  getTweets(userToReplicate);

});

setInterval ( function (){
    ee.emit('checkTweets');    
}, 3600000);



// init
now = new Date();
console.log("[" + now.toUTCString() + "] " + botsScreenName + ":BOT Started.")




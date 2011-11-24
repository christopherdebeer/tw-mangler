var sys = require('sys'),
    tweasy = require("tweasy"),
    OAuth = require("oauth").OAuth;


var oauthConsumer = new OAuth(
    "http://twitter.com/oauth/request_token",
    "http://twitter.com/oauth/access_token", 
    "dpWq5IKoWJTHv3RRhL9Lrg", "vUk3pa2ZUW1h4gDewvNsu8uKVIKC1Tj51iPOs5Gc", 
    "1.0", null, "HMAC-SHA1");


var twitterClient = tweasy.init(oauthConsumer, {
  access_token : "420351901-R3fxM6UNkJe4HbETFIzuLgkm7tfNUSHFU1BZhpM",
  access_token_secret : "aUsYRqdIidhRDGtkizbLIQyCWRsfSVYHZ9jTVAWsow"
});


// Settings for Bot

var userToReplicate = "christopherdb",
    botsScreenName  = "ronathanjoss",
    botOwner        = "djaykay",
    startupMsg      = "hmmmm #justwokeup /cc @" + botOwner;





function tweet(text) {
	twitterClient.updateStatus(text,
	  function(er, resp){
	    if (!er) {
	      console.log("Tweeted checking in, with @" + botOwner);
	    } else {
	      console.log("TwitBot error:", er);
	    }
	  });
}

var botsLastTweets = {};


function getTweets(user) {
	twitterClient.userTimeline({screen_name : user, count: 20},
	  function(er, tweets) {
      if (!er) {
        if (user === botsScreenName) { botsLastTweets = tweets}
        else {
          compareTweets(tweets);
        }
      } else {
        console.log("Error: ", er);
        tweet("RUH ROH!, I can haz Error.")
      }
	    
	  });
}


function compareTweets (tweets) {

  console.log("Mine: ", botsLastTweets );
  console.log("Theirs: ", tweets);
  
}



getTweets(botsScreenName);
getTweets(userToReplicate);


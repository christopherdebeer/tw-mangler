var sys = require('sys')
  , tweasy = require("tweasy")
  , OAuth = require("oauth").OAuth
  ;
var oauthConsumer = new OAuth(
    "http://twitter.com/oauth/request_token",
    "http://twitter.com/oauth/access_token", 
    "dpWq5IKoWJTHv3RRhL9Lrg", "vUk3pa2ZUW1h4gDewvNsu8uKVIKC1Tj51iPOs5Gc", 
    "1.0", null, "HMAC-SHA1");
var twitterClient = tweasy.init(oauthConsumer, {
  access_token : "420351901-R3fxM6UNkJe4HbETFIzuLgkm7tfNUSHFU1BZhpM",
  access_token_secret : "aUsYRqdIidhRDGtkizbLIQyCWRsfSVYHZ9jTVAWsow"
});


var startupMsg = "hmmmm #justwokeup /cc @djaykay";

function tweet(text) {
	twitterClient.updateStatus(text,
	  function(er, resp){
	    if (!er) {
	      sys.puts("Tweeted checking in, with @djaykay");
	    } else {
	      console.log("TwitBot error:", er);
	    }
	  });
}

var lastTweet = "";


function getTweets(user) {
	twitterClient.userTimeline({screen_name : user, count: 20},
	  function(er, tweets) {
      if (!er) {
        for (var i=0; i < tweets.length; i++) {
          sys.puts(tweets[i].text);
        };
      } else {
        console.log("Error: ", er);
        tweet("RUH ROH!, I can haz Error.")
      }
	    
	  });
}

getTweets("christopherdb");


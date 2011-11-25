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
    intervalInMS    = 3600000,
    replaceAts      = true;

var doneTweets = [];



var oauthConsumer = new OAuth(
    "http://twitter.com/oauth/request_token",
    "http://twitter.com/oauth/access_token", 
    "dpWq5IKoWJTHv3RRhL9Lrg", "vUk3pa2ZUW1h4gDewvNsu8uKVIKC1Tj51iPOs5Gc", 
    "1.0", null, "HMAC-SHA1");


var twitterClient = tweasy.init(oauthConsumer, {
  access_token : "420351901-R3fxM6UNkJe4HbETFIzuLgkm7tfNUSHFU1BZhpM",
  access_token_secret : "aUsYRqdIidhRDGtkizbLIQyCWRsfSVYHZ9jTVAWsow"
});




function isHashtag(word) {
  if (/^#\S+/.test(word)) return true;
  return false;
}
function isAtName(word) {
  if (/^@\S+/.test(word)) return true;
  return false;
}
function isURL(word) {
  if (/\S+\.\S{2,5}\S*/.test(word)) return true;
  return false;
}

function mangle(text) {

  var words = text.split(" ");
  var mangled = words.map(function(word){

    if (!isHashtag(word) && !isAtName(word) && !isURL(word)) {
      word = word.replace(/r/g, "w");
      word = word.replace(/R/g, "W");
    }

    return word;

  });

  return mangled.join(" ");
}


function tweet(text) {

  doneTweets.push(text);
  
  var safeText;
  if (replaceAts) {
    safeText = mangle(text).replace(/@/g,"+");
  } else {
    safeText = mangle(text);
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



function getTweets(user) {
	twitterClient.userTimeline({screen_name : user, count: 20},
	  function(er, tweets) {
      if (!er) {

        // turn into array of just texts
        now = new Date();
        newtweets = tweets.map(function(t) {return t.text});
        compareTweets(newtweets);

      } else {
        console.log("[" + now.toUTCString() + "] Error: ", er);
        tweet("RUH ROH!, I can haz Error.");
      }
	    
	  });
}


function compareTweets (tweets) {



  var dif = _.difference(tweets, doneTweets);

  if (dif.length > 0) {
    var toTweet = dif;
    toTweet.map(function(t){ tweet(t)});
  }
  
}



// on checkTweets

ee.on('checkTweets', function() {

  now = new Date();
  console.log("[" + now.toUTCString() + "] Checking @" + userToReplicate + " and tweeting as @" + botsScreenName + ".")
  getTweets(userToReplicate);

});

setInterval ( function (){
    ee.emit('checkTweets');    
}, intervalInMS);



// init
now = new Date();
console.log("[" + now.toUTCString() + "] " + botsScreenName + ":BOT Started.");
tweet(startupMsg);




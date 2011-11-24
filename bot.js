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


twitterClient.updateStatus("@djaykay , hi how you doing mate. #justwokeup",
  function(er, resp){
    if (!er) {
      sys.puts("Tweeted checking in, with @djaykay");
    } else {
      console.log("TwitBot error:", er);
    }
  });
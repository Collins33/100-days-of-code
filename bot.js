console.log("my bot")
var allTweets = [];

var Twit = require('twit'); //get the twit package
var Config = require('./config'); //get the access tokens

console.log(Config)

var T = new Twit(Config)



//setting up a user stream
var stream = T.stream('user'); //set up a stream to the twitter api

//anytime someone follows you
stream.on('follow', followed); //assign a callback called followed to the follow activity

function followed(eventMsg) {
var name=eventMsg.source.name;
var screenName=eventMsg.source.screen_name;//get twitter account name
tweetItFollow('@'+screenName + ' do you like rainbows?')
}






var params = {
  q: 'scotch.io', //search tweet with this keyword
  count: 3 //number of tweets to return
}


T.get('search/tweets', params, getData); //tell twitter to SEARCH for tweets
//getdata is for handling the response

function getData(err, data, response) {
  tweets = data.statuses;
  for (var i = 0; i < tweets.length; i++) {
    allTweets.push(tweets[i].text)
    console.log(allTweets);
  }

  //the callback function
}


tweetIt()
function tweetIt() {
  //var r = Math.floor(Math.random() * 100)
  var tweet = {
    status: "The code train"
  }
  T.post('statuses/update', tweet, tweeted);

  function tweeted(err, data, response) {
    if (err) {
      console.log("something went wrong")
    } else {
      console.log("It worked")
    }
  }
}







//setInterval(tweetIt, 1000 * 20)
//POST A when followed
function tweetItFollow(txt) {
  //var r = Math.floor(Math.random() * 100)
  var tweet = {
    status: txt
  }
  T.post('statuses/update', tweet, tweeted);

  function tweeted(err, data, response) {
    if (err) {
      console.log("something went wrong")
    } else {
      console.log("It worked")
    }
  }
}

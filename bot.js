console.log("my bot")
var allTweets = [];

var Twit = require('twit'); //get the twit package
var Config = require('./config'); //get the access tokens

console.log(Config)

var T = new Twit(Config)



//setting up a user stream
var stream = T.stream('user'); //set up a stream to the twitter api

//BOT TO TWEET WHEN SOMEONE FOLLOWS ME
stream.on('follow', followed); //assign a callback called followed to the follow activity

function followed(eventMsg) {
  var name = eventMsg.source.name;
  var screenName = eventMsg.source.screen_name; //get twitter account name
  tweetItFollow('@' + screenName + ' thank you for following')
}
//setInterval(tweetIt, 1000 * 20)
//POST A TWEET WHEN FOLLOWED
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





//GET TWEETS FROM SCOTCH
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

//TWEET A SPECIFIC TWEET
tweetIt()

function tweetIt() {
  //var r = Math.floor(Math.random() * 100)
  var tweet = {
    status: "Invest in good education #devlife #twot"
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


//RETWEET BOT
var retweet = function() {
  var params = {
    q: '#Angularjs, #angularJs',
    result_type: 'recent',
    lang: 'en'
  }
}
T.get('search/tweets', params, function(err, data) {
  //if there are no errors
  if (!err) {
    //grab the id of the tweet to RETWEET
    var retweetId = data.statuses[0].id_str;
    //tell twitter to retweet
    T.post('statuses/retweet/:id', {
      id: retweetId
    }, function(err, response) {
      if (response) {
        console.log('RETWEETED')
      }
      if (err) {
        console.log("SOMETHING WENT WRONG WHEN RETWEETING")
      }
    });

  }
  //if unable to search a tweet
  else {
    console.log("SOMETHING WENT WRONG WHEN FINDING TWEET")
  }
});
retweet();

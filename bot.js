console.log("my bot")
var allTweets = [];

var Twit = require('twit'); //get the twit package
var Config = require('./config'); //get the access tokens

console.log(Config)

var T = new Twit(Config)



//setting up a user stream
var stream = T.stream('user'); //set up a stream to the twitter api



//BOT TO TWEET WHEN SOMEONE FOLLOWS ME================================================================
stream.on('follow', followed); //assign a callback called followed to the follow activity

function followed(eventMsg) {
  var name = eventMsg.source.name;
  var screenName = eventMsg.source.screen_name; //get twitter account name
  tweetItFollow('@' + screenName + ' thank you for following')
}

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





//GET TWEETS FROM IkoKaziKe==========================
var params = {
  q: '#IkoKaziKe', //search tweet with this keyword
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

//=================TWEET A SPECIFIC TWEET================
// tweetIt()
//
// function tweetIt() {
//   //var r = Math.floor(Math.random() * 100)
//   var tweet = {
//     status: "Be a nice human.. #devlife #twot"
//   }
//   T.post('statuses/update', tweet, tweeted);
//
//   function tweeted(err, data, response) {
//     if (err) {
//       console.log("something went wrong")
//     } else {
//       console.log("It worked")
//     }
//   }
// }


//==========RETWEET BOT================
var retweet = function() {
  var params = {
    q: '#MondayMotivation',
    lang: 'en',
    count:10
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
}
retweet();


//SEARCH AND FAVOURITE A TWEET RANDOMLY
var retweetFavouriteTweet = function() {
  var params = {
    q: '#IkoKaziKe',
    result_type: 'recent',
    lang: 'en'
  }
  //find the tweets
  T.get('search/tweets', params, function(err, data) {
    //find the tweets
    var tweets = data.statuses
    //pick a random tweet
    var randomTweet = ranDom(tweets)
    //if random tweet exists
    if (typeof randomTweet != 'undefined') {
      //tell twitter to favourite it
      T.post('favorites/create', {
        id: randomTweet.id_str
      }, function(err, response) {
        //check if there was error while favouriting
        if (err) {
          console.log("CANNOT FAVOURITE")
        } else {
          console.log("FAVOURITE WAS SUCCESSFUL")
        }
      })
    }
  })
}

retweetFavouriteTweet()

//FUNCTION TO GENERATE A RANDOM NUMBER
function ranDom(arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

setInterval(retweetFavouriteTweet, 1000*20)
setInterval(retweet, 1000*20)

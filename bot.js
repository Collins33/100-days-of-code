console.log("my bot")

var Twit=require('twit');//get the twit package
var Config=require('./config');//get the access tokens

console.log(Config)

var T = new Twit(Config)

var params={
  q:'moringa school',//search tweet with this keyword
  count:3//number of tweets to return
}


T.get('search/tweets',params,getData);//tell twitter to SEARCH for tweets
//getdata is for handling the response

function getData(err,data,response){
  var tweets=data.statuses;
  for (var i=0;i < tweets.length;i ++){
    console.log(tweets[i].text);
  }

  //the callback function
}

//POST A tweet
var tweet={
  status:'#CodingChallenges with twot'
}
T.post('statuses/update',tweet,tweeted);
function tweeted(err,data,response){
  if(err){
    console.log("something went wrong")
  }
  else{
    console.log("It worked")
  }
}

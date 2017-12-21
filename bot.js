console.log("my bot")

var Twit=require('twit');//get the twit package
var Config=require('./config');//get the access tokens

console.log(Config)

var T = new Twit(Config)

var params={
  q:'moringa school',//search tweet with this keyword
  count:10//number of tweets to return
}


T.get('search/tweets',params,getData);//tell twitter to search for tweets

function getData(err,data,response){
  var tweets=data.statuses;
  for (var i=0;i < tweets.length;i ++){
    console.log(tweets[i].text);
  }

  //the callback function
}

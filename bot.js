console.log("my bot")

var Twit=require('twit');//get the twit package
var Config=require('./config');//get the access tokens

console.log(Config)

var T = new Twit(Config)

var params={
  q:'banana since:2011-11-11',//search tweet with this keyword
  count:100//number of tweets to return
}


T.get('search/tweets',params,getData);//tell twitter to search for tweets

function getData(err,data,response){
  console.log(data);
  //the callback function
}

console.log("my bot")

var Twit=require('twit');//get the twit package
var Config=require('./config');//get the access tokens

console.log(Config)

var T = new Twit(Config)

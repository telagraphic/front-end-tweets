require('dotenv').config();
const Twitter = require('twitter-lite');

const twitter = new Twitter({
  subdomain: "api",
  consumer_key: process.env.CONSUMER_KEY, // from Twitter.
  consumer_secret: process.env.CONSUMER_SECRET, // from Twitter.
  access_token_key: process.env.ACCESS_TOKEN_KEY, // from your User (oauth_token)
  access_token_secret: process.env.ACCESS_TOKEN_SECRET // from your User (oauth_token_secret)
});


module.exports = twitter;

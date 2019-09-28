require('dotenv').config();
const utilities = require('./utilities.js')
const Twitter = require('twitter-lite');
const fs = require('fs');

const twitter = new Twitter({
  subdomain: "api",
  consumer_key: process.env.CONSUMER_KEY, // from Twitter.
  consumer_secret: process.env.CONSUMER_SECRET, // from Twitter.
  access_token_key: process.env.ACCESS_TOKEN_KEY, // from your User (oauth_token)
  access_token_secret: process.env.ACCESS_TOKEN_SECRET // from your User (oauth_token_secret)
});

function getTweeters() {
  return new Promise((resolve, reject) => {
    fs.readFile('tweeters.json', (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
};

async function getUserTweets(user) {

  return new Promise((resolve, reject) => {
    let userTweets = [];

    twitter
      .get("statuses/user_timeline", {screen_name: user.handle, count: 1})
      .then(data => {
        data.forEach(function(tweet) {
          userTweets.push({
            "created": utilities.twitterDate(tweet.created_at),
            "handle": tweet.user.screen_name,
            "text": tweet.text,
            "site": tweet.user.url,
            "topic": user.topic,
            "hashtags": [...tweet.entities.hashtags],
            "url": `https://www.twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
          });
        });
        resolve(userTweets);
      })
      .catch(error => {
        reject(error);
      });
  });

};

const flattenDeep = (arr) => Array.isArray(arr) ? arr.reduce( (a, b) => a.concat(flattenDeep(b)) , []) : [arr]

async function getTweets(users) {

  let allTweets = [];

  for (let index = 0; index < users.length; index++) {
    let user_tweet_list = await getUserTweets(users[index]);
    allTweets.push(user_tweet_list);
  }

  return flattenDeep(allTweets);
}


async function getAllTweets() {
  let tweeters = await getTweeters();
  let tweets = await getTweets(tweeters);
  console.log(tweets);
  return tweets;
}

getAllTweets();

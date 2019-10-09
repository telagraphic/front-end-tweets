require('dotenv').config();

const utilities = require('./utilities.js')
const Twitter = require('twitter-lite');
const fs = require('fs');
const database = require('./server/connection');


const twitter = new Twitter({
  subdomain: "api",
  consumer_key: process.env.CONSUMER_KEY, // from Twitter.
  consumer_secret: process.env.CONSUMER_SECRET, // from Twitter.
  access_token_key: process.env.ACCESS_TOKEN_KEY, // from your User (oauth_token)
  access_token_secret: process.env.ACCESS_TOKEN_SECRET // from your User (oauth_token_secret)
});

function getTweeters() {
  return new Promise((resolve, reject) => {
    fs.readFile('./server/tweeters.json', (err, data) => {
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
            "twittertime": utilities.twitterDate(tweet.created_at),
            "created": new Date(tweet.created_at),
            "handle": tweet.user.screen_name,
            "message": tweet.text,
            "site": tweet.user.url || '',
            "topic": user.topic,
            "hashtags": [...tweet.entities.hashtags],
            "link": `https://www.twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
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
};

async function saveTweets(tweets) {

  return database.task(function(task) {
    let queries = [];

    tweets.forEach(tweet => {
      queries.push(task.none("INSERT INTO tweets (twittertime, created, handle, message, site, topic, hashtags, link) VALUES (${twittertime}, ${created}, ${handle}, ${message}, ${site}, ${topic}, ${hashtags}, ${link})", tweet));
    });

    return task.batch(queries);
  })
  .then(function(data) {
    console.log("Saved " + data.length + " tweets!");
    return data;
  })
  .catch(function(error) {
    console.log("FAILED: ", error);
    return error;
  });

};


async function getAllTweets() {
  let tweeters = await getTweeters();
  let tweets = await getTweets(tweeters);
  let savedTweets = await saveTweets(tweets);
}

getAllTweets();

require('dotenv').config();

const twitter = require('./server/twitter.js');
const fs = require('fs');
const utilities = require('./server/utilities.js')
const database = require('./server/database/api');

async function getTweeters() {

  return database.fetchTweeters()
    .then(data => {
      return data;
    })
    .catch(error => {
      return new Error(error)
    });
}


async function getUserTweets(user) {

  return new Promise((resolve, reject) => {
    let userTweets = [];

    twitter
      .get("statuses/user_timeline", {screen_name: user.handle, count: 3})
      .then(data => {

        data.forEach(function(tweet) {

          if (!tweet.retweeted_status) {

            userTweets.push({
              "twittertime": utilities.twitterDate(tweet.created_at),
              "created": new Date(tweet.created_at),
              "handle": tweet.user.screen_name,
              "message": tweet.text,
              "site": tweet.user.url || '',
              "topic": user.topic,
              "hashtags": [...tweet.entities.hashtags],
              "link": `https://www.twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`,
              "id_string": tweet.id_str
            });
          }

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

  return database.saveTweets(tweets)
    .then(data => {
      return data;
    })
    .catch(error => {
      return error;
    });

};


async function getAllTweets() {
  let tweeters = await getTweeters();
  let tweets = await getTweets(tweeters);
  let savedTweets = await saveTweets(tweets);
}

getAllTweets();

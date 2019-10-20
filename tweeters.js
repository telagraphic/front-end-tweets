require('dotenv').config();

const twitter = require('./server/twitter.js');
const fs = require('fs');
const utilities = require('./server/utilities.js')
const database = require('./server/database/api');

async function getTweeters() {
  return new Promise((resolve, reject) => {
    fs.readFile('./server/json/tweeters.json', (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
};

async function getUserProfiles(user) {

  return new Promise((resolve, reject) => {
    let userProfile = [];

    twitter
      .get("statuses/user_timeline", {screen_name: user.handle, count: 1})
      .then(data => {

        data.forEach(function(tweet) {

          userProfile.push({
            "name": tweet.user.name,
            "handle": tweet.user.screen_name,
            "site": tweet.user.url || '',
            "topic": user.topic,
            "twitter_count": tweet.user.statuses_count,
            "twitter_page": `https://www.twitter.com/${tweet.user.screen_name}`,
            "twitter_pic": tweet.user.profile_image_url_https,
            "twitter_description": tweet.user.description,
            "twitter_followers": tweet.user.followers_count,
            "twitter_friends": tweet.user.friends_count
          });

        });

        resolve(userProfile);

      })
      .catch(error => {
        reject(error);
      });
  });
};

const flattenDeep = (arr) => Array.isArray(arr) ? arr.reduce( (a, b) => a.concat(flattenDeep(b)) , []) : [arr]

async function getProfiles(users) {

  let allTweeterProfiles = [];

  for (let index = 0; index < users.length; index++) {
    let tweeterProfiles = await getUserProfiles(users[index]);
    allTweeterProfiles.push(tweeterProfiles);
  }

  return flattenDeep(allTweeterProfiles);
};

async function saveTweeters(tweeters) {

  return database.saveTweeters(tweeters)
    .then(data => {
      return data;
    })
    .catch(error => {
      return error;
    });
};


async function getTweeterProfiles() {
  let tweeters = await getTweeters();
  let profiles = await getProfiles(tweeters);
  let tweeterProfiles = await saveTweeters(profiles);
}

getTweeterProfiles();

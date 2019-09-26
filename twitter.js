require('dotenv').config();
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



// could rewrite this code that just return the first line, then parse the tweets in the next function
async function getUserTweets(user) {
  // return twitter.get("statuses/user_timeline", {screen_name: user.handle, count: 1});


  return new Promise((resolve, reject) => {
    let userTweets = [];

    twitter
      .get("statuses/user_timeline", {screen_name: user.handle, count: 1})
      .then(data => {

        data.forEach(function(tweet) {
          userTweets.push({
            "created": tweet.created_at,
            "handle": tweet.user.screen_name,
            "text": tweet.text,
            "site": tweet.user.url,
            "topic": user.topic,
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

async function getTweets(users) {

  let allTweets = [];

  for (let index = 0; index < users.length; index++) {
    let user_tweet_list = await getUserTweets(users[index]);
    allTweets.push(user_tweet_list);
  }
  return allTweets;
}


async function getAllTweets() {
  let tweeters = await getTweeters();
  let tweets = await getTweets(tweeters);
  console.log(tweets);
}

getAllTweets();



// getTweeters()
//   .then(tweeters => {
//     return getTweets(tweeters);
//   })
//   .then(tweets => {
//     console.log('All tweets', tweets);
//   })
//   .catch(error => {
//     console.log(error);
//   });


// function getUserTweets(user) {
//
//   twitter
//     .get("statuses/user_timeline", {screen_name: user.handle, count: 1})
//     .then(data => {
//       data.forEach(function(tweet) {
        // user_tweets.push({
        //   created: tweet.created_at,
        //   handle: tweet.user.screen_name,
        //   text: tweet.text,
        //   site: tweet.user.url,
        //   topic: '',
        //   url: `https://www.twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
        // });
//       });
//     })
//     .catch(error => {
//       console.log(error);
//     });
// };




//
// async function getUserTweets(user) {
//   return twitter.get("statuses/user_timeline", {screen_name: user.handle, count: 1});
//   return new Promise((reject, resolve) => {
//
//
//   })
//
//   twitter
//     .get("statuses/user_timeline", {screen_name: user.handle, count: 1})
//     .then(data => {
//       return data;
//     })
//     .catch(error => {
//       console.log(error);
//     });
// };

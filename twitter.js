const Twitter = require('twitter-lite');
const fs = require('fs');

const twitter = new Twitter({
  subdomain: "api",
  consumer_key: "Bwvsu5c8NgcSjjxNG5onJCBK7", // from Twitter.
  consumer_secret: "VEobIrRgmzKMH07RbcuJFI90rB7YVCu4jNkP8EVKUoFN9xenCx", // from Twitter.
  access_token_key: "598754807-Ryn692wXnJWjCvognmqtcbfKsqXhXTdxeN4BDlAf", // from your User (oauth_token)
  access_token_secret: "yM8ZtjVsFVJXI8qV9mVskTkwpKadhrMZwoxem54IHyC9D" // from your User (oauth_token_secret)
});

function getTweeters() {
  return new Promise((resolve, reject) => {
    fs.readFile('tweeters.json', (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
};

function getUserTweets(users) {
  return new Promise((resolve, reject) => {

    let user_tweets = [];

    users.forEach(user => {

      twitter
        .get("statuses/user_timeline", {screen_name: user.handle, count: 1})
        .then(data => {
          data.forEach(function(user_tweet) {
            user_tweets.push({
              created: user_tweet.created_at,
              handle: user_tweet.user.screen_name,
              text: user_tweet.text,
              site: user_tweet.user.url,
              topic: '',
              url: `https://www.twitter.com/${user_tweet.user.screen_name}/status/${user_tweet.id_str}`
            });
          });
          // console.log(user_tweets);
        })
        .catch(error => {
          console.log(error);
        });
        // console.log(user_tweets);
    });
    // console.log(user_tweets);
    resolve(user_tweets);
  });
};


getTweeters()
  .then(tweeters => {
    return getUserTweets(tweeters);
  })
  .then(tweets => {
    console.log(tweets);
  })
  .catch(error => {
    console.log(error);
  });

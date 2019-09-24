const Twit = require('twit');
const fs = require('fs');

const twitter = new Twit({
  consumer_key:         'Bwvsu5c8NgcSjjxNG5onJCBK7',
  consumer_secret:      'VEobIrRgmzKMH07RbcuJFI90rB7YVCu4jNkP8EVKUoFN9xenCx',
  access_token:         '598754807-Ryn692wXnJWjCvognmqtcbfKsqXhXTdxeN4BDlAf',
  access_token_secret:  'yM8ZtjVsFVJXI8qV9mVskTkwpKadhrMZwoxem54IHyC9D',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
});

let tweeters;

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
      twitter.get('statuses/user_timeline', {screen_name: user.handle, count: 2}, function(error, data, response) {
        if (error) reject(error);

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

        return user_tweets;
      })
      .then(function(user_tweet) {
        console.log(user_tweet);
      })
      .catch(function(error) {
        console.log(error);
      });

    });
    // resolve(user_tweets);
  });
};



getTweeters()
  .then(tweeters => {
    // console.log(tweeters);
    return getUserTweets(tweeters);
  })
  .then(tweets => {
    // console.log(tweets);
  });

// write tweets to database

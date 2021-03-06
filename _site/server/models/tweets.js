const database = require('../database/connection');

async function fetchTweets() {

  return database.any("SELECT * FROM tweets WHERE created >= NOW() - INTERVAL '48 Hours' ORDER BY created DESC LIMIT 2")
    .then(data => {
      return data;
    })
    .catch(error => {
      return Error('Tweets are not available right now, check back later', error);
    });
}

async function fetchTweeters() {

  return database.any('SELECT * FROM tweeters ORDER BY handle ASC')
    .then(data => {
      return data;
    })
    .catch(error => {
      return Error('Tweeters are not available right now, check back later', error);
    })
}

function saveTweets(tweets) {

  return database.task(function(task) {
    let queries = [];

    tweets.forEach(tweet => {
      queries.push(task.none("INSERT INTO tweets (twittertime, created, handle, message, site, topic, hashtags, link, id_string) VALUES (${twittertime}, ${created}, ${handle}, ${message}, ${site}, ${topic}, ${hashtags}, ${link}, ${id_string}) ON CONFLICT(id_string) DO NOTHING", tweet));
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

}

function saveTweeters(tweeters) {

  return database.task(function(task) {
    let queries = [];

    tweeters.forEach(tweeter => {
      queries.push(task.none("INSERT INTO tweeters (name, handle, site, topic, twitter_count, twitter_page, twitter_pic, twitter_description, twitter_followers, twitter_friends) VALUES (${name}, ${handle}, ${site}, ${topic}, ${twitter_count}, ${twitter_page}, ${twitter_pic}, ${twitter_description}, ${twitter_followers}, ${twitter_friends}) ON CONFLICT(handle) DO NOTHING", tweeter));
    });

    return task.batch(queries);
  })
  .then(function(data) {
    console.log("Saved " + data.length + " tweeters!");
    return data;
  })
  .catch(function(error) {
    console.log("FAILED: ", error);
    return error;
  });
}

function updateTweeters(tweeters) {

  return database.task(function(task) {
    let queries = [];

    tweeters.forEach(tweeter => {
      queries.push(task.none("UPDATE tweeters SET name = ${name}, site = ${site}, topic = ${topic}, twitter_count = ${twitter_count}, twitter_page = ${twitter_page}, twitter_pic = ${twitter_pic}, twitter_description = ${twitter_description}, twitter_followers = ${twitter_followers}, twitter_friends = ${twitter_friends} WHERE handle = ${handle}", tweeter));
    });

    return task.batch(queries);
  })
  .then(function(data) {
    console.log("Saved " + data.length + " tweeters!");
    return data;
  })
  .catch(function(error) {
    console.log("FAILED: ", error);
    return error;
  });
}

function deleteTweets() {

  return database.result("DELETE FROM tweets WHERE created <= NOW() - INTERVAL '72 Hours'")
    .then(data => {
      console.log("DELETED: " + data.rowCount);
      return data;
    })
    .catch(error => {
      console.log(error);
      return error;
    });
}


module.exports = {
  fetchTweets : fetchTweets,
  fetchTweeters : fetchTweeters,
  saveTweets : saveTweets,
  saveTweeters : saveTweeters,
  updateTweeters : updateTweeters,
  deleteTweets : deleteTweets
}

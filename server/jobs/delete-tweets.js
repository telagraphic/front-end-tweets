require('dotenv').config();
const database = require('../models/tweets');

function deleteTweets() {
  return database.deleteTweets()
    .then(data => {
      console.log("DELETED: " + data);
    })
    .catch(error => {
      console.log("ERROR: " + error);
    });
}

deleteTweets();

require('dotenv').config();

const database = require('./server/database/api');


function deleteTweets() {
  database.deleteTweets
    .then(data => {
      console.log("DELETED: " + data);
    })
    .catch(error => {
      console.log("ERROR: " + error);
    });
}

deleteTweets();

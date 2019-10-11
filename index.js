require('dotenv').config();

const express = require('express');
const app = express();
const utilities = require('./utilities.js')
const database = require('./server/connection');
const hbs = require("express-handlebars");
const PORT = process.env.PORT || 3000;


app.engine(
  "hbs",
  hbs({
    partialsDir: ["views/partials"],
    extname: ".hbs",
    layoutsDir: "views",
    defaultLayout: "layouts/main"
  })
);

app.set("view engine", "hbs");
app.use(express.static(__dirname + '/public'));

app.listen(PORT, () => console.log(`Serving on ${PORT}`));

app.get('/', async (req, res) => {
  let tweetsFromDatabase = await fetchTweets();
  res.render('index', { tweets: tweetsFromDatabase });
});

app.get('/tweeters', (req, res) => {
  res.render('tweeters');
});


async function fetchTweets() {
  try {
    const tweetsFromDatabase = await database.any('SELECT * FROM tweets ORDER BY created DESC LIMIT 100');
    return tweetsFromDatabase;
  }
  catch(error) {
    console.log(error);
    return Error('Tweets are not available right now, check back later', error);
  }
}

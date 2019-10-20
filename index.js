require('dotenv').config();

const express = require('express');
const app = express();
const hbs = require("express-handlebars");
const database = require("./server/database/api");
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
  let tweets = await database.fetchTweets();
  res.render('index', { tweets: tweets });
});

app.get('/tweeters', async (req, res) => {
  let tweeters = await database.fetchTweeters();
  res.render('tweeters', { tweeters: tweeters });
});

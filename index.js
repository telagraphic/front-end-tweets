require('dotenv').config();

const express = require('express');
const app = express();
const hbs = require("express-handlebars");
const database = require("./server/database/api");
const path = require('path');

const PORT = process.env.PORT || 3000;


app.use(express.static(__dirname + '/public'));
app.set("view engine", "hbs");
app.set('views', path.join(__dirname, "/public/views"));
app.engine(
  "hbs",
  hbs({
    partialsDir: ["public/views/partials"],
    extname: ".hbs",
    layoutsDir: path.join(__dirname, "public/views/layouts"),
    defaultLayout: path.join(__dirname, "public/views/layouts/main")
  })
);

app.listen(PORT, () => console.log(`Serving on ${PORT}`));

app.get('/', async (req, res) => {
  let tweets = await database.fetchTweets();
  res.render('index', { tweets: tweets });
});

app.get('/tweeters', async (req, res) => {
  let tweeters = await database.fetchTweeters();
  res.render('tweeters', { tweeters: tweeters });
});

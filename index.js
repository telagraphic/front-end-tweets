require('dotenv').config();

const express = require('express');
const app = express();
const exphbs = require("express-handlebars");
const database = require("./server/database/api");
const path = require('path');
const dayjs = require('dayjs');

const PORT = process.env.PORT || 3000;


app.use(express.static(__dirname + '/public'));

const hbs = exphbs.create({
  partialsDir: ["public/views/partials"],
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "public/views/layouts"),
  defaultLayout: path.join(__dirname, "public/views/layouts/main"),
  helpers: {
    formatDate: function(date) {
      return dayjs(date).format('DD/MM/YYYY [@]HH:mmA')
    }
  }
});

app.set("view engine", "hbs");
app.set('views', path.join(__dirname, "/public/views"));
app.engine( "hbs", hbs.engine);

app.listen(PORT, () => console.log(`Serving on ${PORT}`));

app.get('/', async (req, res) => {
  let tweets = await database.fetchTweets();
  res.render('index', { tweets: tweets });
});

app.get('/tweeters', async (req, res) => {
  let tweeters = await database.fetchTweeters();
  res.render('tweeters', { tweeters: tweeters });
});

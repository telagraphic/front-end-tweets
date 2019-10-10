create table if not exists tweets (
  id serial,
  twittertime varchar not null,
  created timestamp not null,
  handle varchar not null,
  message varchar null,
  site varchar null,
  topic varchar not null,
  hashtags varchar,
  link varchar not null,
  id_string varchar not null unique
);

-- "INSERT INTO tweets (twittertime, created, handle, message, site, topic, hashtags, link, id_string) VALUES (${twittertime}, ${created}, ${handle}, ${message}, ${site}, ${topic}, ${hashtags}, ${link}, ${id_string}) ON CONFLICT(id_string) DO NOTHING", tweet)


-- select * from tweets;
-- delete from tweets;

-- create table if not exists tweeters (
--   id serial,
--   name varchar not null,
--   handle varchar not null,
--   site varchar not null,
--   topic varchar not null,
--   twitter varchar not null
-- );


-- "created": utilities.twitterDate(tweet.created_at),
-- "handle": tweet.user.screen_name,
-- "text": tweet.text,
-- "site": tweet.user.url,
-- "topic": user.topic,
-- "hashtags": [...tweet.entities.hashtags],
-- "url": `https://www.twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
-- });
--
-- {
--   "name": "Dan Abramov",
--   "handle": "dan_abramov",
--   "site": "overreacted.io",
--   "topic": "javascript",
--   "twitter": "https://twitter.com/dan_abramov"
-- },

-- run sql script
-- psql -h ec2-54-235-246-201.compute-1.amazonaws.com -p 5432 -d db8ab9p9ordi23 -U hztnjjanxphpec -f server/database.sql sslmode=disable;

-- login to psql
-- heroku pg:psql --app front-end-tweets

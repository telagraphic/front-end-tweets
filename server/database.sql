create table if not exists tweets (
  id serial,
  twittertime varchar not null,
  created timestamp not null,
  handle varchar not null,
  message varchar,
  site varchar not null,
  topic varchar not null,
  hashtags varchar,
  link varchar not null
);

select * from tweets;
delete from tweets;

create table if not exists tweeters (
  id serial,
  name varchar not null,
  handle varchar not null,
  site varchar not null,
  topic varchar not null,
  twitter varchar not null
);


insert into tweeters values (default, 'Daniel Eden', 'dte', 'daneden.me', 'css', 'https://twitter.com/dte');
insert into tweeters values (default, 'Nicole Sullivan', 'stubbornella', 'stubbornella.org', 'css', 'https://twitter.com/stubbornella');
insert into tweeters values (default, 'Val Head', 'vlh', 'valhead.com', 'css', 'https://twitter.com/vlh');




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

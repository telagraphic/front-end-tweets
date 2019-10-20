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

create table if not exists tweeters (
  id serial,
  name varchar null,
  handle varchar not null unique,
  site varchar null,
  topic varchar not null,
  twitter_count varchar not null,
  twitter_page varchar not null,
  twitter_pic varchar null,
  twitter_description varchar null,
  twitter_followers varchar null,
  twitter_friends varchar null
)

-- COPY tweeters(name,handle,site,topic,twitter_count,twitter_page,twitter_pic,twitter_description,twitter_followers,twitter_friends) FROM 'server/database/json/tweeters.csv' DELIMITER ',' CSV HEADER;

-- \copy tweeters FROM 'server/json/tweeters.csv' DELIMITER ',' CSV HEADER

-- select * from tweets;
-- delete from tweets;

-- run sql script
-- psql -h ec2-54-235-246-201.compute-1.amazonaws.com -p 5432 -d db8ab9p9ordi23 -U hztnjjanxphpec -f server/database/database.sql sslmode=disable;

-- login to psql
-- heroku pg:psql --app front-end-tweets

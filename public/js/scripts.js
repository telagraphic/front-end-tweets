const tweets = Array.from(document.getElementsByClassName("tweet__container"));

tweets.forEach(function(tweet) {
  tweet.addEventListener('mouseenter', hoverEnter);
  tweet.addEventListener('mouseleave', hoverExit);
});

function hoverEnter(event) {
  let tweetMessage = event.target.children[0];
  let tweetHandle = event.target.children[1].children[0].children[0];

  tweetMessage.style.color = '#161616';
  tweetHandle.style.color = '#1DA1F2';
}

function hoverExit(event) {
  let tweetMessage = event.target.children[0];
  let tweetHandle = event.target.children[1].children[0].children[0];

  tweetMessage.style.color = '#657786';
  tweetHandle.style.color = '#161616';
}


const tweeters = Array.from(document.getElementsByClassName("tweeter__profile"));

tweeters.forEach(function(tweeter) {
  tweeter.addEventListener('mouseenter', tweeterMouseEnter);
  tweeter.addEventListener('mouseleave', tweeterMouseExit);
});

function tweeterMouseEnter(event) {
  let profile = event.target;
  let name = event.target.children[0].children[0];
  let pic = event.target.children[1].children[0].children[0];
  let description = event.target.children[2].children[0];

  profile.style.background = "#F5F8FA";

  pic.style.border = '2px solid black';

  name.style.color = "#1DA1F2";
  description.style.color = "#161616";

}

function tweeterMouseExit(event) {
  let profile = event.target;
  let name = event.target.children[0].children[0];
  let pic = event.target.children[1].children[0].children[0];
  let description = event.target.children[2].children[0];

  profile.style.background = "#1DA1F2";

  pic.style.border = '2px solid #C9E8F5';

  name.style.color = "#C9E8F5";
  description.style.color = "#C9E8F5";
}


const page = window.location.pathname;
const pageNavigation = document.querySelector(".page__nav");
if (page === "/tweeters") {
  pageNavigation.style.background = "#1DA1F2";
}

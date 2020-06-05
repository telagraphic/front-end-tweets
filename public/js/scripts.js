barba.use(barbaCss);

const pageNavigation = document.querySelector(".page__nav");

const tweetersNavBorder = () => {
  const pageNav = document.querySelector(".page__nav");
  const tweetersPage = document.querySelector('.tweeters');


  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio <= 1) {
        console.log("intersecting!");
        pageNavigation.classList.add('nav-border-on-scroll');
      } else {
        console.log("not intersecting!");
        pageNavigation.classList.remove('nav-border-on-scroll');
      }
    });
  },
  {
    threshold: [.1]
  });

  navObserver.observe(tweetersPage);
}


barba.init({
  transitions: [
    {
      name: "fade",
      beforeEnter({current, next, trigger}) {
        window.scrollTo({ top: 0, behavior: "smooth"});
      }
    }
  ],
  views: [
    {
      namespace: "tweeters",
      beforeEnter() {
        pageNavigation.style.background = "#1DA1F2";

      },
      beforeLeave() {
        if (window.innerWidth <= 672) {
          pageNavigation.style.background = "#1DA1F2";
        } else {
          pageNavigation.style.background = "transparent";
          pageNavigation.style.border = 'none';
        }
      }
    }
  ]
});

const tweets = Array.from(document.getElementsByClassName("tweet"));

tweets.forEach(function(tweet) {
  tweet.addEventListener('mouseenter', hoverEnter);
  tweet.addEventListener('mouseleave', hoverExit);
});

function hoverEnter(event) {
  let tweetMessage = event.target.querySelector('.tweet__status-quote');
  let tweetHandle = event.target.querySelector('.tweet__handle-link-text');

  tweetMessage.style.color = '#161616';
  tweetHandle.style.color = '#6a6a6a';
}

function hoverExit(event) {
  let tweetMessage = event.target.querySelector('.tweet__status-quote');
  let tweetHandle = event.target.querySelector('.tweet__handle-link-text');

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

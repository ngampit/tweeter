/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Toy Data 

// Test / driver code (temporary). Eventually will get this from the server.
// const tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//     "handle": "@SirIsaac"
//   },
//   "content": {
//     "text": "If I have seen further it is by standing on the shoulders of giants"
//   },
//   "created_at": 1461116232227
// }



// // Fake data taken from initial-tweets.json
// const data = [{
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]
// sort output by descending order




//console.log(createTweetElement(tweetData));
$(document).ready(function () {

  const createTweetElement = function (tweetData) {
    const dateCreate = tweetData.created_at;
    const Diff = Date.now() - dateCreate
    const dateDiff = Math.round(Diff /  86400000)
    let tweet = `<article class = "tweet-header">
     <div class = "head-tweet-line">
     <h5><span><img class = "avatar" src= ${tweetData.user.avatars}></span>${tweetData.user.name}</h5>
     <h5 class="hide">${tweetData.user.handle}</h5>
      </div>
       <p id = "tweet-content">${tweetData.content.text}</p>
      </div>
       <hr id = "hr">
      <div class = "tweet-footer">
       <h6>${dateDiff}<span>  days ago</span></h6>
       <img class = "tweet-logo" src="/images/retweet.jpeg" 
     </article>`
  
    return tweet;
  
  }



  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (let tweet1 of tweets) {
      let tweetOutput = createTweetElement(tweet1);
      $('.tweets-container').prepend(tweetOutput);
    }
  };
  const $tweetForm = $('#tweet-form');


  $tweetForm.on('submit', function (submitEvent) {
  
    submitEvent.preventDefault();
    const serializedTweetFormData = $(this).serialize(); 

  
    
    $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/tweets',
      data: serializedTweetFormData
    }).then(() => {
       $.ajax({
       type: "GET",
       url:'http://localhost:8080/tweets',
      }).then((response) => renderTweets([response[response.length -1]]));
      $("#tweet-form")[0].reset();
      $('.counter').html(140);
      $('.counter').removeClass("red");
      $('.hide-err').slideUp("normal");
      })
      .catch((retrievedServerError) => {
      alert(`Sending tweet with text ${serializedTweetFormData} failed!  Got Error ${retrievedServerError.statusCode}`);
    });
    
  });

  const loadTweet = function () {
    console.log('load tweet is running');
    $.ajax({
    type: "GET",
    url:'http://localhost:8080/tweets',
   }).then((response) => renderTweets(response));

  }
  loadTweet();

  // const  sortJsonAscending = function(response) {
  //   return response.sort((a, b) => parseFloat(b.created_at) - parseFloat(a.created_at));
  // }

});







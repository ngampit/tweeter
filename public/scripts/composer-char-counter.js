$(document).ready(function() {
    // --- our code goes here --
const logger = function() {
    const logLen = this.value.length;
    const allowText = 140;
    const leftText = allowText - logLen; 
    $('.counter').html(leftText);
  if (leftText < 0) {
    $( "#tweet-form" ).click(function( event ) {
        $('.hide-err').slideDown('show()');
    }); 
    $('#tweet-form').click(function(e) {
        e.preventDefault();
    });
    $('.counter').html(leftText);
    $('.counter').addClass("red");
  }
  else { $('.counter').removeClass("red"); }
}
    $('#tweet-text').on('input',logger);
});

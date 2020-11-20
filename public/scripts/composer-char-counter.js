$(document).ready(function() {
    // --- our code goes here --
const logger = function() {
    const logLen = this.value.length;
//    console.log(logLen)
    const allowText = 140;
    const leftText = allowText - logLen; 
    $('.counter').html(leftText);
if (leftText < 0) {
    $('.counter').html(leftText);
    $('.counter').addClass("red");
    $('.hide-err').show();

}}
     $('#tweet-text').on('input',logger);
});

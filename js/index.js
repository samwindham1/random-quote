var colors= ['#eeeeee', '#d1d3be', '#c2ae7c', '#d0dddd'];
var color = 0;

var currentQuote = '';
var currentAuthor = '';

function getQuote() {
  $.ajax({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token token= fcb962a7728ce7c1059f8febde45c679'
    },
    url: 'https://favqs.com/api/qotd',
    success: function(r) {
      if (typeof r === 'string') {
        r = JSON.parse(r);
      }
      currentQuote = r.quote.body;
      currentAuthor = r.quote.author;
      
      if(currentQuote.length > 80) {
        $('.quote-text').css("font-size", '.85em');
      }
      if(currentQuote.length > 120) {
        getQuote();
        return;
      }
      $('.quote-text').html(currentQuote);
      $('.quote-author').html(currentAuthor);
      
      $("html body").css('backgroundColor', colors[color]);
      color = (color + 1)%colors.length;
      
    }
  });
}

$(document).ready(function() {
  getQuote();
  $('.new-quote-btn').on('click', getQuote);
  $('.twitter-btn').on('click', function() {
    openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" -' + currentAuthor));
  });
});

function openURL(url){
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}
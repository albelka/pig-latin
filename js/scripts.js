function translator (sentence) {
  if(sentence.search(/[^aeiou]/i) === 0) {
    return true;
  } else if (sentence) {
    return sentence + "ay";
  } else {
    return sentence;
  }
};

// UI logic under this line

$(function() {
  $("form#pig-latin").submit(function(event) {
    event.preventDefault();

    var sentence = $("#sentence").val();
    var result = translator(sentence);
    $("#result").text(result);
  });
});

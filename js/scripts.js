function translator (word) {
  if(word.search(/[^aeiou]/i) === 0 && word.search(/[a-z]/i) === 0) {
    console.log("enter first if");
    for(var i=0; i < (word.search(/[aeiou]/i)); i++){
      console.log(word.search(/[aeiou]/i))
        if(word[i+1] === "y"){
          word = word.concat(word[0]);
          word = word.replace(word[0], "");

          i = word.search(/[aeiou]/i);
        } else if(word[i] === "q"){
          word = word.concat(word[0]);
          word = word.replace(word[0], "");

          if(word[i] === "u"){
            word = word.concat(word[0]);
            word = word.replace(word[0], "");
            i--;
          }
        } else {
          word = word.concat(word[0]);
          word = word.replace(word[0], "");
          i--;
        }
    };
    return word + "ay";
  } else if (word.search(/[aeiou]/i) === 0) {
    return word + "ay";
  } else {
    return word;
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

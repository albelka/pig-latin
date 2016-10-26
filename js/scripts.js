// This will apply pig latin rules to the word it's called on.
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
//
function processSentence (sentence){
  var arrayOfWords = sentence.split(" ");
  var arrayOfPigs = [];
  arrayOfWords.forEach(function(word){
    console.log("Enters forEach " + word);
    if(word.search(/\W/) > -1){
      console.log("enters forEach -> if " + word);
      // for punctuation in front of word
      var punctuationFront = "";
      for (var i = 0; i < word.search(/\w/); i++){
        if (/\W/g.test(word[i])){
        punctuationFront += word.slice(i,i+1);
        word = word.replace(word[0], "");

        i--;
        }
      }
      console.log("after punctuationFront: " + word + "," + punctuationFront);
      // for punctuation behind word
      var punctuationEnd = "";
      for (var i = word.length-1; i > 0; i--){
        if (/\w/.test(word[i])) {
          i = 0;
        } else if (/\W/.test(word[i])){
        punctuationEnd = word.slice(i,i+1) + punctuationEnd;
        word = word.replace(word[i], "");
        }
      }
      console.log("after punctuationEnd: " + word + "," + punctuationEnd);
      word = translator(word);
      word = punctuationFront + word + punctuationEnd;
      arrayOfPigs.push(word);
      console.log("translated: " + word);
    } else {
      console.log("enters forEach -> else " + word);
      word = translator(word);
      arrayOfPigs.push(word);
      console.log("translated: " + word);
    }
  });
  return arrayOfPigs.join(" ");
}

// UI logic under this line

$(function() {
  $("form#pig-latin").submit(function(event) {
    event.preventDefault();

    var sentence = $("#sentence").val();
    var result = processSentence(sentence);
    $("#result").text(result);
  });
});

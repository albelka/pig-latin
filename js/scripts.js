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
// This will take the input, split it into an array, check for punctuation, apply translator as appropriate, then push each translated word to a new array for display to the user.
function processSentence (sentence){
  var arrayOfWords = sentence.split(" ");   // Turns the sentence(which is a string) into an array by splitting it at every space.
  var arrayOfPigs = [];   // An empty array that we will push the translated words into.
  // This forEach loop will run through each word in arrayOfWords to check for punctuation. The else statement inside it (no punctuation) just applies translator and pushes the translated word to arrayOfPigs.
  arrayOfWords.forEach(function(word){
    console.log("Enters forEach " + word);
    if(word.search(/\W/) > -1){   // checks if there is ANY punctuation in the word
      console.log("enters forEach -> if " + word);
      // for punctuation in front of the word; runs through each punctuation character and saves it in the punctuationFront variable, then removes it.
      var punctuationFront = "";
      for (var i = 0; i < word.search(/\w/); i++){
        if (/\W/g.test(word[i])){
        punctuationFront += word.slice(i,i+1);
        word = word.replace(word[0], "");

        i--;
        }
      }
      console.log("after punctuationFront: " + word + "," + punctuationFront);
      // for punctuation behind the word; same as punctuationFront but it runs through punctuation starting from the last character and moves toward the front.
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
      // Translates the word (stripped of its punctuation), then re-adds the punctuation to their original locations, in their original orders (saved in punctuationFront and punctuationEnd), then pushes the result to arrayOfPigs.
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
  return arrayOfPigs.join(" ");   // Turns arrayOfPigs into a string with each word separated by spaces, for display to the user.
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



const tester = require('./test_runner.js');


/*
================================================================================
Given an array of scores, return true if each score is equal or greater than the
one before. The array will be length 2 or more.

Has 1 parameters (scores: number[])
returns boolean
================================================================================*/

function scoresIncreasing(scores) {
  let a = 0;
  let b = 0;
  let value = false;
  for(let i = 0; i < scores.length - 1; i++) {
    a = scores[i];
    b = scores[i + 1];
    b >= a ? value = true : value = false;
    if (!value) {
      return value;
    }
  }
  return value;
}

tester.test(scoresIncreasing, [
  {input: [[1, 3, 4]], output: true},
  {input: [[1, 3, 2]], output: false},
  {input: [[1, 1, 4]], output: true},
  {input: [[1, 1, 2, 4, 4, 7]], output: true},
  {input: [[1, 1, 2, 4, 3, 7]], output: false},
  {input: [[-5, 4, 11]], output: true},
]);




/*
================================================================================
Given an array of scores, return true if there are scores of 100 next to each
other in the array. The array length will be at least 2.

Has 1 parameters (scores: number[])
returns boolean
================================================================================*/

function scores100(scores) {
  let a = 0;
  let b = 0;
  let value = false;
  for(let i = 0; i < scores.length - 1; i++) {
    a = scores[i];
    b = scores[i + 1];
    b === 100 && a === 100 ? value = true : value = false;
    if (value) {
      return value;
    }
  }
  return value;
}

tester.test(scores100, [
  {input: [[1, 100, 100]], output: true},
  {input: [[1, 100, 99, 100]], output: false},
  {input: [[100, 1, 100, 100]], output: true},
  {input: [[100, 1, 100, 1]], output: false},
  {input: [[1, 2, 3, 4, 5]], output: false},
  {input: [[1, 2, 100, 4, 5]], output: false},
]);




/*
================================================================================
Given an array of scores sorted in increasing order, return true if the array
contains 3 adjacent scores that differ from each other by at most 2, such as
with {3, 4, 5} or {3, 5, 5}.

Has 1 parameters (scores: number[])
returns boolean
================================================================================*/

function scoresClump(scores) {
  let a = 0;
  let b = 0;
  let c = 0;
  for(let i = 0; i < scores.length - 2; i++) {
    a = scores[i];
    b = scores[i + 1];
    c = scores[i + 2];
    if (Math.max(a, b, c) - Math.min(a, b, c) <= 2 ) {
      return true;
    }
  }
  return false ;
}

tester.test(scoresClump, [
  {input: [[3, 4, 5]], output: true},
  {input: [[3, 4, 6]], output: false},
  {input: [[1, 3, 5, 5]], output: true},
  {input: [[2, 4, 5, 6]], output: true},
  {input: [[2, 4, 5, 7]], output: false},
  {input: [[2, 4, 4, 7]], output: true},
  {input: [[3, 3, 6, 7, 9]], output: false},
  {input: [[3, 3, 7, 7, 9]], output: true},
  {input: [[4, 5, 8]], output: false},
]);





/*
================================================================================
Given an array of scores, compute the int average of the first half and the
second half, and return whichever is larger. We'll say that the second half
begins at index length/2. The array length will be at least 2. To practice
decomposition, write a separate helper method int average(int[] scores, int
start, int end) {  which computes the average of the elements between indexes
start..end. Call your helper method twice to implement scoresAverage(). Write
your helper method after your scoresAverage() method in the JavaBat text area.
Normally you would compute averages with doubles, but here we use ints so the
expected results are exact.

Has 1 parameters (scores: number[])
returns number
================================================================================*/

function scoresAverage(scores) {
  let scoresCopy = scores.slice(0);
  let scoresFirstHalf = scoresCopy.slice(0, scoresCopy.length / 2);
  let scoresSecondHalf = scoresCopy.slice(scoresCopy.length / 2);
  let firstAvg = 0;
  let secondAvg = 0;
  for(let i = 0; i < scoresFirstHalf.length; i++) {
    firstAvg += scoresFirstHalf[i];
  }
  for(let i = 0; i < scoresSecondHalf.length; i++) {
    secondAvg += scoresSecondHalf[i];
  }
  firstAvg = firstAvg / (scoresFirstHalf.length);
  secondAvg = secondAvg / (scoresSecondHalf.length);
  return firstAvg >= secondAvg ? firstAvg : secondAvg ;
}

tester.test(scoresAverage, [
  {input: [[2, 2, 4, 4]], output: 4},
  {input: [[4, 4, 4, 2, 2, 2]], output: 4},
  {input: [[3, 4, 5, 1, 2, 3]], output: 4},
  {input: [[5, 6]], output: 6},
  {input: [[5, 4]], output: 5},
  {input: [[5, 4, 5, 6, 2, 1, 2, 3]], output: 5},
]);





/*
================================================================================
Given an array of strings, return the count of the number of strings with the
given length.

Has 2 parameters (words: string[], len: number)
returns number
================================================================================*/

function wordsCount(words, len) {
  let count = 0;
  words.forEach(function (word){
    word.length === len ? count++ : null ;
  });
  return count;
}

tester.test(wordsCount, [
  {input: [["a", "bb", "b", "ccc"], 1], output: 2},
  {input: [["a", "bb", "b", "ccc"], 3], output: 1},
  {input: [["a", "bb", "b", "ccc"], 4], output: 0},
  {input: [["xx", "yyy", "x", "yy", "z"], 1], output: 2},
  {input: [["xx", "yyy", "x", "yy", "z"], 2], output: 2},
  {input: [["xx", "yyy", "x", "yy", "z"], 3], output: 1},
]);





/*
================================================================================
Given an array of strings, return a new array containing the first N strings. N
will be in the range 1..length.

Has 2 parameters (words: string[], n: number)
returns string[]
================================================================================*/

function wordsFront(words, n) {
  let wordReturn = [];
  for(let i = 0; i < n; i++) {
    wordReturn.push(words[i]);
  }
  return wordReturn;
}

tester.test(wordsFront, [
  {input: [["a", "b", "c", "d"], 1], output: ["a"]},
  {input: [["a", "b", "c", "d"], 2], output: ["a", "b"]},
  {input: [["a", "b", "c", "d"], 3], output: ["a", "b", "c"]},
  {input: [["a", "b", "c", "d"], 4], output: ["a", "b", "c", "d"]},
  {input: [["Hi", "There"], 1], output: ["Hi"]},
  {input: [["Hi", "There"], 2], output: ["Hi", "There"]},
]);






/*
================================================================================
Given an array of strings, return a new List (e.g. an ArrayList) where all the
strings of the given length are omitted. See wordsWithout() below which is more
difficult because it uses arrays.

Has 2 parameters (words: string[], len: number)
returns List
================================================================================*/

// Good case for a filter!
function wordsWithoutList(words, len) {
  let wordReturn = [];
  words.forEach(word => {
    word.length === len ? null : wordReturn.push(word);
  });
  return wordReturn;
}

tester.test(wordsWithoutList, [
  {input: [["a", "bb", "b", "ccc"], 1], output: ["bb", "ccc"]},
  {input: [["a", "bb", "b", "ccc"], 3], output: ["a", "bb", "b"]},
  {input: [["a", "bb", "b", "ccc"], 4], output: ["a", "bb", "b", "ccc"]},
  {input: [["xx", "yyy", "x", "yy", "z"], 1], output: ["xx", "yyy", "yy"]},
  {input: [["xx", "yyy", "x", "yy", "z"], 2], output: ["yyy", "x", "z"]},
]);

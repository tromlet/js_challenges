const tester = require('./test_runner.js');



/*
================================================================================
Given a positive int n, return true if it contains a 1 digit. Note: use % to get
the rightmost digit, and / to discard the rightmost digit.

Has 1 parameters (n: number)
returns boolean
================================================================================*/

// function hasOne(n) {
//   let numStr = n.toString();
//   for (let i = 0; i < numStr.length; i++) {
//     if (numStr[i] === "1") return true;
//   }
//   return false;
// }

function hasOne(n) {
  if (n < 10 && n !== 1) {
    return false;
  } else if (n === 1) {
    return true;
  } else if (n % 10 === 1) {
    return true;
  } else {
    return hasOne(Math.floor(n / 10));
  }
}

tester.test(hasOne, [
  {input: [10], output: true},
  {input: [22], output: false},
  {input: [220], output: false},
  {input: [212], output: true},
  {input: [1], output: true},
  {input: [9], output: false},
  {input: [211112], output: true},
  {input: [121121], output: true},
  {input: [222222], output: false},
  {input: [56156], output: true},
  {input: [56556], output: false},
]);





/*
================================================================================
We'll say that a positive int divides itself if every digit in the number
divides into the number evenly. So for example 128 divides itself since 1, 2,
and 8 all divide into 128 evenly. We'll say that 0 does not divide into anything
evenly, so no number with a 0 digit divides itself. Note: use % to get the
rightmost digit, and / to discard the rightmost digit.

Has 1 parameters (n: number)
returns boolean
================================================================================*/

function dividesSelf(n) {
  let numStr = n.toString();
  for (let i = 0; i < numStr.length; i++) {
    if (n % Number(numStr[i]) !== 0) return false;
  }
  return true;
}

// function dividesSelf(n) {
//   let input = n;
//   let digit = n % 10;
//   if (n % digit === 0)
//   dividesSelf(Math.floor(n / 10));
// }

tester.test(dividesSelf, [
  {input: [128], output: true},
  {input: [12], output: true},
  {input: [120], output: false},
  {input: [122], output: true},
  {input: [13], output: false},
  {input: [32], output: false},
  {input: [22], output: true},
  {input: [42], output: false},
  {input: [212], output: true},
  {input: [213], output: false},
  {input: [162], output: true},
]);




/*
================================================================================
Given an array of positive ints, return a new array of length "count" containing
the first even numbers from the original array. The original array will contain
at least "count" even numbers.

Has 2 parameters (nums: number[], count: number)
returns number[]
================================================================================*/

// Good case for a filter!
function copyEvens(nums, count) {
  let returnArr = [];
  let increment = 0;
  while (returnArr.length < count) {
    nums[increment] % 2 === 0 ? returnArr.push(nums[increment]) : null ;
    increment++;
  }
  return returnArr;
}

tester.test(copyEvens, [
  {input: [[3, 2, 4, 5, 8], 2], output: [2, 4]},
  {input: [[3, 2, 4, 5, 8], 3], output: [2, 4, 8]},
  {input: [[6, 1, 2, 4, 5, 8], 3], output: [6, 2, 4]},
  {input: [[6, 1, 2, 4, 5, 8], 4], output: [6, 2, 4, 8]},
  {input: [[3, 1, 4, 1, 5], 1], output: [4]},
  {input: [[2], 1], output: [2]},
  {input: [[6, 2, 4, 8], 2], output: [6, 2]},
  {input: [[6, 2, 4, 8], 3], output: [6, 2, 4]},
  {input: [[6, 2, 4, 8], 4], output: [6, 2, 4, 8]},
  {input: [[1, 8, 4], 1], output: [8]},
  {input: [[1, 8, 4], 2], output: [8, 4]},
  {input: [[2, 8, 4], 2], output: [2, 8]},
]);





/*
================================================================================
We'll say that a positive int n is "endy" if it is in the range 0..10 or 90..100
(inclusive). Given an array of positive ints, return a new array of length
"count" containing the first endy numbers from the original array. Decompose out
a separate isEndy(int n) method to test if a number is endy. The original array
will contain at least "count" endy numbers.

Has 2 parameters (nums: number[], count: number)
returns number[]
================================================================================*/

function isEndy(n) {
  return (n >= 0 && n <= 10) || (n >= 90 && n <= 100);
}

function copyEndy(nums, count) {
  let returnArr = [];
  nums.forEach(num => {
    if (isEndy(num)) returnArr.push(num);
  });
  return returnArr.slice(0, count);
}

tester.test(copyEndy, [
  {input: [[9, 11, 90, 22, 6], 2], output: [9, 90]},
  {input: [[9, 11, 90, 22, 6], 3], output: [9, 90, 6]},
  {input: [[12, 1, 1, 13, 0, 20], 2], output: [1, 1]},
  {input: [[12, 1, 1, 13, 0, 20], 3], output: [1, 1, 0]},
  {input: [[0], 1], output: [0]},
  {input: [[10, 11, 90], 2], output: [10, 90]},
  {input: [[90, 22, 100], 2], output: [90, 100]},
  {input: [[12, 11, 10, 89, 101, 4], 1], output: [10]},
  {input: [[13, 2, 2, 0], 2], output: [2, 2]},
  {input: [[13, 2, 2, 0], 3], output: [2, 2, 0]},
  {input: [[13, 2, 13, 2, 0, 30], 2], output: [2, 2]},
  {input: [[13, 2, 13, 2, 0, 30], 3], output: [2, 2, 0]},
]);





/*
================================================================================
Given 2 arrays that are the same length containing strings, compare the 1st
string in one array to the 1st string in the other array, the 2nd to the 2nd and
so on. Count the number of times that the 2 strings are non-empty and start with
the same char. The strings may be any length, including 0.

Has 2 parameters (a: string[], b: string[])
returns number
================================================================================*/

function matchUp(a, b) {
  let count = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i][0] !== undefined && b[i][0] !== undefined) {
      a[i][0] === b[i][0] ? count++ : null ;
    }
  }
  return count;
}

tester.test(matchUp, [
  {input: [["aa", "bb", "cc"], ["aaa", "xx", "bb"]], output: 1},
  {input: [["aa", "bb", "cc"], ["aaa", "b", "bb"]], output: 2},
  {input: [["aa", "bb", "cc"], ["", "", "ccc"]], output: 1},
  {input: [["", "", "ccc"], ["aa", "bb", "cc"]], output: 1},
  {input: [["", "", ""], ["", "bb", "cc"]], output: 0},
  {input: [["aa", "bb", "cc"], ["", "", ""]], output: 0},
  {input: [["aa", "", "ccc"], ["", "bb", "cc"]], output: 1},
  {input: [["x", "y", "z"], ["y", "z", "x"]], output: 0},
  {input: [["", "y", "z"], ["", "y", "x"]], output: 1},
  {input: [["x", "y", "z"], ["xx", "yyy", "zzz"]], output: 3},
  {input: [["x", "y", "z"], ["xx", "yyy", ""]], output: 2},
  {input: [["b", "x", "y", "z"], ["a", "xx", "yyy", "zzz"]], output: 3},
  {input: [["aaa", "bb", "c"], ["aaa", "xx", "bb"]], output: 1},
]);




/*
================================================================================
The "key" array is an array containing the correct answers to an exam, like
{"a", "a", "b", "b"}. the "answers" array contains a student's answers, with "?"
representing a question left blank. The two arrays are not empty and are the
same length. Return the score for this array of answers, giving +4 for each
correct answer, -1 for each incorrect answer, and +0 for each blank answer.

Has 2 parameters (key: string[], answers: string[])
returns number
================================================================================*/

function scoreUp(key, answers) {
  let score = 0;
  for (let i = 0; i < key.length; i++) {
    switch (answers[i]) {
      case "?":
        score += 0;
        break;
      case key[i]:
        score += 4;
        break;
      default:
        score -= 1;
    }
  }
  return score;
}

tester.test(scoreUp, [
  {input: [["a", "a", "b", "b"], ["a", "c", "b", "c"]], output: 6},
  {input: [["a", "a", "b", "b"], ["a", "a", "b", "c"]], output: 11},
  {input: [["a", "a", "b", "b"], ["a", "a", "b", "b"]], output: 16},
  {input: [["a", "a", "b", "b"], ["?", "c", "b", "?"]], output: 3},
  {input: [["a", "a", "b", "b"], ["?", "c", "?", "?"]], output: -1},
  {input: [["a", "a", "b", "b"], ["c", "?", "b", "b"]], output: 7},
  {input: [["a", "a", "b", "b"], ["c", "?", "b", "?"]], output: 3},
  {input: [["a", "b", "c"], ["a", "c", "b"]], output: 2},
  {input: [["a", "a", "b", "b", "c", "c"], ["a", "c", "a", "c", "a", "c"]], output: 4},
  {input: [["a", "a", "b", "b", "c", "c"], ["a", "c", "?", "?", "a", "c"]], output: 6},
  {input: [["a", "a", "b", "b", "c", "c"], ["a", "c", "?", "?", "c", "c"]], output: 11},
  {input: [["a", "b", "c"], ["a", "b", "c"]], output: 12},
]);





/*
================================================================================
Given an array of strings, return a new array without the strings that are equal
to the target string. One approach is to count the occurrences of the target
string, make a new array of the correct length, and then copy over the correct
strings.

Has 2 parameters (words: string[], target: string)
returns string[]
================================================================================*/

function wordsWithout(words, target) {
  let returnArr = [];
  words.forEach(word => {
    word === target ? null : returnArr.push(word) ;
  });
  return returnArr;
}

tester.test(wordsWithout, [
  {input: [["a", "b", "c", "a"], "a"], output: ["b", "c"]},
  {input: [["a", "b", "c", "a"], "b"], output: ["a", "c", "a"]},
  {input: [["a", "b", "c", "a"], "c"], output: ["a", "b", "a"]},
  {input: [["b", "c", "a", "a"], "b"], output: ["c", "a", "a"]},
  {input: [["xx", "yyy", "x", "yy", "x"], "x"], output: ["xx", "yyy", "yy"]},
  {input: [["xx", "yyy", "x", "yy", "x"], "yy"], output: ["xx", "yyy", "x", "x"]},
  {input: [["aa", "ab", "ac", "aa"], "aa"], output: ["ab", "ac"]},
]);

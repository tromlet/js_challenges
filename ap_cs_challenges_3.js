const tester = require('./test_runner.js');




/*
================================================================================
Given two arrays, A and B, of non-negative int scores. A "special" score is one
which is a multiple of 10, such as 40 or 90. Return the sum of largest special
score in A and the largest special score in B. To practice decomposition, write
a separate helper method which finds the largest special score in an array.
Write your helper method after your scoresSpecial() method in the JavaBat text
area.

Has 2 parameters (a: number[], b: number[])
returns number
================================================================================*/

function scoresSpecial(a, b) {
  let c = findSpecial(a);
  let d = findSpecial(b);
  let e = a[c];
  let f = b[d];
  if (a[c] === undefined) e = 0 ;
  if (b[d] === undefined) f = 0 ;
  return e + f;
}

function findSpecial(scores) {
  let largestSpecial = 0;
  let largestIndex = 0;
  let specials = [];
  for (let i = 0; i < scores.length; i++) {
    if (scores[i] % 10 === 0) specials.push(scores[i]);
  }
  if (specials.length === 0) {
    largestIndex = null;
  } else if (specials.length === 1) {
    largestSpecial = specials[0];
    largestIndex = scores.indexOf(largestSpecial);
  } else {
    for (let i = 0; i < specials.length - 1; i++) {
      if (specials[i] > specials[i + 1]) {
        largestSpecial = specials[i];
      } else {
        largestSpecial = specials[i + 1];
      }
    }
    largestIndex = scores.indexOf(largestSpecial);
  }
  return largestIndex;
}

tester.test(scoresSpecial, [
  {input: [[12, 10, 4], [2, 20, 30]], output: 40},
  {input: [[20, 10, 4], [2, 20, 10]], output: 40},
  {input: [[12, 11, 4], [2, 20, 31]], output: 20},
  {input: [[1, 20, 2, 50], [3, 4, 5]], output: 50},
  {input: [[3, 4, 5], [1, 50, 2, 20]], output: 50},
  {input: [[10, 4, 20, 30], [20]], output: 50},
  {input: [[10, 4, 20, 30], [20]], output: 50},
  {input: [[10, 4, 20, 30], [3, 20, 99]], output: 50},
  {input: [[10, 4, 20, 30], [30, 20, 99]], output: 60},
  {input: [[], [2]], output: 0},
  {input: [[], [20]], output: 20},
  {input: [[14, 10, 4], [4, 20, 30]], output: 40},
]);




/*
================================================================================
We have an array of heights, representing the altitude along a walking trail.
Given start/end indexes into the array, return the sum of the changes for a walk
beginning at the start index and ending at the end index. For example, with the
heights {5, 3, 6, 7, 2} and start=2, end=4 yields a sum of 1 + 5 = 6. The start
end end index will both be valid indexes into the array with start <= end.

Has 3 parameters (heights: number[], start: number, end: number)
returns number
================================================================================*/

function sumHeights(heights, start, end) {
  let change = 0;
  for (let i = start; i < end; i++) {
    if (heights[i] > heights[i + 1]) {
      change += heights[i] - heights[i + 1];
    } else {
      change += heights[i + 1] - heights[i]
    }
  }
  return change;
}

tester.test(sumHeights, [
  {input: [[5, 3, 6, 7, 2], 2, 4], output: 6},
  {input: [[5, 3, 6, 7, 2], 0, 1], output: 2},
  {input: [[5, 3, 6, 7, 2], 0, 4], output: 11},
  {input: [[5, 3, 6, 7, 2], 1, 1], output: 0},
  {input: [[1, 2, 3, 4, 5, 4, 3, 2, 10], 0, 3], output: 3},
  {input: [[1, 2, 3, 4, 5, 4, 3, 2, 10], 4, 8], output: 11},
  {input: [[1, 2, 3, 4, 5, 4, 3, 2, 10], 7, 8], output: 8},
  {input: [[1, 2, 3, 4, 5, 4, 3, 2, 10], 8, 8], output: 0},
  {input: [[1, 2, 3, 4, 5, 4, 3, 2, 10], 2, 2], output: 0},
  {input: [[1, 2, 3, 4, 5, 4, 3, 2, 10], 3, 6], output: 3},
  {input: [[10, 8, 7, 7, 7, 6, 7], 1, 4], output: 1},
  {input: [[10, 8, 7, 7, 7, 6, 7], 1, 5], output: 2},
]);





/*
================================================================================
(A variation on the sumHeights problem.) We have an array of heights,
representing the altitude along a walking trail. Given start/end indexes into
the array, return the sum of the changes for a walk beginning at the start index
and ending at the end index, however increases in height count double. For
example, with the heights {5, 3, 6, 7, 2} and start=2, end=4 yields a sum of 1*2
+ 5 = 7. The start end end index will both be valid indexes into the array with
start <= end.

Has 3 parameters (heights: number[], start: number, end: number)
returns number
================================================================================*/

function sumHeights2(heights, start, end) {
  let change = 0;
  for (let i = start; i < end; i++) {
    if (heights[i] > heights[i + 1]) {
      change += heights[i] - heights[i + 1];
    } else {
      change += 2 * (heights[i + 1] - heights[i]);
    }
  }
  return change;
}

tester.test(sumHeights2, [
  {input: [[5, 3, 6, 7, 2], 2, 4], output: 7},
  {input: [[5, 3, 6, 7, 2], 0, 1], output: 2},
  {input: [[5, 3, 6, 7, 2], 0, 4], output: 15},
  {input: [[5, 3, 6, 7, 2], 1, 1], output: 0},
  {input: [[1, 2, 3, 4, 5, 4, 3, 2, 10], 0, 3], output: 6},
  {input: [[1, 2, 3, 4, 5, 4, 3, 2, 10], 4, 8], output: 19},
  {input: [[1, 2, 3, 4, 5, 4, 3, 2, 10], 7, 8], output: 16},
  {input: [[1, 2, 3, 4, 5, 4, 3, 2, 10], 8, 8], output: 0},
  {input: [[1, 2, 3, 4, 5, 4, 3, 2, 10], 2, 2], output: 0},
  {input: [[1, 2, 3, 4, 5, 4, 3, 2, 10], 3, 6], output: 4},
  {input: [[10, 8, 7, 7, 7, 6, 7], 1, 4], output: 1},
  {input: [[10, 8, 7, 7, 7, 6, 7], 1, 5], output: 2},
]);





/*
================================================================================
(A variation on the sumHeights problem.) We have an array of heights,
representing the altitude along a walking trail. Given start/end indexes into
the array, return the number of "big" steps for a walk starting at the start
index and ending at the end index. We'll say that  step is big if it is 5 or
more up or down. The start end end index will both be valid indexes into the
array with start <= end.

Has 3 parameters (heights: number[], start: number, end: number)
returns number
================================================================================*/

function bigHeights(heights, start, end) {
  let bigSteps = 0;
  for (let i = start; i < end; i++) {
    if (heights[i] > heights[i + 1]) {
      heights[i] - heights[i + 1] < 5 ? null : bigSteps++ ;
    } else {
      heights[i + 1] - heights[i] < 5 ? null : bigSteps++ ;
    }
  }
  return bigSteps;
}

tester.test(bigHeights, [
  {input: [[5, 3, 6, 7, 2], 2, 4], output: 1},
  {input: [[5, 3, 6, 7, 2], 0, 1], output: 0},
  {input: [[5, 3, 6, 7, 2], 0, 4], output: 1},
  {input: [[5, 3, 6, 7, 3], 0, 4], output: 0},
  {input: [[5, 3, 6, 7, 2], 1, 1], output: 0},
  {input: [[5, 13, 6, 7, 2], 1, 2], output: 1},
  {input: [[5, 13, 6, 7, 2], 0, 2], output: 2},
  {input: [[5, 13, 6, 7, 2], 1, 4], output: 2},
  {input: [[5, 13, 6, 7, 2], 0, 4], output: 3},
  {input: [[5, 13, 6, 7, 2], 0, 3], output: 2},
  {input: [[1, 2, 3, 4, 5, 4, 3, 2, 10], 0, 3], output: 0},
  {input: [[1, 2, 3, 4, 5, 4, 3, 2, 10], 4, 8], output: 1},
  {input: [[1, 2, 3, 14, 5, 4, 3, 2, 10], 0, 3], output: 1},
  {input: [[1, 2, 3, 14, 5, 4, 3, 2, 10], 7, 8], output: 1},
  {input: [[1, 2, 3, 14, 5, 4, 3, 2, 10], 3, 8], output: 2},
  {input: [[1, 2, 3, 14, 5, 4, 3, 2, 10], 2, 8], output: 3},
]);





/*
================================================================================
We have data for two users, A and B, each with a String name and an int id. The
goal is to order the users such as for sorting. Return -1 if A comes before B, 1
if A comes after B, and 0 if they are the same. Order first by the string names,
and then by the id numbers if the names are the same. Note: with Strings
str1.compareTo(str2) returns an int value which is negative/0/positive to
indicate how str1 is ordered to str2 (the value is not limited to -1/0/1). (On
the AP, there would be two User objects, but here the code simply takes the two
strings and two ints directly. The code logic is the same.)

Has 4 parameters (aName: string, aId: number, bName: string, bId: number)
returns number
================================================================================*/

function userCompare(aName, aId, bName, bId) {
  if (aName.localeCompare(bName) > 0) {
    return 1;
  } else if (aName.localeCompare(bName) === 0) {
    if (aId > bId) {
      return 1;
    } else if (aId < bId) {
      return -1;
    } else {
      return 0;
    }
  } else if (aName.localeCompare(bName) < 0) {
    return -1;
  }
}

tester.test(userCompare, [
  {input: ["bb", 1, "zz", 2], output: -1},
  {input: ["bb", 1, "aa", 2], output: 1},
  {input: ["bb", 1, "bb", 1], output: 0},
  {input: ["bb", 5, "bb", 1], output: 1},
  {input: ["bb", 5, "bb", 10], output: -1},
  {input: ["adam", 1, "bob", 2], output: -1},
  {input: ["bob", 1, "bob", 2], output: -1},
  {input: ["bzb", 1, "bob", 2], output: 1},
]);





/*
================================================================================
Start with two arrays of strings, A and B, each with its elements in
alphabetical order and without duplicates. Return a new array containing the
first N elements from the two arrays. The result array should be in alphabetical
order and without duplicates. A and B will both have a length which is N or
more. The best "linear" solution makes a single pass over A and B, taking
advantage of the fact that they are in alphabetical order, copying elements
directly to the new array.

Has 3 parameters (a: string[], b: string[], n: number)
returns string[]
================================================================================*/

function mergeTwo(a, b, n) {
  let arr = a.concat(b).sort();
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i].localeCompare(arr[i + 1]) === 0) arr.splice(i, 1);
  }
  return arr.splice(0, n);
}

tester.test(mergeTwo, [
  {input: [["a", "c", "z"], ["b", "f", "z"], 3], output: ["a", "b", "c"]},
  {input: [["a", "c", "z"], ["c", "f", "z"], 3], output: ["a", "c", "f"]},
  {input: [["f", "g", "z"], ["c", "f", "g"], 3], output: ["c", "f", "g"]},
  {input: [["a", "c", "z"], ["a", "c", "z"], 3], output: ["a", "c", "z"]},
  {input: [["a", "b", "c", "z"], ["a", "c", "z"], 3], output: ["a", "b", "c"]},
  {input: [["a", "c", "z"], ["a", "b", "c", "z"], 3], output: ["a", "b", "c"]},
  {input: [["a", "c", "z"], ["a", "c", "z"], 2], output: ["a", "c"]},
  {input: [["a", "c", "z"], ["a", "c", "y", "z"], 3], output: ["a", "c", "y"]},
  {input: [["x", "y", "z"], ["a", "b", "z"], 3], output: ["a", "b", "x"]},
]);




/*
================================================================================
Start with two arrays of strings, a and b, each in alphabetical order, possibly
with duplicates. Return the count of the number of strings which appear in both
arrays. The best "linear" solution makes a single pass over both arrays, taking
advantage of the fact that they are in alphabetical order.

Has 2 parameters (a: string[], b: string[])
returns number
================================================================================*/

function commonTwo(a, b) {
  let count = 0;
  let uniq = [];
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a.length < b.length) {
      if (b.includes(a[i]) && !(uniq.includes(a[i]))) {
        count++;
        uniq.push(a[i]);
      }
    } else {
      if (a.includes(b[i]) && !(uniq.includes(b[i]))) {
        count++;
        uniq.push(b[i]);
      }
    }
  }
  return count;
}

tester.test(commonTwo, [
  {input: [["a", "c", "x"], ["b", "c", "d", "x"]], output: 2},
  {input: [["a", "c", "x"], ["a", "b", "c", "x", "z"]], output: 3},
  {input: [["a", "b", "c"], ["a", "b", "c"]], output: 3},
  {input: [["a", "a", "b", "b", "c"], ["a", "b", "c"]], output: 3},
  {input: [["a", "a", "b", "b", "c"], ["a", "b", "b", "b", "c"]], output: 3},
  {input: [["a", "a", "b", "b", "c"], ["a", "b", "b", "c", "c"]], output: 3},
  {input: [["b", "b", "b", "b", "c"], ["a", "b", "b", "b", "c"]], output: 2},
  {input: [["a", "b", "c", "c", "d"], ["a", "b", "b", "c", "d", "d"]], output: 4},
  {input: [["a", "a", "b", "b", "c"], ["b", "b", "b"]], output: 1},
  {input: [["a", "a", "b", "b", "c"], ["c", "c"]], output: 1},
  {input: [["a", "a", "b", "b", "c"], ["b", "b", "b", "x"]], output: 1},
  {input: [["a", "a", "b", "b", "c"], ["b", "b"]], output: 1},
  {input: [["a"], ["a", "b"]], output: 1},
  {input: [["a"], ["b"]], output: 0},
  {input: [["a", "a"], ["b", "b"]], output: 0},
  {input: [["a", "b"], ["a", "b"]], output: 2},
]);

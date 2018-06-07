const tester = require('./test_runner.js');


/*

Write a function that takes a string as an argument. This string will have any
number of '(', ')', '[', ']', '{', or '}' characters. your task is to determine
if the string is syntactically correct! We define such a string as syntactically
correct if all '(' are closed by a ')', and all '[' are closed by a ']', etc.
There can be no extra open or closing brackets, and they must be closed in the
correct order, just like in a programming language... ie:
'([])' is correct, but '([)]' is not!

returns a boolean

*/

function correctSyntax(str) {
  let openers = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "(" || str[i] === "[" || str[i] === "{") {
      openers.push(str[i]);
    } else if (str[i] === ")") {
      if (openers[openers.length - 1] === "(") openers.pop();
    } else if (str[i] === "]") {
      if (openers[openers.length - 1] === "[") openers.pop();
    } else if (str[i] === "}") {
      if (openers[openers.length - 1] === "{") openers.pop();
    }
  }
  return openers.length === 0;
}

tester.test(correctSyntax, [
  {input: ['()[][]'], output: true},
  {input: ['(]'], output: false},
  {input: ['(()'], output: false},
  {input: ['([)]'], output: false},
  {input: ['()[{()()}][]'], output: true},
]);

/*

Write a function that takes a date (formatted as MM/DD/YYYY) a string as an
argument, and returns a string with the name of what day it was.

*/

function dayOfWeek(date) {
  // Variable containing the names of all of the days of the week
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  let monthLengths = {1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31};
  // Anchor to 01/01/2018, which was a Monday
  // Checks if it's a leap year
  let isLeapYear = false;
  let anchor = 20180101;
  // Initialize an empty number variable to be a good, useful, and not fucking
  // retarded date format
  let notStupidDate = 0;
  // Initialize year, month, and date variables
  let day = "";
  let month = "";
  let year = "";
  // Convert MM/DD/YYYY string to YYYYMMDD number
  for (let i = 0; i < date.length; i++) {
    if (i < 2) {
      month.concat(date[i]);
    } else if (i > 2 && i < 5) {
      day.concat(date[i]);
    } else if (i > 5) {
      year.concat(date[i]);
    }
    notStupidDate = Number(year + month + day);
  }
  isLeapYear = (year % 4 === 0) && (year % 100 !== 0) || (year % 400 ===0);
  switch (Math.abs(anchor - notStupidDate) % 7) {
    case expression:

      break;
    default:

  }

}

tester.test(correctSyntax, [
  {input: ['12/07/2016'], output: "Wednesday"},
  {input: ['11/14/1998'], output: "Saturday"},
  {input: ['07/27/1937'], output: "Tuesday"},
]);

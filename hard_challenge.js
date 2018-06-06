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

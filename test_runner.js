const emoji = require('node-emoji');

exports.test = (testFunction, testCases) => {
  let passmoji = emoji.get("white_check_mark") + " ";
  let failmoji = emoji.get("no_entry") + " ";
  let gearmoji = emoji.get("gear") + " ";

  console.log("\n" + gearmoji.repeat(5) + ` running tests for ${testFunction.name} ` + gearmoji.repeat(5));

  let results = testCases.map((testCase) => {
    let result = String(testFunction(...testCase.input));
    return ({
      testCase,
      result,
      passed: result === String(testCase.output),
    });
  });

  if(results.every((result) => result.passed)) {
    console.log(passmoji.repeat(3) + ` ${testFunction.name}:PASSED ALL TESTS ` + passmoji.repeat(3));
  } else if(results.every((result) => !result.passed)) {
    console.log(failmoji.repeat(3) + ` ${testFunction.name}:FAILED ALL TESTS ` + failmoji.repeat(3));
  } else {
    let message = "";
    results.forEach((result) => {
      message += `${result.passed ? passmoji : failmoji} parameters: ${result.testCase.input} got: ${result.result}, expected: ${result.testCase.output}\n`;
    });
    console.log(message);
  }
};

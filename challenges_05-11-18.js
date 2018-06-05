//return str.match(/x[^y]*$/) == null;



const tester = require('./test_runner.js');

/*
================================================================================
We'll say that a String is xy-balanced if for all the 'x' chars in the string,
there exists a 'y' char somewhere later in the string. So "xxy" is balanced, but
"xyx" is not. One 'y' can balance multiple 'x's. Return true if the given string
is xy-balanced.

Has 1 parameters (str: string)
returns boolean
================================================================================*/

function xyBalance(str) {
  return str.match(/x[^y]*$/) === null;
}

tester.test(xyBalance, [
  {input: ["aaxbby"], output: true},
  {input: ["aaxbb"], output: false},
  {input: ["yaaxbb"], output: false},
  {input: ["yaaxbby"], output: true},
  {input: ["xaxxbby"], output: true},
  {input: ["xaxxbbyx"], output: false},
  {input: ["xxbxy"], output: true},
  {input: ["xxbx"], output: false},
  {input: ["bbb"], output: true},
  {input: ["bxbb"], output: false},
  {input: ["bxyb"], output: true},
  {input: ["xy"], output: true},
  {input: ["y"], output: true},
  {input: ["x"], output: false},
  {input: [""], output: true},
  {input: ["yxyxyxyx"], output: false},
  {input: ["yxyxyxyxy"], output: true},
  {input: ["12xabxxydxyxyzz"], output: true},
]);



/*
================================================================================
We'll say that an element in an array is "alone" if there are values before and
after it, and those values are different from it. Return a version of the given
array where every instance of the given value which is alone is replaced by
whichever value to its left or right is larger.

Has 2 parameters (nums: number[], val: number)
returns number[]
================================================================================*/

function notAlone(nums, val) {
  return nums.map((num, i) => {
    // IS num ALONE?
    if(num === val &&           //Is num the value we're looking for
       i !== 0 &&               //Is num not at the beginning
       i !== nums.length - 1 && //Is num not at the end
       nums[i-1] !== val &&     //Is the left neighbor 'not' val
       nums[i+1] !== val        //Is the right neighbor 'not' val
    ) {
      // console.log(`The number ${num} at position ${i} IS alone`);
      return Math.max(nums[i-1], nums[i+1]); // max is the bigger neighbor
    } else {
      //IF num is NOT alone, just push it into the new array
      return num;
    }
  });
}














  // return nums.map((num, i) => {
  //   // Check if alone
  //   if(num === val && i !== 0 && i !== nums.length - 1 && nums[i-1] !== num && nums[i+1] !== num) {
  //     return Math.max(nums[i-1], nums[i+1]);
  //   } else {
  //     return num;
  //   }
  // });
// }

tester.test(notAlone, [
  {input: [[1, 2, 3], 2], output: [1, 3, 3]},
  {input: [[1, 2, 3, 2, 5, 2], 2], output: [1, 3, 3, 5, 5, 2]},
  {input: [[3, 4], 3], output: [3, 4]},
  {input: [[3, 3], 3], output: [3, 3]},
  {input: [[1, 3, 1, 2], 1], output: [1, 3, 3, 2]},
  {input: [[3], 3], output: [3]},
  {input: [[], 3], output: []},
  {input: [[7, 1, 6], 1], output: [7, 7, 6]},
  {input: [[1, 1, 1], 1], output: [1, 1, 1]},
  {input: [[1, 1, 1, 2], 1], output: [1, 1, 1, 2]},
]);



/*
================================================================================
Given a string, compute a new string by moving the first char to come after the
next two chars, so "abc" yields "bca". Repeat this process for each subsequent
group of 3 chars, so "abcdef" yields "bcaefd". Ignore any group of fewer than 3
chars at the end.

Has 1 parameters (str: string)
returns string
================================================================================*/

function oneTwo(str) {
  let newStr = "";

  for(let i = 0; i < str.length - 2; i += 3) {
    newStr += str[i + 1] + str[i + 2] + str[i];
  }

  return newStr;
}

tester.test(oneTwo, [
  {input: ["abc"], output: "bca"},
  {input: ["tca"], output: "cat"},
  {input: ["tcagdo"], output: "catdog"},
  {input: ["chocolate"], output: "hocolctea"},
  {input: ["1234567890"], output: "231564897"},
  {input: ["xabxabxabxabxabxabxab"], output: "abxabxabxabxabxabxabx"},
  {input: ["abcdefx"], output: "bcaefd"},
  {input: ["abcdefxy"], output: "bcaefd"},
  {input: ["abcdefxyz"], output: "bcaefdyzx"},
  {input: [""], output: ""},
  {input: ["x"], output: ""},
  {input: ["xy"], output: ""},
  {input: ["xyz"], output: "yzx"},
  {input: ["abcdefghijklkmnopqrstuvwxyz1234567890"], output: "bcaefdhigkljmnkpqostrvwuyzx231564897"},
  {input: ["abcdefghijklkmnopqrstuvwxyz123456789"], output: "bcaefdhigkljmnkpqostrvwuyzx231564897"},
  {input: ["abcdefghijklkmnopqrstuvwxyz12345678"], output: "bcaefdhigkljmnkpqostrvwuyzx231564"},
]);


/*
================================================================================
Returns true if for every '*' (star) in the string, if there are chars both
immediately before and after the star, they are the same.

Has 1 parameters (str: string)
returns boolean
================================================================================*/

function sameStarChar(str) {
  for(let i = 0; i < str.length; i++) {
    // find the stars
    if(str[i] === "*") {
      // Make sure the star IS NOT on the begginning or end of the str
      if(i !== 0 && i !== str.length - 1) {
        // If the characters before and after the star are different, return false
        if(str[i-1] !== str[i+1]) {
          return false;
        }
      }
    }
  }
  return true;
}

tester.test(sameStarChar, [
  {input: ["xy*yzz"], output: true},
  {input: ["xy*zzz"], output: false},
  {input: ["*xa*az"], output: true},
  {input: ["*xa*bz"], output: false},
  {input: ["*xa*a*"], output: true},
  {input: [""], output: true},
  {input: ["*xa*a*a"], output: true},
  {input: ["*xa*a*b"], output: false},
  {input: ["*12*2*2"], output: true},
  {input: ["12*2*3*"], output: false},
  {input: ["abcDEF"], output: true},
  {input: ["XY*YYYY*Z*"], output: false},
  {input: ["XY*YYYY*Y*"], output: true},
  {input: ["12*2*3*"], output: false},
  {input: ["*"], output: true},
  {input: ["**"], output: true},
]);



/*
================================================================================
Given a string, compute recursively (no loops) the number of "11" substrings in
the string. The "11" substrings should not overlap.

Has 1 parameters (str: string)
returns number
================================================================================*/

function count11(str) {


















  // if(str.length < 2) return 0;
  // if(str[0] === '1' && str[1] === '1') {
  //   return 1 + count11(str.slice(2));
  // } else {
  //   return count11(str.slice(1));
  // }
}

tester.test(count11, [
  {input: ["11abc11"], output: 2},
  {input: ["abc11x11x11"], output: 3},
  {input: ["111"], output: 1},
  {input: ["1111"], output: 2},
  {input: ["1"], output: 0},
  {input: [""], output: 0},
  {input: ["hi"], output: 0},
  {input: ["11x111x1111"], output: 4},
  {input: ["1x111"], output: 1},
  {input: ["1Hello1"], output: 0},
  {input: ["Hello"], output: 0},
]);


/*
================================================================================
Given a string, return recursively a "cleaned" string where adjacent chars that
are the same have been reduced to a single char. So "yyzzza" yields "yza".

Has 1 parameters (str: string)
returns string
================================================================================*/

function stringClean(str) {




















  // if(str.length < 2) return str;
  // if(str[0] === str[1]) return stringClean(str.slice(1));
  // return str[0] + stringClean(str.slice(1));
}

console.log(stringClean("yyzzza"));

tester.test(stringClean, [
  {input: ["yyzzza"], output: "yza"},
  {input: ["abbbcdd"], output: "abcd"},
  {input: ["Hello"], output: "Helo"},
  {input: ["XXabcYY"], output: "XabcY"},
  {input: ["112ab445"], output: "12ab45"},
  {input: ["Hello Bookkeeper"], output: "Helo Bokeper"},
]);

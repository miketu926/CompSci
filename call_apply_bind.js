// call & apply
// both are used to help invoke functions - where the first argument 
// is the value of this within the function call(), apply();

const add = (a, b) => {
  return a + b;
}

// second+ arguments will be for the arguments passed into the parameters of the function
// for the extra arguments, it will ignore without errors

console.log(add.call(null, 1, 2)); // 3
console.log(add.apply(null, [1, 2])); // 3


// bind
// it creates a new function that will have this set to the first parameter passed to bind()

const Button = function (content) {
  this.content = content;
};
Button.prototype.click = function () {
  console.log(this.content + ' clicked');
};

const myButton = new Button('OK');
myButton.click();

const looseClick = myButton.click;
looseClick(); // not bound, 'this' is not myButton - it is the global object

const boundClick = myButton.click.bind(myButton);
boundClick(); // bound, 'this' is myButton

// implementing bind using call/apply

const myBind = (context, ...bindArgs) => {
  return (...callArgs) => {
    return this.apply(context, bindArgs.concat(callArgs));
  };
};

const myBind2 = (context, bindArgs) => (callArgs) => {
  return this.call(context, ...bindArgs, ...callArgs);
}

let arr = [1, 2, 3]
let arr2 = [...arr];
console.log(arr2);
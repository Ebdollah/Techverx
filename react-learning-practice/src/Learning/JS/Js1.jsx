// import React from 'react'

// function Js1() {
// function human(name) {
// //   const name = "Sina";
//   function sayHi() {
//     console.log(`Hi I am ${name}`);
//   }
//   function sayHowYouFeel() {
//     console.log(`${name} is feeling good`);
//   }
//   sayHi();
//   sayHowYouFeel();
// }
function human(name) {
  //   const name = "Sina";
  function sayHi() {
    console.log(`Hi I am ${name}`);
  }
  function sayHowYouFeel() {
    console.log(`${name} is feeling good`);
  }
  return {
    sayHi,
    sayHowYouFeel,
  };
}

// function outer() {
//   let counter = 0;
//   function inner() {
//     counter++;
//     console.log(counter);
//   }
//   return inner;
// }
// const fn = outer();
// fn();
// fn();
//   return (
//     <div>Js1</div>
//   )
// }

// export default Js1

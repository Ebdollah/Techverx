import React, { useState } from "react";

function Js3() {
  let stocks = {
    Fruits: ["strawberry", "grapes", "banana", "apple"],
    liquid: ["water", "ice"],
    holder: ["cone", "cup", "stick"],
    toppings: ["chocolate", "peanuts"],
  };
  const [shop, setShot] = useState([]);
  let is_shop_open = true;
  let order = (time, work) => {
    return new Promise((resolve, reject) => {
      if (is_shop_open) {
        setTimeout(() => {
          // work is 👇 getting done here
          resolve(work());
          // Setting 👇 time here for 1 work
        }, time);
      } else {
        reject(console.log("Our shop is closed"));
      }
    });
  };
  // step 1
  order(2000, () => console.log(`${stocks.Fruits[0]} was selected`))
    // step 2
    .then(() => {
      return order(0000, () => setShot((prev)=>[...prev, 'production has started']))
    })

    // step 3
    .then(() => {
      return order(2000, () => setShot((prev)=>[...prev, 'The fruit has been chopped']))
    })

    // step 4
    .then(() => {
      return order(1000, () =>
        setShot((prev)=>[...prev, `${stocks.liquid[0]} and ${stocks.liquid[1]} Added`])
      );
    })

    // step 5
    .then(() => {
      return order(1000, () => setShot((prev)=>[...prev, 'start the machine']));
    })

    // step 6
    .then(() => {
      return order(2000, () =>
        setShot((prev)=>[...prev, `Ice cream placed on ${stocks.holder[1]}`])
      );
    })

    // step 7
    .then(() => {
      return order(3000, () =>
        setShot((prev)=>[...prev, `${stocks.toppings[0]} as toppings`])
      );
    })

    // Step 8
    .then(() => {
      return order(2000, () => setShot((prev)=>[...prev, 'serve Ice cream']))
    });

  return (
    <div>
      <h1 className="text-2xl text-blue-200">I Promise you</h1>
      <button onClick={production} className="p-5 m-4 bg-slate-500">
        Run Promise
      </button>
      {shop.map((s) => (
        <p>{s}</p>
      ))}
    </div>
  );
}

export default Js3;

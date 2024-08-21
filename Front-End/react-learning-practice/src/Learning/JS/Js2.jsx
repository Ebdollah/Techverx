import React, { useState } from 'react'

function Js2() {
    let stocks = {
        Fruits : ["strawberry", "grapes", "banana", "apple"],
        liquid : ["water", "ice"],
        holder : ["cone", "cup", "stick"],
        toppings : ["chocolate", "peanuts"],
     };
     const [shop, setShot] = useState([]);
     let production = () =>{
        setTimeout(()=>{
          console.log("production has started")
          setShot((prev)=>[...prev, 'production has started']);
          setTimeout(()=>{
            console.log("The fruit has been chopped")
            setShot((prev)=>[...prev, 'The fruit has been chopped']);
            setTimeout(()=>{
              console.log(`${stocks.liquid[0]} and ${stocks.liquid[1]} Added`)
              setShot((prev)=>[...prev, `${stocks.liquid[0]} and ${stocks.liquid[1]} Added`]);
              setTimeout(()=>{
                console.log("start the machine")
                setShot((prev)=>[...prev, 'start the machine'])
                setTimeout(()=>{
                  console.log(`Ice cream placed on ${stocks.holder[1]}`)
                  setShot((prev)=>[...prev, `Ice cream placed on ${stocks.holder[1]}`])
                  setTimeout(()=>{
                    console.log(`${stocks.toppings[0]} as toppings`)
                    setShot((prev)=>[...prev, `${stocks.toppings[0]} as toppings`])
                    setTimeout(()=>{
                      console.log("serve Ice cream")
                      setShot((prev)=>[...prev, 'serve Ice cream'])
                    },2000)
                  },3000)
                },2000)
              },1000)
            },1000)
          },2000)
        },1000)
      
      };
  return (
    <div>
        <h1 className='text-2xl text-blue-200'>Call backs and hell</h1>
        <button onClick={production} className='p-5 m-4 bg-slate-500'>Run Hell</button>
        {
            shop.map((s)=><p>{s}</p>)
        }
    </div>
  )
}

export default Js2
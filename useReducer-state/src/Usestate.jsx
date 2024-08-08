import React,{useState} from 'react'

function Usestate() {
    const [counter, setCounter] = useState(0);
    const handlePlus = ()=>{
        setCounter(prev=>prev+1);
    }
    const handleMinus = ()=>{
        setCounter(prev=>prev-1);
    }
  return (
    <div>
    <h1 className='text-2xl'>Counter: {counter}</h1>
    <button className='p-2 m-3 bg-red-500' onClick={handlePlus}>Plus</button>
    <button className='p-2 m-3 bg-blue-500' onClick={handleMinus}>Minus</button>
    </div>
  )
}

export default Usestate
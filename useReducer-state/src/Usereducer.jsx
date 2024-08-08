import React,{useReducer} from 'react'

const ACTION = {
    INCREMENT : 'increment',
    DECREMENT : 'decrement'
}
function reducer(state, action){
    if(action.type === ACTION.INCREMENT){
        return { count : state.count + 1}
    }
    else if(action.type === ACTION.DECREMENT){
        return {count : state.count - 1}
    }

}
function Usereducer() {
    const [state, dispatch] = useReducer(reducer,{count : 0});
    function handlePlus(){
        dispatch({type : ACTION.INCREMENT});
    }
    function handleMinus(){
        dispatch({type : ACTION.DECREMENT});
    }
  return (
    <div>
    <h1 className='text-xl m-6'>UseReducer</h1>
    <p className='text-lg m-6 text-slate-600'>Count is: {state.count}</p>
    <button className='m-3 p-3 bg-orange-400' onClick={handlePlus}>Plus</button>
    <button className='m-3 p-3 bg-pink-400' onClick={handleMinus}>Minus</button>
    </div>
  )
}

export default Usereducer
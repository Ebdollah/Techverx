import { useSelector, useDispatch } from "react-redux"
import { increment } from "./actions/count";


export default function App() {
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();
  return (
    <h1 className="text-3xl font-bold underline">
      Count:  {counter}
      <button onClick={()=>dispatch(increment)}></button>
    </h1>
  )
}
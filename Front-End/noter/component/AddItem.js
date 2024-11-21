import { useState} from "react";
import db from "../utils/firestore"
import { collection, addDoc } from "firebase/firestore"
const AddItem = ()=> {
    const [value, setValue] =  useState("")
    const handleSubmit =()=> { }
    return (
        <div>
        <form onSubmit={handleSubmit} >
            <input
                type="text"
                value={value}
                onChange = {(e)=> setValue(e.target.value)}
                placeholder = "Add a new item" />
            <button type="submit"> Add item</button>
        </form>
        </div>
)}
 
export default AddItem
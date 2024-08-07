import React, {useState, useContext} from "react"
import MyContext from "../MyContext"

function ContextSharing() {
  const {contextExample} = useContext(MyContext);

  return (
    <div>
        <h1>Hello Context API</h1>
        <p>Checking Enables value: {contextExample}</p>
    </div>
  )
}

export default ContextSharing
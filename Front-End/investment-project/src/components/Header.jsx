import React from 'react'
import logo from "../assets/logo.png"
function Header() {
  return (
    <header id='header'>
        <img  src={logo} />
        <h1>Calculator</h1>
    </header>
  )
}

export default Header
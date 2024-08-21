import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">MyApp</div>
        <div className="space-x-4">
          <NavLink to="/" className="text-white hover:text-gray-300">Home</NavLink>
          <NavLink to="/create" className="text-white hover:text-gray-300">Create</NavLink>
          <a href="/services" className="text-white hover:text-gray-300">Services</a>
          <a href="/contact" className="text-white hover:text-gray-300">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Header;

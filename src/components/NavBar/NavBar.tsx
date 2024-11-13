import { Target } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-dark-blue text-white p-4 w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Target />
          <h1 className="text-2xl font-semibold">Product Management App</h1>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/products" className="hover:text-blue-400">
              Products
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

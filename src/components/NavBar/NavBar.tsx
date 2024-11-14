import { Target } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../../routes";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-dark-blue p-4 w-full text-white">
      <div className="flex justify-around items-center mx-auto max-w-7xl">
        <div className="flex items-center gap-2">
          <Target />
          <h1 className="font-semibold text-2xl">Product Management App</h1>
        </div>
        <ul className="flex space-x-4 mr-6">
          <li>
            <Link
              to={routes.products}
              className="font-bold text-orange-light hover:text-orange-hover"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="font-bold text-orange-light hover:text-orange-hover"
            >
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

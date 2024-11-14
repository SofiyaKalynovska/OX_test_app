import React from "react";
import Navbar from "../NavBar/NavBar";
import { Target } from "lucide-react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col bg-white min-w-screen min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="bg-dark-blue p-4 w-full text-center text-white">
        <div className="flex justify-center items-center gap-1">
          <Target />
          <h1 className="font-semibold text-xl">PMA</h1>
        </div>
        <p>Thanks to this platform, you can easily manage products</p>
        <p>&copy; 2024 | All rights reserved</p>
      </footer>
    </div>
  );
};

export default Layout;

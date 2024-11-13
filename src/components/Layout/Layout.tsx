import React from "react";
import Navbar from "../NavBar/NavBar";
import { Target } from "lucide-react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col min-w-screen bg-white">
      <Navbar />
      <main className="flex-1 p-6">{children}</main>
      <footer className="bg-dark-blue text-white p-4 text-center  w-full">
        <div className="flex gap-1 items-center justify-center">
          <Target />
          <h1 className="text-xl font-semibold">PMA</h1>
        </div>
        <p>Thanks to this platform, you can easily manage products</p>
        <p>&copy; 2024 | All rights reserved</p>
      </footer>
    </div>
  );
};

export default Layout;

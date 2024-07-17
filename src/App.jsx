import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

function App() {
  return (
    <main className="w-full min-h-screen bg-bgColor text-white flex">
      <Sidebar />
      <Main />
    </main>
  );
}

export default App;

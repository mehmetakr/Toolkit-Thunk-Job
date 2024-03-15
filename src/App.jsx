import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Joblist from "./pages/Joblist";
import Addjob from "./pages/Addjob";
import Header from "./components/Header";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Joblist />} />
          <Route path="/add" element={<Addjob />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;

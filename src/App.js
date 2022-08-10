import React from "react";
import "./App.css";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Posts from "./components/posts"
import Footer from "./components/footer"
import { Route, Routes } from "react-router-dom";
// import { NavLink } from "react-router-dom";
import Navbar from './components/navbar';

export default function App() {

  return (
    <div className="App">
      <header className="App-header"></header>
     <Navbar/>
      {/* added form data  */}
      <div>
        <Routes>
          <Route exact path="/" element={<RecordList />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/posts/:id" element={<Posts />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

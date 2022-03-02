import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useAppDispatch } from "./app/hooks";
import { LeftBar } from "./components";
import { DashBoard, getDepartment, getEmployee } from "./features";
import { Counter } from "./features/counter/Counter";
function App() {
  const dispatch = useAppDispatch();
  dispatch(getDepartment());
  dispatch(getEmployee());
  return (
    <div className="App">
      <LeftBar />
      <Routes>
        <Route path="/" element={<Counter />} />
        <Route path="/dash-board" element={<DashBoard />} />
      </Routes>
    </div>
  );
}

export default App;

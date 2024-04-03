import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Signup } from "./Pages/Signup";
import { Home } from "./Pages/Home";
import { Todos } from "./Pages/Todos";

export default function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/todos" element={<Todos />}></Route>
        <Route path="*" element={<h1>Not Found</h1>}></Route>
      </Routes>
    </BrowserRouter>
  </>;
}

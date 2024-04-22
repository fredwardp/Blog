import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import BlogDetail from "./pages/BlogDetail/BlogDetail";
import Admin from "./pages/Admin/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Admin" element={<Admin />} />
        <Route path={"/" || "/home"} element={<Home />} />
        <Route path="/detail" element={<BlogDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

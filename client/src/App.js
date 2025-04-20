import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateNotes from "./pages/CreateNotes";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./layout";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateNotes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

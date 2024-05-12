import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Regsiter from "./pages/Regsiter";
import Home from "./pages/Home";
import { ChatProvider } from "./context/contextProvider";
import { SocketProvider } from "./context/SocketContext";

function App() {
  return (
    <ChatProvider>
      <SocketProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} index />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Regsiter />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </SocketProvider>
    </ChatProvider>
  );
}

export default App;

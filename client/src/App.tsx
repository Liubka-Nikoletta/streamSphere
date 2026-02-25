import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home.tsx'
import Register from './pages/Register.tsx';
import Login from "./pages/Login.tsx";

function App() {
  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/users/register" element={<Register/>}/>
                  <Route path="/users/login" element={<Login/>}/>
              </Routes>
          </BrowserRouter>
      </>
  )
}

export default App

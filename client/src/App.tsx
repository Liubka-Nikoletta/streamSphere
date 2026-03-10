import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home.tsx'
import Register from './pages/Register.tsx';
import Login from "./pages/Login.tsx";
import Movies from "./pages/Movies.tsx";
import MovieDetail from "./pages/MovieDetail.tsx";
import {Toaster} from "react-hot-toast";
import {AuthProvider} from "./context/AuthContext.tsx";

function App() {
  return (
      <>
          <AuthProvider>
              <Toaster position="top-center" reverseOrder={false}/>
              <BrowserRouter>
                  <Routes>
                      <Route path="/" element={<Home/>} />
                      <Route path="/users/register" element={<Register/>}/>
                      <Route path="/users/login" element={<Login/>}/>
                      <Route path="/movies" element={<Movies/>}/>
                      <Route path="/movie/:id" element={<MovieDetail />} />
                  </Routes>
              </BrowserRouter>
          </AuthProvider>
      </>
  )
}

export default App

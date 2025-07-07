import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Login from "../src/components/Login/Login";

import Register from "../src/components/Register/Register.jsx";
import { useEffect, useState, createContext } from "react";
import axios from "./axisoConfig.js";
import SingleQuestion from "./components/Single Question/SingleQuestion.jsx";
import PostQuestion from "./components/Post Question/PostQuestion.jsx";
import Header from "./components/header/header";
import Footer from "./components/Footer/Footer.jsx";
import Auth from "./pages/Auth/Auth.jsx";

export const Appstate = createContext();

function App() {
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");
  const Navigate = useNavigate();
  async function checkUser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser(data);
    } catch (error) {
      console.log(error.response);
      Navigate("/login");
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <Appstate.Provider value={{ user, setUser, checkUser }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/questions/:questionid" element={<SingleQuestion />} />
          <Route path="/questions" element={<PostQuestion />} />
          <Route path="/login" element={<Auth type="login" />} />
          <Route path="/register" element={<Auth type="register" />} />
          {/* <Route path="/register" element={<Register />} /> */}
        </Routes>
        <Footer />
      </Appstate.Provider>
    </>
  );
}

export default App;

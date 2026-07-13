import React from "react";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
import Home from "./pages/Home";
import Customize from "./pages/Customize";
import Customize2 from "./pages/Customize2";
import Main from "./pages/Main";
import { Routes, Route } from "react-router-dom";
import { userDataContext } from "./context/UserContext";
import { useContext } from "react";
const App = () => {
  const { userData, setUserData } = useContext(userDataContext);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/customize" element={<Customize />} />
        <Route path="/customize2" element={<Customize2 />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </div>
  );
};

export default App;

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import List2 from "./pages/list/List2";
import List3 from "./pages/list/List3";
import List4 from "./pages/list/List4";
import List5 from "./pages/list/List5";

import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="dashbord" element={<Home />} />
            <Route path="users">
              <Route index element={<List />} />        
            </Route>
            <Route path="products">
              <Route index element={<List2 />} />
            </Route>
            <Route path="orders">
              <Route index element={<List3 />} />
            </Route>
            <Route path="livred">
              <Route index element={<List4 />} />
            </Route>
            <Route path="reports">
              <Route index element={<List5 />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

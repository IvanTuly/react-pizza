import React from "react";
import { Routes, Route } from "react-router-dom";

import "./scss/app.scss";

import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Header from "./components/Header";
import Cart from "./pages/Cart";

export const AppContext = React.createContext({});

function App() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <AppContext.Provider
      value={{
        searchValue,
        setSearchValue,
      }}
    >
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            {/* устанавливаем путь * для всех путей отличных от заданных - это будет страница not found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;

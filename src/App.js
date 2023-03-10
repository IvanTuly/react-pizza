import React from "react";
import { Routes, Route } from "react-router-dom";

import "./scss/app.scss";

import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import FullPizza from "./pages/FullPizza/FullPizza";

export const AppContext = React.createContext({});

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/react-pizza/" element={<Home />} />
          <Route path="/react-pizza/cart" element={<Cart />} />
          {/* :id - динамический параметр, чтобы различать пиццы*/}
          <Route path="/react-pizza/pizza/:id" element={<FullPizza />} />
          {/* устанавливаем путь * для всех путей отличных от заданных - это будет страница not found */}
          <Route path="/react-pizza/*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

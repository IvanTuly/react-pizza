import { configureStore } from "@reduxjs/toolkit";
//импортируем reducer из filterSlece - это импорт default
import filterReducer from "./slices/filterSlice";
import cartReducer from "./slices/cartSlice";
import pizzaReducer from "./slices/pizzasSlice";

//указываем имя для reducer полученных из разных слайсов
// в дальнейшем будем использовать reducer filter , а не reducer filterReducer
export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    pizza: pizzaReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
//импортируем reducer из filterSlece - это импорт default
import filterReducer from "./slices/filterSlice";

//указываем имя для reducer полученных из разных слайсов
// в дальнейшем будем использовать reducer filter , а не reducer filterReducer
export const store = configureStore({
  reducer: {
    filter: filterReducer,
  },
});

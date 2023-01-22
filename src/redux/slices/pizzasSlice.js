import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//отправляем запрос отдельным асинхронным экшеном
//"pizza/fetchPizzasStatus" - указыавем больше для redux
export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { sort, order, searchCategory, search, currentPage } = params;
    const response = await axios.get(
      //в mockApi плохо работает поиск, поэтому можно искать только по всем пиццам, поэтому если ищем - то без категории
      `https://63c907a2904f040a96549005.mockapi.io/pizzas?${search}&page=${currentPage}&limit=4&${searchCategory}&sortBy=${sort}&order=${order}`
    );
    return response.data;
  }
);

//initialState - инициализируемое состояние, по умолчанию
const initialState = {
  items: [],
  status: "loading", //loading | success | error - статус загруски пицц
};

//createSlice - в нее необходимо передать объект - имя слайса, первое состояние и какие будут методы изменения состояния
//сама функция создает объект с необходимой логикой redux
export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },

  extraReducers: {
    //подходит для отлова ошибок функция createAsyncThunk - может вернуть 3 своих статуса
    //в fetchPizzas.pending лежит "pizza/fetchPizzasStatus/pending"
    //pending - если идет отправка запроса
    [fetchPizzas.pending]: (state) => {
      //устанавливаем статус загрузки - loading и очищаем пиццы
      state.status = "loading";
      state.items = [];
    },
    //fulfilled - если выполнится успешно
    [fetchPizzas.fulfilled]: (state, action) => {
      //сохраняем пиццы и меняем статус загрузки
      state.items = action.payload;
      state.status = "success";
    },
    //rejected - если не выполнится успешно
    [fetchPizzas.rejected]: (state, action) => {
      //чтобы не вернулись старые пиццы при ошибке мы их очищаем и ставим error
      state.status = "error";
      state.items = [];
    },
  },
});

//вытаскиваем методы изменения состояния, для экспорта. Чтобы получить методы надо обращаться к actions, а не к redusers, хоть они и лежат там
export const { setItems } = pizzaSlice.actions;

//выполняет логику обработки всего стейта - отвечает за измемнения стейта
export default pizzaSlice.reducer;

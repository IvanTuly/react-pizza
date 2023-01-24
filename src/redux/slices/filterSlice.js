import { createSlice } from "@reduxjs/toolkit";

//initialState - инициализируемое состояние, по умолчанию
//храним id категории и объект сортировки
const initialState = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "popularity",
    sortProperty: "rating",
  },
};

//createSlice - в нее необходимо передать объект - имя слайса, первое состояние и какие будут методы изменения состояния
//сама функция создает объект с необходимой логикой redux
export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    //функция изменения id категории сортировки (метод)
    //метод при вызове получит state и действие, при обращении мы передаем только action, redux toolkit сам добавит state
    setCategoryId(state, action) {
      //любое значение хранится не в самом action, а в action.payload
      state.categoryId = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setSortType(state, action) {
      state.sort.name = action.payload.name;
      state.sort.sortProperty = action.payload.sortProperty;
    },
    setFilters(state, action) {
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload;
    },
  },
});

//вытаскиваем методы изменения состояния, для экспорта. Чтобы получить методы надо обращаться к actions, а не к redusers, хоть они и лежат там
export const {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

//выполняет логику обработки всего стейта - отвечает за измемнения стейта
export default filterSlice.reducer;

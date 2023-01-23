import { createSlice } from "@reduxjs/toolkit";

//initialState - инициализируемое состояние, по умолчанию
const initialState = {
  totalPrice: 0,
  items: [],
};

//createSlice - в нее необходимо передать объект - имя слайса, первое состояние и какие будут методы изменения состояния
//сама функция создает объект с необходимой логикой redux
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //функция изменения id категории сортировки (метод)
    //метод при вызове получит state и действие, при обращении мы передаем только action, redux toolkit сам добавит state

    addItem(state, action) {
      const findItem = state.items.find(
        (obj) => obj.cartId === action.payload.cartId
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    plusItem(state, action) {
      const findItem = state.items.find((obj) => obj.cartId === action.payload);

      if (findItem) {
        findItem.count++;
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.cartId === action.payload);

      if (findItem) {
        findItem.count--;
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.cartId !== action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    clearItems(state) {
      //любое значение хранится не в самом action, а в action.payload
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

//создаем селектор - именовання функция, которую будет удобнее использовать в компонентах и вместо "(state) => state.cart" писать просто "selectCart"
export const selectCart = (state) => state.cart;

//селектор для подсчета сколько раз пицца добавлена в корзину, при подсчете учитываем разные размеры пицц и складываем в общую сумму. функция получает id вызывает стелочную функцию и возвращает количество пицц
export const selectCartItemById = (id) => (state) =>
  state.cart.items
    .filter((obj) => obj.id === id)
    .reduce((sum, obj) => obj.count + sum, 0);

//вытаскиваем методы изменения состояния, для экспорта. Чтобы получить методы надо обращаться к actions, а не к redusers, хоть они и лежат там
export const { addItem, plusItem, minusItem, removeItem, clearItems } =
  cartSlice.actions;

//выполняет логику обработки всего стейта - отвечает за измемнения стейта
export default cartSlice.reducer;

//добавить сортировку, в firebase api нет, но можно сделать с помощью js, сразу после получения массива так же в firebaseApi нет поиска. может использовать для пицц mockApi
import React from "react";
import axios from "axios";

import { useSelector } from "react-redux";

import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Categories from "../components/Categories";

import { AppContext } from "../App";
import Pagination from "../components/Pagination/Pagination";

function Home() {
  //useSelector - отвечает за вытаскивание данных из хранилища, что-то типо useContect(немного похоже по сути)
  //useDispatch - хук который позволяет что-то сделать - наример, обратиться к действиям

  //с помощбю функции вытаскиваем из state только то, что нам нужно .filter.categoryId
  const categoryId = useSelector((state) => state.filter.categoryId);

  const { searchValue, sortType } = React.useContext(AppContext);
  //массив для хранения пицц
  const [items, setItems] = React.useState([]);
  //отслеживаем загрузку страницы, чтобы выводить скелетон
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setcurrentPage] = React.useState(1);

  //используем, чтобы отправить запрос только один раз при загрузке страницы
  //это сразобает, если в useEffect передать вторым параметром пустой массив!
  //если передаем вторым параметром, например categoryId - то запрос будет отправляться каждый раз, когда мы меняем в нем значение
  React.useEffect(() => {
    //создаем асинхронную функцию, чтобы вызывать await просто в useEffect-нельзя
    async function fetchData() {
      setIsLoading(true);
      try {
        //убираем минусы из видов сортировки
        const sort = sortType.sortProperty.replace("-", "");
        //по минусу определяем сортируем по возрастанию или убываниб
        const order = sortType.sortProperty.includes("-") ? "ask" : "desc";

        //если в категории есть цифра >0 - выводим категорию. если 0 - выводим все пиццы
        const searchCategory = categoryId > 0 ? `category=${categoryId}` : "";

        const itemsResponse = await axios.get(
          //в mockApi плохо работает поиск, поэтому можно искать только по всем пиццам, поэтому если ищем - то без категории
          searchValue === ""
            ? `https://63c907a2904f040a96549005.mockapi.io/pizzas?page=${currentPage}&limit=4&${searchCategory}&sortBy=${sort}&order=${order}`
            : `https://63c907a2904f040a96549005.mockapi.io/pizzas?page=${currentPage}&limit=4&search=${searchValue}&sortBy=${sort}&order=${order}`
        );

        //записываем ответ в массив пиц
        setItems(Object.values(itemsResponse.data));

        setIsLoading(false);
      } catch (error) {
        alert("Unable to load data" + error);
        console.log(error);
      }
    }

    fetchData();
    //при первом открытии страницы делаем скрол в самый верх
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  //делаем фильтрацию по поиску для вывода пицц
  const pizzas = items.filter((obj) => {
    if (
      obj.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    ) {
      return true;
    }
    return false;
  });

  return (
    <div className="container">
      <div className="content__top">
        <Categories />

        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {(isLoading ? [...Array(8)] : pizzas).map((obj, index) => (
          <PizzaBlock key={index} isLoading={isLoading} {...obj} />
        ))}
      </div>
      <Pagination onChangePage={(number) => setcurrentPage(number)} />
    </div>
  );
}

export default Home;

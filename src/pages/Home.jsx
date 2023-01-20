//добавить сортировку, в firebase api нет, но можно сделать с помощью js, сразу после получения массива так же в firebaseApi нет поиска. может использовать для пицц mockApi
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";

import { useSelector, useDispatch } from "react-redux";

import PizzaBlock from "../components/PizzaBlock";
import Sort, { sortList } from "../components/Sort";
import Categories from "../components/Categories";

import { AppContext } from "../App";
import Pagination from "../components/Pagination/Pagination";
import { setCurrentPage, setFilters } from "../redux/slices/filterSlice";

function Home() {
  //переменная для проверки необходимости делать поиск через url
  const isSearch = React.useRef(false);
  //переменная для проверки необходимости вшивать url в строку поиска, при первой загрузке главной странице ничего не должно быть в url
  const isMounted = React.useRef(false);

  //функция для передачи строки в url - с ее помощью записываем параметры сортировки в адресную строку
  const navigate = useNavigate();
  //useSelector - отвечает за вытаскивание данных из хранилища, что-то типо useContect(немного похоже по сути)
  //useDispatch - хук который позволяет что-то сделать - наример, обратиться к действиям

  const dispatch = useDispatch();
  //с помощью функции вытаскиваем из state только то, что нам нужно .filter использую деструктуризация вытаскиваем сразу sort и categoryId

  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );
  const sortType = sort;

  const { searchValue } = React.useContext(AppContext);
  //массив для хранения пицц
  const [items, setItems] = React.useState([]);
  //отслеживаем загрузку страницы, чтобы выводить скелетон
  const [isLoading, setIsLoading] = React.useState(true);

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  //Чтобы при первом открытии приложения параметры не вшивались в url используем проверку isMounted
  //при изменении параметров они будут вшиваться в url
  React.useEffect(() => {
    if (isMounted.current) {
      //с помощью библиотеки qs превращаем объект в одну строку чтобы потом отображать в url
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      //вшиваем параметры в адресную строку
      navigate(`?${queryString}`);
    }

    //если параметры вшили, то ставим isMounted = true
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage]);

  //Если был первый рендер, то проверяем url и сохраняем в redux
  React.useEffect(() => {
    if (window.location.search) {
      //получаем объект, из url парсим строку с запросом фильтрации .substring(1) - убирает "?" в начале строки
      const params = qs.parse(window.location.search.substring(1));

      //получаем объект текущей сортировки проходя по массиву (sortList) из файла sort
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );

      //ставим значение true - чтобы сделать поиск через url
      isSearch.current = true;
    }
  }, []);

  const fetchPizzas = () => {
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
  };

  //используем, чтобы отправить запрос только один раз при загрузке страницы
  //это сразобает, если в useEffect передать вторым параметром пустой массив!
  //если передаем вторым параметром, например categoryId - то запрос будет отправляться каждый раз, когда мы меняем в нем значение
  React.useEffect(() => {
    //при первом открытии страницы делаем скрол в самый верх
    window.scrollTo(0, 0);

    //проверяем надо ли делать запрос стандартных параметров из redux filterSlise или из url
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
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
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;

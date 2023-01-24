//добавить сортировку, в firebase api нет, но можно сделать с помощью js, сразу после получения массива так же в firebaseApi нет поиска. может использовать для пицц mockApi
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";

import { useSelector, useDispatch } from "react-redux";

import PizzaBlock from "../components/PizzaBlock";
import Sort, { sortList } from "../components/Sort";
import Categories from "../components/Categories";

import { AppContext } from "../App";
import Pagination from "../components/Pagination/Pagination";
import { setCurrentPage, setFilters } from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzasSlice";
import Skeleton from "../components/Skeleton";

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

  //массив для хранения пицц
  const { items, status } = useSelector((state) => state.pizza);

  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state) => state.filter
  );
  const sortType = sort;

  //отслеживаем загрузку страницы, чтобы выводить скелетон
  // const [isLoading, setIsLoading] = React.useState(true);

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

  const getPizzas = async () => {
    //убираем минусы из видов сортировки
    const sort = sortType.sortProperty.replace("-", "");
    //по минусу определяем сортируем по возрастанию или убываниб
    const order = sortType.sortProperty.includes("-") ? "ask" : "desc";

    //если в категории есть цифра >0 - выводим категорию. если 0 - выводим все пиццы
    const searchCategory = categoryId > 0 ? `category=${categoryId}` : "";

    const search = searchValue ? `&search=${searchValue}` : "";

    //внутри redux мы запрашиваем пиццы и отлавливаем ошибки
    dispatch(
      fetchPizzas({
        sort,
        order,
        searchCategory,
        search,
        currentPage,
      })
    );
  };

  //используем, чтобы отправить запрос только один раз при загрузке страницы
  //это сразобает, если в useEffect передать вторым параметром пустой массив!
  //если передаем вторым параметром, например categoryId - то запрос будет отправляться каждый раз, когда мы меняем в нем значение
  React.useEffect(() => {
    //при первом открытии страницы делаем скрол в самый верх
    window.scrollTo(0, 0);

    //проверяем надо ли делать запрос стандартных параметров из redux filterSlise или из url
    if (!isSearch.current) {
      getPizzas();
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

  const pizzaItems = pizzas.map((obj, index) => <PizzaBlock {...obj} />);
  const skeletons = [...Array(8)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>
      {status === "error" ? (
        // если будет ошибка рендерим ошибку, если ошибки нет, то загрузка или пиццы
        <div className="content__error-info">
          <h2>Error connection</h2>
          <p>
            Unable to load pizza.
            <br /> Please, try to send request later
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzaItems}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;

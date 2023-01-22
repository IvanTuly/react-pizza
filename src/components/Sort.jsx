import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { setSortType } from "../redux/slices/filterSlice";

//список категорий
export const sortList = [
  { name: "популярности ↑", sortProperty: "-rating" },
  { name: "популярности ↓", sortProperty: "rating" },
  { name: "цене ↑", sortProperty: "-price" },
  { name: "цене ↓", sortProperty: "price" },
  { name: "алафавиту ↑", sortProperty: "-title" },
  { name: "алафавиту ↓", sortProperty: "title" },
];

export default function Sort() {
  //ссылка на dom элемент сортировки, будем использовать чтобы скрывать при клике на страницу
  const sortRef = React.useRef();

  const dispatch = useDispatch();
  const sortType = useSelector((state) => state.filter.sort);

  const [isVisible, setIsVisible] = React.useState(false);

  //функция выбора вида сортировки когда выбрали - закрываем отображение сортировки
  const onClickListItem = (obj) => {
    dispatch(setSortType(obj));
    setIsVisible(false);
  };

  //при первом рэндере страницы вешаем eventListener на body, иначе ни как, птому что в компоненте мы имеем доступ только к sort
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      //если не было клика на sort, то скрываем sort
      if (!event.composedPath().includes(sortRef.current)) {
        setIsVisible(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    //если компонент удалится со страницы, то мы должны удалить обработчик событий с body, иначе при последующем открытии страницы мы получим уже 2 обработика  на body
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        {/* по клику открываем выпадающий список, значение отображаем по индексу массива с категориями */}
        <span onClick={() => setIsVisible(!isVisible)}>{sortType.name}</span>
      </div>
      {/* условный рендеринг &&, будет показываться только если isVisible === true */}
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {/* выводим все категории и по клику сохраняем индекс активной */}
            {sortList.map((obj, index) => (
              <li
                key={index}
                onClick={() => onClickListItem(obj)}
                className={
                  sortType.sortProperty === obj.sortProperty ? "active" : ""
                }
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

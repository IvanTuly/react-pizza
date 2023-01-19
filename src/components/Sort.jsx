import React from "react";
import { AppContext } from "../App";

export default function Sort() {
  //из useContext берем
  const { sortType, setSortType } = React.useContext(AppContext);

  const [isVisible, setIsVisible] = React.useState(false);
  //список категорий
  const list = [
    { name: "популярности ↑", sortProperty: "-rating" },
    { name: "популярности ↓", sortProperty: "rating" },
    { name: "цене ↑", sortProperty: "-price" },
    { name: "цене ↓", sortProperty: "price" },
    { name: "алафавиту ↑", sortProperty: "-title" },
    { name: "алафавиту ↓", sortProperty: "title" },
  ];

  //функция выбора вида сортировки
  const onClickListItem = (index) => {
    setSortType(index);
    setIsVisible(false);
  };

  return (
    <div className="sort">
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
            {list.map((obj, index) => (
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

import React from "react";
import { AppContext } from "../App";

export default function Categories() {
  //из useContext берем функцию isItemAdded
  const { categoryId, setCategoryId } = React.useContext(AppContext);

  const categories = ["All", "Meat", "Vegeterian", "Grill", "Hot", "Closed"];

  const onClickCategory = (index) => {
    setCategoryId(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={categoryId === index ? "active" : ""}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

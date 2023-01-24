import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { setCategoryId } from "../redux/slices/filterSlice";

export default function Categories() {
  //useSelector - отвечает за вытаскивание данных из хранилища, что-то типо useContect(немного похоже по сути)
  //useDispatch - хук который позволяет что-то сделать - наример, обратиться к действиям
  const dispatch = useDispatch();

  const categoryId = useSelector((state) => state.filter.categoryId);

  const categories = ["All", "Meat", "Vegeterian", "Grill", "Hot", "Closed"];

  const onClickCategory = (index) => {
    console.log(index);
    dispatch(setCategoryId(index));
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

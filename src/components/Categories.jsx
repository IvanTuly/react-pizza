import React from "react";
import { AppContext } from "../App";
import { useSelector, useDispatch } from "react-redux";

import { setCategoryId } from "../redux/slices/filterSlice";

export default function Categories() {
  const dispatch = useDispatch();

  const categoryId = useSelector((state) => state.filter.categoryId);

  const categories = ["All", "Meat", "Vegeterian", "Grill", "Hot", "Closed"];

  const onClickCategory = (index) => {
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

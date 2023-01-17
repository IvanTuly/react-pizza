import React from "react";

export default function Categories() {
  const [activeCategory, setActiveCategory] = React.useState(0);

  const categories = ["All", "Meat", "Vegeterian", "Grill", "Hot", "Closed"];

  const onClickCategory = (index) => {
    setActiveCategory(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={activeCategory === index ? "active" : ""}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

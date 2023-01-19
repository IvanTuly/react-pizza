import React from "react";
import ContentLoader from "react-content-loader";

export default function PizzaBlock({
  title,
  price,
  imageUrl,
  sizes,
  types,
  isLoading = false,
}) {
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  const typeNames = ["Тонкое", "Традиционное"];

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        {isLoading ? (
          <ContentLoader
            speed={2}
            width={300}
            height={490}
            viewBox="0 0 300 490"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <circle cx="135" cy="125" r="120" />
            <rect x="0" y="310" rx="15" ry="15" width="280" height="90" />
            <rect x="0" y="422" rx="0" ry="0" width="90" height="30" />
            <rect x="130" y="415" rx="25" ry="25" width="144" height="50" />
            <rect x="10" y="265" rx="0" ry="0" width="260" height="20" />
          </ContentLoader>
        ) : (
          <>
            <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
            <h4 className="pizza-block__title">{title}</h4>
            <div className="pizza-block__selector">
              <ul>
                {types.map((type) => (
                  <li
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={activeType === type ? "active" : ""}
                  >
                    {typeNames[type]}
                  </li>
                ))}
              </ul>
              <ul>
                {sizes.map((size, index) => (
                  <li
                    key={index}
                    onClick={() => setActiveSize(index)}
                    className={activeSize === index ? "active" : ""}
                  >
                    {size} см.
                  </li>
                ))}
              </ul>
            </div>
            <div className="pizza-block__bottom">
              <div className="pizza-block__price">от {price} ₽</div>
              <div className="button button--outline button--add">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                    fill="white"
                  />
                </svg>
                <span>Добавить</span>
                <i>0</i>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

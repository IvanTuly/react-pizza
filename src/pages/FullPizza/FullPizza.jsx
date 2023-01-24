import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./FullPizza.module.scss";

export default function FullPizza() {
  //вытаскиваем из url динамический параметр, мы задали параметр как id в app.js
  const params = useParams();
  //будем использовать, чтобы перекинуть на главную страницу, если пицца не загрузилась
  const navigate = useNavigate();
  const [pizza, setPizza] = React.useState();

  React.useEffect(() => {
    async function fetchFunction() {
      try {
        const response = await axios.get(
          `https://63c907a2904f040a96549005.mockapi.io/pizzas/${params.id}`
        );
        setPizza(response.data);
      } catch (error) {
        alert("Unable to load pizza");
        console.log(error);
        navigate("/");
      }
    }

    fetchFunction();
  }, []);

  if (!pizza) {
    return "Loading...";
  }

  return (
    <div className="container">
      <div className={styles.pizza}>
        <img className={styles.image} src={pizza.imageUrl} />
        <div className={styles.pizza_info}>
          <h2>{pizza.title} </h2>
          <p>Ingredients:</p>
          {pizza.ingredients.map((ingredient) => (
            <div className={styles.ingredients}>• {ingredient}</div>
          ))}
          <div className={styles.price}>
            <div>Price:</div>
            <div>{pizza.price} $</div>
          </div>
        </div>
      </div>
    </div>
  );
}

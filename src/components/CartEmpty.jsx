import React from "react";
import { Link } from "react-router-dom";

export default function CartEmpty() {
  return (
    <>
      <div className="cart cart--empty">
        <h2>
          Cart empty <icon>😕</icon>
        </h2>
        <p>
          You probably haven't ordered pizza yet.
          <br />
          To order pizza, go to the main page.
        </p>
        <img src="/img/empty-cart.png" alt="Empty cart" />
        <Link to="/react-pizza/" className="button button--black">
          <span>Come back</span>
        </Link>
      </div>
    </>
  );
}

import React from "react";
import { AppContext } from "../../App";
import styles from "./Search.module.scss";

export default function Search() {
  const { searchValue, setSearchValue } = React.useContext(AppContext);
  return (
    <div className={styles.root}>
      <input
        onChange={(event) => setSearchValue(event.target.value)}
        placeholder="Search Pizza"
        value={searchValue}
      />
      {searchValue && (
        <svg
          className={styles.clearIcon}
          onClick={() => setSearchValue("")}
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.37521 21.5322C6.87489 22.0415 7.74348 22.0234 8.2284 21.5406L13.9373 15.82L19.6537 21.5364C20.1471 22.0298 20.9955 22.0394 21.4952 21.5301C22.0141 21.0208 22.0045 20.1724 21.5015 19.679L15.7968 13.9605L21.5015 8.25577C22.0045 7.76031 22.0141 6.90227 21.4952 6.4047C20.9955 5.89541 20.1471 5.90501 19.6537 6.39626L13.9373 12.1106L8.2284 6.39415C7.74348 5.90923 6.87489 5.8933 6.37521 6.40048C5.86803 6.90016 5.88396 7.76875 6.36888 8.25366L12.0895 13.9605L6.36888 19.6811C5.88396 20.166 5.86803 21.0229 6.37521 21.5322Z"
            fill="black"
          />
        </svg>
      )}
    </div>
  );
}

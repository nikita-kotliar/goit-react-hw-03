import { useId } from "react";
import css from "./SearchBox.module.css";

export default function SearchBox({ inputValue, handleSearch }) {
  const searchInputId = useId();
  return (
    <div className={css.search_box}>
      <label htmlFor={css.search_text}>Find contacts by name</label>
      <input
        className={css.search_input}
        name="searchName"
        type="text"
        id={searchInputId}
        value={inputValue}
        onChange={handleSearch}
      ></input>
    </div>
  );
}
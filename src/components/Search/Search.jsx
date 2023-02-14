import "./Search.scss";
import { BiSearch } from "react-icons/bi";

const Search = ({changeHandler}) => {
  return (
    <div className="search-container">
      <BiSearch className="search-icon" />
      <input type="text" className="search-input" onChange={changeHandler}/>
    </div>
  );
};

export default Search;

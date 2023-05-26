import { Button } from "@material-ui/core";
import { MicOutlined, SearchRounded } from "@material-ui/icons";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Search.css";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
function Search({ hideButtons }) {
  const [input, setInput] = useState("");
  const history = useHistory();

  const [{}, dispatch] = useStateValue();

  const search = (e) => {
    e.preventDefault();
    console.log("You hit the search button");
    //do something
    history.push("/search");

    dispatch({
      type: "SET_SEARCH_TYPE",
      term: input,
    });
  };

  const handleChange = (e) => setInput(e.target.value);

  return (
    <form className="search">
      <div className="search__input">
        <SearchRounded className="search__inputIcon" />
        <input onChange={handleChange} value={input} />
        <MicOutlined />
      </div>

      {!hideButtons ? (
        <div className="search__buttons">
          <Button type="submit" onClick={search} variant="outlined">
            Google Search{" "}
          </Button>
          <Button variant="outlined">I'm Feeling Lucky </Button>
        </div>
      ) : (
        <div className="search__buttonsHidden">
          <Button type="submit" onClick={search} variant="outlined">
            Google Search{" "}
          </Button>
          <Button variant="outlined">I'm Feeling Lucky </Button>
        </div>
      )}
    </form>
  );
}

export default Search;

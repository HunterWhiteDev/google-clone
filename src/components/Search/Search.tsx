import { Button } from "@material-ui/core";
import { MicOutlined, SearchRounded } from "@material-ui/icons";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Search.css";
import { useStateValue } from "../../StateProvider";

interface SearchProps {
  hideButtons?: boolean;
}

function Search({ hideButtons }: SearchProps) {
  const [input, setInput] = useState("");
  const history = useHistory();

  const [{ term }, dispatch]: any = useStateValue();

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    history.push("/search");

    dispatch({
      type: "SET_SEARCH_TERM",
      term: input,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  return (
    <form className="search">
      <div className="search__input">
        <SearchRounded className="search__inputIcon" />
        <input onChange={handleChange} value={input || term} />
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

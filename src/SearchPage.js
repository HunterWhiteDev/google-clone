import React from "react";
import "./searchPage.css";
import { useStateValue } from "./StateProvider";
import useGoogleSearch from "./useGoogleSearch";
import response from "./response";
import { Link } from "react-router-dom";
import Search from "./Search";
import { SearchRounded } from "@material-ui/icons";
import ImageIcon from "@material-ui/icons/Image";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import DescriptionIcon from "@material-ui/icons/Description";
import RoomIcon from "@material-ui/icons/Room";
function SearchPage() {
  const [{ term }, dispatch] = useStateValue();

  const { data } = useGoogleSearch(term); //LIVE API CALL

  //  const data = response; //MOCK API CALL

  console.log(data);
  return (
    <div className="searchPage">
      <div className="searchPage__header">
        <Link to="/">
          <img
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            alt=""
            className="searchPage__logo"
          />
        </Link>
        <div className="searchPage__headerBody">
          <Search hideButtons />
          <div className="searchPage__options">
            <div className="searchPage__optionsLeft">
              <div className="searchPage_option">
                <SearchRounded />
                <Link to="/all">All</Link>
              </div>
              <div className="searchPage_option">
                <DescriptionIcon />
                <Link to="/all">News</Link>
              </div>
              <div className="searchPage_option">
                <ImageIcon />
                <Link to="/all">Images</Link>
              </div>
              <div className="searchPage_option">
                <LocalOfferIcon />
                <Link to="/all">Shopping</Link>
              </div>
              <div className="searchPage_option">
                <RoomIcon />
                <Link to="/all">Maps</Link>
              </div>
            </div>

            <div className="searchPage__optionsRight">
              <Link to="/settings">Settings</Link>
              <Link to="/tools">Tools</Link>
            </div>
          </div>
        </div>
      </div>
      {data && (
        <div className="searchPage__results">
          <div className="searchPage__resultCount">
            <p>
              {" "}
              About {data?.searchInformation.formattedTotalResults} results (
              {data?.searchInformation.formattedSearchTime} seconds) for {term}{" "}
            </p>
          </div>
          {data?.items.map((item) => (
            <div className="searchPage__result">
              <a href={item.link}>
                {item.pagemap?.cse_image?.length > 0 &&
                  item.pagemap?.cse_image[0]?.src && (
                    <img
                      className="serachPage__resultImage"
                      src={item.pagemap?.cse_image[0]?.src}
                      alt=""
                    />
                  )}
                {item.displayLink}{" "}
              </a>
              <a className="searchPage__resultTitle" href={item.link}>
                <h2>{item.title}</h2>
              </a>
              <p className="searchPage__resultSnippet">{item.snippet}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;

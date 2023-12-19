import React from "react";
import "./SearchPage.css";
import { useStateValue } from "../../StateProvider";
import useGoogleSearch from "../../hooks/useGoogleSearch";
import { Link } from "react-router-dom";
import Search from "../../components/Search/Search";
import { SearchRounded } from "@material-ui/icons";
import ImageIcon from "@material-ui/icons/Image";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import DescriptionIcon from "@material-ui/icons/Description";
import RoomIcon from "@material-ui/icons/Room";
function SearchPage() {
  const [{ term, searchType }, dispatch]: any = useStateValue();

  const { data }: any = useGoogleSearch(term, searchType); //LIVE API CALL

  const setSearchType = (type: string) => {
    dispatch({
      type: "SET_SEARCH_TYPE",
      searchType: type,
    });
  };

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
              <div
                className="searchPage_option"
                onClick={() => setSearchType("")}
              >
                <SearchRounded />
                <Link to="">All</Link>
              </div>
              <div
                className="searchPage_option"
                onClick={() => setSearchType("image")}
              >
                <ImageIcon />
                <Link to="">Images</Link>
              </div>
              <div className="searchPage_option">
                <DescriptionIcon />
                <Link to="/all">News</Link>
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
              About {data?.searchInformation?.formattedTotalResults} results (
              {data?.searchInformation?.formattedSearchTime} seconds) for {term}{" "}
            </p>
          </div>
          {!searchType &&
            data?.items?.map((item: any) => (
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

          {searchType === "image" && (
            <div className="searchPage__resultImages">
              {data &&
                data?.items?.map((item: any) => (
                  <img
                    alt=""
                    onClick={() => window.open(item.image.contextLink)}
                    src={item.link}
                  />
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchPage;

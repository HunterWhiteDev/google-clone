import { useState, useEffect } from "react";
import API_KEY from "../keys";
const CONTEXT_KEY = "277954575e35a2336";

const useGoogleSearch = (term: string, searchType: string) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let results: any = [];
      let promises = [];

      let time = 0;
      let resultsCount = 0;

      if (searchType === "image") {
        for (let i = 1; i <= 3; i++) {
          const string = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${term}&searchType=image&start=${
            i * 10 - 10
          }&end=${i * 10}`;

          const promise = fetch(string)
            .then((response) => response.json())
            .then((result) => {
              results.push(...result.items);
              time += result.searchInformation.searchTime;
              resultsCount += parseInt(result.searchInformation.totalResults);
            });

          promises.push(promise);
        }
        Promise.all(promises)
          .then(() => {
            // All promises have resolved
            setData({
              //@ts-ignore
              items: results,
              searchInformation: {
                formattedSearchTime: time,
                formattedTotalResults: resultsCount,
              },
            });
          })
          .catch((error) => {
            // Handle errors
            console.error("Error:", error);
          });
      } else {
        const string = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${term}${
          searchType ? `&searchType=${searchType}&start=0&end=100` : ""
        }`;

        fetch(string)
          .then((response) => response.json())
          .then((result) => {
            setData(result);
          });
      }
    };
    fetchData();
  }, [term, searchType]);

  return { data };
};

export default useGoogleSearch;

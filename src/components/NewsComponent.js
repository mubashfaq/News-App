import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default function NewsComponent(props) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);


  const updateNews = async () => {
    try {
      props.setProgress(10);
      console.log("Fetching initial news...");

      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=1&pageSize=${props.pageSize}`;
      console.log("Initial fetch URL:", url);

      setLoading(true);
      const data = await fetch(url);
      props.setProgress(40);
      const parsedData = await data.json();
      props.setProgress(70);
      if (!parsedData.articles || !Array.isArray(parsedData.articles)) {
        console.error("No valid articles array returned!", parsedData.articles);
        setArticles([]);
        setTotalResults(0);
      } else {
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults || 0);
      }

      setLoading(false);
      props.setProgress(100);
    } catch (error) {
      console.error("Error fetching initial news:", error);
    }
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line
  }, [props.category]);

  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1;
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${nextPage}&pageSize=${props.pageSize}`;
      setPage(nextPage);
      console.log("Fetching more data from:", url);

      const data = await fetch(url);
      const parsedData = await data.json();

      console.log("More data response:", parsedData);

      if (!parsedData.articles || !Array.isArray(parsedData.articles)) {
        console.error("Invalid articles in more data:", parsedData.articles);
        return;
      }

      setArticles((prevArticles) => [...prevArticles, ...parsedData.articles]);
      setTotalResults(parsedData.totalResults || 0);
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };

  return (
    <div className="container my-3">
      <h2 className='mb-3'>News Monkey - Top {capitalizeFirstLetter(props.category)} Headlines</h2>

      {loading && <Spinner />}

      <InfiniteScroll
        style={{ overflow: 'hidden' }}
        dataLength={articles.length || 0}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="row">
          {articles.length > 0 ? (
            articles.map((e) => (
              <div className="col-md-4" key={e.url}>
                <NewsItem
                  title={e.title ? (e.title.length > 45 ? e.title.slice(0, 45) + '...' : e.title) : 'No Title'}
                  description={e.description ? e.description.slice(0, 90) + '...' : 'No Description'}
                  imageUrl={e.urlToImage}
                  newsUrl={e.url}
                  author={e.author || 'Unknown'}
                  date={e.publishedAt || 'Unknown Date'}
                  source={e.source?.name || 'Unknown Source'}
                />
              </div>
            ))
          ) : (
            !loading && <p>API Limit has been reached.Calm down.

            </p>
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
}

NewsComponent.defaultProps = {
  country: 'us',
  pageSize: 9,
  category: 'general'
};

NewsComponent.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apikey: PropTypes.string,
  setProgress: PropTypes.func
};

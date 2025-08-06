import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class NewsComponent extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 9,
    category: 'business'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  articles = []
  constructor(props) {
    super(props);
    this.state = {
      articles: this.articles,
      loading: true,
      page: 1,
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;

  }


  async updateNews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=70c0aed5089247e480e6ae8f6a71c0be&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(40);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();

  }

  fetchMoreData = async () => {
    this.props.setProgress(10);
    this.setState({
      page: this.state.page + 1,
    });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=70c0aed5089247e480e6ae8f6a71c0be&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(40);
    let parsedData = await data.json();
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false
    });
    this.props.setProgress(100);
  };


  render() {
    return (
      <div>
        <div className="container my-3 ">
          <h2 className='mb-3' >News Monkey - Top {this.capitalizeFirstLetter(this.props.category)}  Headlines</h2>
          <InfiniteScroll
            style={{ overflow: 'hidden' }}
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length < this.state.totalResults}
            loader={<Spinner />}
          >
            <div className="row">
              {this.state.articles.map((e) => {
                return <div className="col-md-4" key={e.url}>
                  <NewsItem
                    title={e.title.length > 45 ? e.title.slice(0, 45) + '...' : ''}
                    description={e.description ? e.description.slice(0, 90) + '...' : ''}
                    imageUrl={e.urlToImage }
                    newsUrl={e.url}
                    author={e.author ? e.author : 'Unknown'}
                    date={e.publishedAt}
                    source={e.source.name}
                  />
                </div>
              })}


            </div>
          </InfiniteScroll>

        </div>
      </div>
    );
  }
}

export default NewsComponent;
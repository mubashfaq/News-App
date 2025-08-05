import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';


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


  articles = []
  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: true,
      page: 1,
    }
  }


  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=70c0aed5089247e480e6ae8f6a71c0be&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await  data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
  }

  async componentDidMount() {
    this.updateNews();

  }

  handlePrevBtn = async () => {
   this.setState({page : this.state.page - 1});
   this.updateNews();
  }

  handleNextBtn = async () => {
    this.setState({page : this.state.page + 1});
    this.updateNews();
  }


  render() {
    return (
      <div>
        <div className="container my-3 ">
          <h2 className='mb-3' >News Monkey - Top Headlines</h2>
          {this.state.loading && <Spinner />}

          <div className="row">
            {!this.state.loading && this.state.articles.map((e) => {
              return <div className="col-md-4" key={e.url}>
                <NewsItem
                  title={e.title.length > 45 ? e.title.slice(0, 45) + '...' : ''}
                  description={e.description ? e.description.slice(0, 90) + '...' : ''}
                  imageUrl={e.urlToImage}
                  newsUrl={e.url}
                  author={e.author ? e.author : 'Unknown'}
                  date={e.publishedAt}
                  source={e.source.name}
                />

              </div>
            })}


          </div>
        </div>
        {/*  Pagination */}
        <nav className='container' aria-label="Page navigation example ">
          <ul className="pagination justify-content-between">
            <li className="page-item">
              <button disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevBtn} >
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            <li className="page-item">
              <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / `${this.props.pageSize}`)} className="btn btn-dark" onClick={this.handleNextBtn} >
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default NewsComponent;
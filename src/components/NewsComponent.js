import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

export class NewsComponent extends Component {
  articles = []
  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: true,
      page: 1,
    }
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=70c0aed5089247e480e6ae8f6a71c0be&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false 
    });

  }

  handlePrevBtn = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=70c0aed5089247e480e6ae8f6a71c0be&page=${this.state.page - 1}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    });
  }

  handleNextBtn = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=70c0aed5089247e480e6ae8f6a71c0be&page=${this.state.page + 1}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading: false,
    });
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
                  newsUrl={e.url} />
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
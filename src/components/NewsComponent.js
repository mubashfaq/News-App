import React, { Component } from 'react';
import NewsItem from './NewsItem';

export class NewsComponent extends Component {
  articles = []
  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: true
    }
  }

  async componentDidMount() {
    let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=70c0aed5089247e480e6ae8f6a71c0be";
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
    });

  }

  render() {
    return (
      <div>
        <div className="container my-3 ">
          <h2 className='mb-3' >News Monkey - Top Headlines</h2>

          <div className="row">

            {this.state.articles.map((e) => {
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
      </div>
    );
  }
}

export default NewsComponent;

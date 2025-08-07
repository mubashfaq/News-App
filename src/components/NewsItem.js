import React from 'react';

export default function NewsItem(props) {
  let { title, description, imageUrl, newsUrl, date, author, source } = props;
  return (
    <div>
      <div className="card my-1 ">
        <img src={imageUrl ? imageUrl : '/image-not-found.png'} className="card-img-top" alt="..." />
        <div className="card-body">
          <span className="badge rounded-pill text-bg-warning">{source}</span>
          <h5 className="card-title">{title}</h5>
          <p className="card-text text-muted">Published on {new Date(date).toGMTString().slice(0, 16)} by {author}</p>
          <p className="card-text">{description}</p>
          <a href={newsUrl} className="btn btn-dark">Read More</a>
        </div>
      </div>
    </div>
  );
}


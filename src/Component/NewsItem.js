import React, { Component } from 'react'

export class NewsItem extends Component {
  // constructor(){
  //   super();
  //   // console.log("NewsItem")
  // }
  render() {
    let {title, desc, imageUrl, newsUrl, author, publishedAt, source} = this.props;
    return (
      <div className="card my-2" style={{width: "18rem"}}>
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{source.name}</span>
        <img src={imageUrl} className="card-img-top" alt="..." style={{height: "161px", width: "286px"}} />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{desc}...</p>
          <p className="card-text"><small className="text-muted"> By {!author? "Unknow": author} on {new Date(publishedAt).toGMTString()} </small></p>
          <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">
            Read More
          </a>
        </div>
      </div>
    )
  }
}

export default NewsItem

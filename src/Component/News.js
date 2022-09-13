import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general'   
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  

  constructor(props) {
    super(props);
    // console.log("News")
    this.state = {
      articles: [],
      page: 1,
      loading: false
    }
    document.title = `${this.props.category[0].toUpperCase()}${this.props.category.substring(1)} - NewsMonkey`
  }
  // apiKey=d10041f36c7344d2b12922ea2ed514e8

  async updateNews(){
    this.props.setProgress(10)
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d10041f36c7344d2b12922ea2ed514e8&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url)
    this.props.setProgress(30)
    let parsedData = await data.json()
    this.props.setProgress(70)
    console.log(parsedData)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100)
  }

  async componentDidMount() {
    this.updateNews();
  }

  handleNextClick = async () => {
      await this.setState({page: this.state.page + 1})
      this.updateNews()
  }
  
  handlePrevClick = async () => {
      await this.setState({page: this.state.page - 1})
      this.updateNews()
  }

  fetchMoreData = async () => {
    await this.setState({page: this.state.page + 1});
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d10041f36c7344d2b12922ea2ed514e8&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url)
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({
      articles: parsedData.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    })
  };

  render() {
    // console.log("render")
    return (
      <>
          <h1 className='text-center'>NewsMonkey - top {this.props.category[0].toUpperCase()+this.props.category.substring(1)} Headlines</h1>
          {this.state.loading && <Spinner/>}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.totalResults}
          loader={<Spinner/>}
        > 
        <div className="container">
          <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={
                    element.title != null
                    ? element.title.slice(0, 45)
                    : element.title
                  }
                  source={element.source} 
                  author={element.author} 
                  publishedAt={element.publishedAt}
                  desc={
                    element.description != null
                    ? element.description.slice(0, 88)
                    : element.desc
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  />
              </div>
            )
          })}
          </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between my-3">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            Previous
          </button>
          <button
            disabled={this.state.page === Math.ceil(this.state.totalResults / 9)}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next
          </button>
        </div> */}
      </>
    )
  }
}

export default News

import React from 'react'
import PropTypes from 'prop-types'

export default class Search extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      keyword: ''
    }
  }

  handleSearch () {
    this.props.onGetData && this.props.onGetData('', this.state.keyword)
  }

  handleInputChange (event) {
    let keyword = event.target.value
    this.setState({ keyword })
  }

  hankleInputKeyUp (event) {
    if (event.keyCode === 13) {
      this.handleSearch()
    }
  }

  handleBlur (event) {
    this.props.onInputBlur && this.props.onInputBlur(event.target.value)
  }

  render () {
    return (<div className="search-container">
        <input type="text" className="search-input" placeholder={this.props.placeholder} value={this.state.keyword} onChange={this.handleInputChange.bind(this)} onKeyUp={this.hankleInputKeyUp.bind(this)} onBlur={this.handleBlur.bind(this)}/>
        <button className="search-button" onClick={this.handleSearch.bind(this)}>搜索</button>
    </div>)
  }
}

Search.propTypes = {
  onInputBlur: PropTypes.func,
  onGetData: PropTypes.func,
  placeholder: PropTypes.string
}

import React from 'react'
import DetailBook from './detailBook'
import DetailMovie from './detailMovie'
import DetailMusic from './detailMusic'
import { Link } from 'react-router-dom'
import util from './util'

export default class DetailContainer extends React.Component {
  constructor (props) {
    super(props)
    // 获取当前点击的是第几个内容
    var index = this.props.match.params.index
    // 从浏览器缓存中将具体内容取出
    var content = localStorage.content ? JSON.parse(localStorage.content)[index] : ''
    var topic = localStorage.topic || ''
    var DetailItem = topic === 'book' ? DetailBook : topic === 'movie' ? DetailMovie : DetailMusic
    this.state = { index, content, topic, DetailItem }
  }

  componentWillMount () {
    document.querySelector('#root').scrollIntoView(true)
  }

  componentDidUpdate () {
    this.node.scrollIntoView(true)
  }

  handleReturn (event) {
    localStorage.removeItem('curContent')
  }

  render () {
    return (
        <div ref={node => this.node = node} className="detail-container">
            <header className="detail-header">
                <Link to="/" onClick={this.handleReturn.bind(this)}>
                    <i></i>
                    <span className="returnMain">{util.topics[this.state.topic]}</span>
                </Link>
                <h1>{this.state.content.title}</h1>
            </header>
            <this.state.DetailItem content={this.state.content} />
        </div>
    )
  }
}

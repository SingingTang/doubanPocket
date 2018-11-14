import React, { Component } from 'react'
import Search from './search/search'
import util from '../util'
import TopicList from './topic/topicList'
import fetchJsonp from 'fetch-jsonp'
import ContentList from './content/contentList'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      topic: window.localStorage.topic || 'book',
      keyword: '',
      content: window.localStorage.content ? JSON.parse(window.localStorage.content) : []
    }
  }

  setScrollTop (top) {
    if (!isNaN(top)) {
      document.body.scrollTop = 1000
    }
  }

  componentWillMount () {
    if (this.state.content.length) {
      this.setScrollTop(window.localStorage.top)
    } else {
      // 获取数据
      this.onGetData(this.state.topic, this.state.keyword, 0, false)
    }
  }

  // 判断是否有本地缓存，如果有，返回true，直接修改state，如果没有，返回false
  ifLocalStorage (topic, keyword, start) {
    var content = window.localStorage.getItem(`${topic}&&${keyword}`)
    if (content) {
      // 转换格式对象格式
      content = JSON.parse(content)
      // 是否有当前页数的数据
      if (content[start]) {
        content = content[start]
        if (+new Date() - content.createdTime < 10 * 60 * 1000) {
          // 保存当前请求的数据内容
          this.setState({ topic, content: content.content })
          // 将当前的内容存进浏览器缓存
          this.saveData(topic, keyword, start, content.content)
          return true
        }
      }
    }
    return false
  }

  // 处理新的请求
  // 参数frsh代表是否为刷新操作，如果是，则不管有没有缓存都会请求数据
  onGetData (topic, keyword, start = 0, fresh = false) {
    var keyword = keyword || this.state.keyword
    var topic = topic || this.state.topic || 'book'

    // 获取完整url
    var url = this.parseUrl(topic, keyword, start)

    // 如果有缓存，则不请求数据
    if (!fresh && this.ifLocalStorage(topic, keyword, start)) {
      return
    }

    // 获取请求内容
    let content = ''
    let self = this
    // 使用jsonp请求数据
    fetchJsonp(url)
      .then(function (response) {
        return response.json()
      }).then(function (json) {
        // 提取出想要的数据
        content = self.filterData(topic, json)
        self.saveData(topic, keyword, start, content, true)
      }).catch(function (ex) {
        console.log('parsing failed', ex)
      })
  }

  parseUrl (topic, keyword, start = 0) {
    let url
    // 当没有搜索关键词，以及类型是电影的时候，默认搜索top250
    if (!keyword && topic === 'movie') {
      keyword = 'top250'
      // 拼接URL
      url = `${util.url}${topic}/top250?start=${start * 20}`
    } else {
      // 如果类型是不是电影，则默认关键词为a
      keyword = keyword || 'a'
      url = `${util.url}${topic}/search?q=${keyword}&&start=${start * 20}`
    }
    return url
  }

  // 提取出各种类型的所需要的内容
  filterData (topic, json) {
    var type = topic === 'movie' ? 'subjects' : topic + 's'
     let contents = json[type]
    return contents.map(content => {
      var title = content.title
      var rating = content.rating.average
      var tags = content.genres || content.tags.map(tag => tag.name)
      var image = content.image || content.images.small
      var data = { title, rating, tags, image }

      if (topic === 'movie') {
        data.directors = content.directors.map(dir => {
          return dir.name
        })
        data.avatars = content.casts.map(cats => cats.avatars && cats.avatars.small
        )
        data.pubdate = content.year
        data.originalTitle = content.original_title
        data.author = content.casts.map(casts => casts.name)
      } else if (topic === 'book') {
        data.price = content.price
        data.catalog = content.catalog
        data.summary = content.summary
        data.pubdate = content.pubdate
        data.author = content.author
      } else if (topic === 'music') {
        data.author = content.attrs.singer
        data.publisher = content.attrs.publisher
        data.pubdate = content.attrs.pubdate
        data.tracks = content.attrs.tracks
      }
      return data
    })
  }

  saveData (topic, keyword, start, content, saveTime) {
    // 如果开始页数不为0，则说明应该是加载更多的操作，则，将获取的内容拼接在当前内容后面
    if (start) {
      content = this.state.content.concat(content)
    }
    this.setState({ topic, content })

    if (saveTime) {
      // var item = {};
      // item[start] = { content, createdTime: + new Date() };
      // 取出当前存储的数据，若有，则转化为对象，再添加，再转成字符串存储
      var curContent = window.localStorage[`${topic}&&${keyword}`]
      if (curContent) {
        // 转化为对象
        curContent = JSON.parse(curContent)
        // 增加一项
        curContent[start] = { content, createdTime: +new Date() }
        // Object.assign(curItem, curItem, item);
        // 将新的内容存进浏览器缓存
        window.localStorage[`${topic}&&${keyword}`] = JSON.stringify(curContent)
      } else {
        // 若没有，则直接存储当前的新增item
        window.localStorage[`${topic}&&${keyword}`] = JSON.stringify({ content, createdTime: +new Date() })
      }
    }
    // 存储当前展现列表的类型，内容，以及开始条目
    window.localStorage.setItem('topic', topic)
    window.localStorage.setItem('content', JSON.stringify(content))
    window.localStorage.setItem('start', start)
  }

  savelocalStorage (items) {
    for (var item in items) {
      window.localStorage.setItem(item, items[item])
    }
  }

  onChangeTopic (topic) {
    this.onGetData(topic)
  }

  // 当输入框失去焦点时的处理函数
  onInputBlur (keyword) {
    // 实时更新关键词
    this.setState({ keyword })
    window.localStorage.setItem('keyword', keyword)
  }

  componentDidMount () {
    // 将页面滚动至上次离开的位置
    document.documentElement.scrollTop = parseInt(window.localStorage.top) || 0
    window.localStorage.removeItem('top')
  }

  render () {

        return (<div ref={app => this.app = app} className="app" >
            <Search
                onInputBlur={this.onInputBlur.bind(this)}
                placeholder={util.placeholder[this.state.topic]}
                onGetData={this.onGetData.bind(this)}
            />
            <TopicList
                onChangeTopic={this.onChangeTopic.bind(this)}
                topicList={util.topicList}
                curTopic={this.state.topic}
            />
            <ContentList
                content={this.state.content}
                topic={this.state.topic}
                onRefresh={this.onGetData.bind(this)}
            />
            
            <div className="refresh" >正在刷新...</div>
            <div className="loadmore" >加载更多...</div>
        </div>);
  }
}
module.exports = Home

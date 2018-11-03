import React, { Component } from 'react';
import './style.css';
import Search from './search';
import TopicList from './topicList';
import fetchJsonp from 'fetch-jsonp';
import ContentList from './contentList';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topic: localStorage.topic || 'book',
            keyword: '',
            content: localStorage.content ? JSON.parse(localStorage.content) : [],
            url: 'https://api.douban.com/v2/',
            topicList: [
                { book: '图书' },
                { movie: '电影' },
                { music: '音乐' }
            ],
            placeholder: {
                book: '书名、作者、ISBN',
                movie: '电影、影人、影院、电视剧',
                music: '唱片名、表演者、条码、ISRC'
            }
        }
    }

    setScrollTop(top) {
        if (!isNaN(top)) {
            console.log('top');
            document.body.scrollTop = 1000;
        }
    }

    componentWillMount() {

        if (this.state.content.length) {
            console.log('if');
            console.log(this.state.content)
            this.setScrollTop(localStorage.top);
        } else {
            console.log('else');
            this.onGetData(this.state.topic, this.state.keyword, 0, false);
        }

    }


    // 判断是否有本地缓存，如果有，返回true，直接修改state，如果没有，返回false
    ifLocalStorage(topic, keyword, start) {

        var content = localStorage.getItem(`${topic}&&${keyword}`);
        if (content) {
            // 转换格式对象格式 
            content = JSON.parse(content);
            // 是否有当前页数的数据
            if (content[start]) {
                content = content[start];
                if (+new Date() - content.createdTime < 10 * 60 * 1000) {
                    this.setState({ topic, content: content.content });
                    this.saveData(topic, keyword, start, content.content);
                    return true;
                }
            }


        }
        return false;

    }

    // 
    onGetData(topic, keyword, start = 0, fresh = false) {

        var keyword = keyword || this.state.keyword;
        var topic = topic || this.state.topic || 'book';
        let url;
        if (!keyword && topic === 'movie') {
            keyword = "top250";
            url = `${this.state.url}${topic}/top250?start=${start*20}`;
        } else {
            keyword = keyword || 'a';
            url = `${this.state.url}${topic}/search?q=${keyword}&&start=${start * 20}`;
        }
        console.log(start*20);

        console.log(url);

        // 如果有缓存，则不请求数据
        if (!fresh && this.ifLocalStorage(topic, keyword, start)) {
            console.log(fresh);
            return;
        }

        let content = '';
        let self = this;
        // 使用jsonp请求数据
        fetchJsonp(url)
            .then(function (response) {
                return response.json()
            }).then(function (json) {
                // 提取出想要的数据
                console.log(url);
                content = self.filterData(topic, json);
                console.log(content instanceof Array);
                self.saveData(topic, keyword, start, content, true);
            }).catch(function (ex) {
                console.log('parsing failed', ex)
            })
    }


    filterData(topic, json) {
        var type = topic === 'movie' ? 'subjects' : topic + 's';
        let contents = json[type];
        return contents.map(content => {
            var title = content.title;
            var author = content.author || content.casts.map(casts => casts.name);
            var rating = content.rating.average;
            var tags = content.genres || content.tags.map(tag => tag.name);
            var image = content.image || content.images.small;
            var data = { title, author, rating, tags, image };

            if (topic === 'movie') {
                data.directors = content.directors.map(dir => {
                    return dir.name;
                })
                data.avatars = content.casts.map(cats => cats.avatars && cats.avatars.small
                );
                data.pubdate = content.year;
                data.originalTitle = content.original_title;
            } else if (topic === 'book') {
                data.price = content.price;
                data.catalog = content.catalog;
                data.summary = content.summary;
                data.pubdate = content.pubdate;
            } else if (topic === 'music') {
                data.author = content.attrs.singer;
                data.publisher = content.attrs.publisher;
                data.pubdate = content.attrs.pubdate;
                data.tracks = content.attrs.tracks;
            }

            return data;
        })


    }

    saveData(topic, keyword, start, content, saveTime) {
        if (start) {
            content = this.state.content.concat(content);
        }
        console.log(content);
        this.setState({ topic, content });

        if (saveTime) {
            var item = {};
            item[start] = { content, createdTime: + new Date() };
            console.dir(item);
            // 取出当前存储的数据，若有，则转化为对象，再添加，再转成字符串存储
            var curItem = localStorage[`${topic}&&${keyword}`];
            if (curItem) {
                curItem = JSON.parse(curItem);
                Object.assign(curItem, curItem, item);
                console.dir(curItem);
                localStorage[`${topic}&&${keyword}`] = JSON.stringify(curItem);
            } else {
                // 若没有，则直接存储当前的新增item
                localStorage[`${topic}&&${keyword}`] = JSON.stringify(item);
            }
        }
        localStorage.setItem('topic', topic);
        localStorage.setItem('content', JSON.stringify(content));
        localStorage.setItem('start', start);
    }

    onChangeTopic(topic) {
        this.onGetData(topic);
    }

    componentDidUpdate() {
        // document.querySelector('#root').scrollIntoView(true);//为ture返回顶部，false为底部
        // if(localStorage.top){
        //     document.documentElement.scrollTop = parseInt(localStorage.top);
        //     console.log( 'have top');
        //     localStorage.removeItem('top');
        // }else{
        //     this.app.scrollIntoView(true);

        // }
        // console.log( 'body');

        // document.body.scrollTop = 600;
    }

    onInputBlur(keyword) {
        this.setState({ keyword });
        console.log(keyword);
        localStorage.setItem('keyword', keyword);
    }

    render() {

        // console.log( window.screen.height );

        return (
            <div ref={app => this.app = app} className="app" >
                <Search
                    onInputBlur={this.onInputBlur.bind(this)}
                    placeholder={this.state.placeholder[this.state.topic]}
                    onGetData={this.onGetData.bind(this)}
                />
                <TopicList
                    onChangeTopic={this.onChangeTopic.bind(this)}
                    topicList={this.state.topicList}
                    curTopic={this.state.topic}

                />
                <ContentList
                    content={this.state.content}
                    topic={this.state.topic}
                    onRefresh={this.onGetData.bind(this)}

                />

                <div className="refresh" >正在刷新...</div>
                <div className="loadmore" >加载更多...</div>
            </div>
        );
    }
}
module.exports = App;

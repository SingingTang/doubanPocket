import React, { Component } from 'react';
import './style.css';
import Search from './search';
import TopicList from './topicList';
import fetchJsonp from 'fetch-jsonp';
import ContentList from './contentList';

class Main extends Component {

    constructor(props){
        super(props);
        this.state = {
            topic: 'book',
            keyword: '',
            content: '',
            url: 'https://api.douban.com/v2/',
            topicList: [
                {book: '图书'},
                {movie: '电影'},
                {music: '音乐'}
            ],
            placeholder: {
                book: '书名、作者、ISBN',
                movie: '电影、影人、影院、电视剧',
                music: '唱片名、表演者、条码、ISRC'
            }
        }
        localStorage.clear();
    }


    // 判断是否有本地缓存，如果有，返回true，直接修改state，如果没有，返回false
    ifLocalStorage(topic, keyword){
        var content = localStorage.getItem(`${topic}&&${keyword}`);
        if(content){
            // 转换格式对象格式 
            content = JSON.parse(content);
            if(+new Date() - content.createdTime < 10*60*1000){
                this.setState({topic, keyword, content:content.content});
                return true;
            }

        }
        return false;

    }

    onGetData(topic,keyword){

        var keyword = keyword || this.state.keyword;
        var topic = topic || this.state.topic || 'book';
        let url;
        
        if(!keyword && topic === 'movie'){
            keyword = "top250";
            url = `${this.state.url}${topic}/top250`;
        }else{
            keyword = keyword ||'a';
            url = `${this.state.url}${topic}/search?q=${keyword}`;
        }
        
        // 如果有缓存，则不请求数据
       if(this.ifLocalStorage(topic, keyword)){
           return;
       }

        let content = '';
        let self = this;
        // 使用jsonp请求数据
        fetchJsonp(url)
            .then(function(response) {
                return response.json()
            }).then(function(json) {
                // 提取出想要的数据
                content = self.filterData(topic, json);
                self.saveData(topic, keyword, content);
            }).catch(function(ex) {
                console.log('parsing failed', ex)
            })
    }

  
    filterData(topic,json){
        var type = topic==='movie'?'subjects':topic+'s';
        let contents = json[type];

        return contents.map(content=>{
                var title = content.title;
                var author = content.author || content.casts.map(casts=> casts.name);
                var rating = content.rating.average;
                var tags =  content.genres || content.tags.map(tag=>tag.name) ;
                var image = content.image || content.images.small;
                var data = {title, author, rating, tags, image};
        
                if(topic === 'movie'){
                    data.directors =  content.directors.map(dir=>{
                        return dir.name;
                    })
                    data.avatars = content.casts.map(cats=>cats.avatars && cats.avatars.small
                        );
                    data.pubdate = content.year;
                }else if(topic === 'book'){
                    data.price = content.price;
                    data.catalog = content.catalog;
                    data.summary = content.summary;
                    data.pubdate = content.pubdate;
                }else if(topic === 'music'){
                    data.author = content.attrs.singer;
                    data.publiser = content.attrs.publisher;
                    data.pubdate = content.attrs.pubdate;
                }

                return data;
            })

        
    }

    saveData(topic, keyword, content){
        this.setState({topic, keyword, content});
        localStorage.setItem(`${topic}&&${keyword}`,JSON.stringify({content, createdTime: +new Date()}));     
    }

    onChangeTopic(topic){
        this.onGetData(topic);
    }

    render() {
        return (
	        <div className="app">
                <Search placeholder={this.state.placeholder[this.state.topic]} onGetData={this.onGetData.bind(this)}/>
                <TopicList onChangeTopic={this.onChangeTopic.bind(this)} topicList={this.state.topicList} />
                <ContentList content={this.state.content} topic={this.state.topic}/>
	        </div>
        );
    }
}
module.exports = App;

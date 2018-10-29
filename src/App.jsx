import React, { Component } from 'react';
import './style.css';
import Search from './search';
import TopicList from './topicList';
import fetchJsonp from 'fetch-jsonp';
import ContentList from './contentList';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            topic: 'book',
            content: '',
            url: 'https://api.douban.com/v2/'
        }
    }

    onGetData(keyword){
        let domain = this.parseUrl(keyword);
        console.log(domain);
        let result = '';
        let self = this;
        fetchJsonp(domain)
            .then(function(response) {
                console.log('first');
                // console.log(response.json());
                return response.json()
            }).then(function(json) {
                // console.log(json);
                let type = self.state.topic==='movie'?'subjects':self.state.topic+'s';
                let content = json[type];
                self.setState({content});
                // console.log(result)
            }).catch(function(ex) {
                console.log('parsing failed', ex)
            })
    }

    parseUrl(keyword){
        console.log(this.state.url);
        return `${this.state.url}${this.state.topic}/search?q=${keyword}`
    }

    onChangeTopic(topic){
        this.setState({topic});
    }

    componentWillMount(){

    }

    render() {
        let topicList = ['book', 'movie', 'music'];
        return (
	        <div className="app">
                <Search onGetData={this.onGetData.bind(this)}/>
                <TopicList onChangeTopic={this.onChangeTopic.bind(this)} topicList={topicList} />
                <ContentList content={this.state.content} topic={this.state.topic}/>
	        </div>
        );
    }
}
module.exports = App;

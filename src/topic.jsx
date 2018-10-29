import React from 'react';

export default class Topic extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            topics: {
                book: '图书',
                movie: '电影',
                music: '音乐'
            }
        }
    }

    handleChangeTopic(){
        this.props.onChangeTopic && this.props.onChangeTopic(this.props.topic)
    }

    render(){
        return <li onClick={this.handleChangeTopic.bind(this)} className="topic">{this.state.topics[this.props.topic]}</li>
    }
}
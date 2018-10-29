import React from 'react';
import Topic from './topic';

export default class TopicList extends React.Component{

    handleChangeTopic(topic){
        this.props.onChangeTopic && this.props.onChangeTopic(topic);
    }

    render(){
        return (<ul className="topic-list">
            {this.props.topicList.map((topic, index)=>{
                return <Topic topic={topic} key={index} onChangeTopic={this.handleChangeTopic.bind(this)} />
            })}
        </ul>)
    }
}
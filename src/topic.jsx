import React from 'react';
require ('./font/iconfont.js');
import util from './util';

export default class Topic extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            topic: '',
            topicShow: '',
            icon: ''
        }
       
    }

    // componentWillMount(){
    //     var topic = '';
    //     var topicShow = '';
    //     var icon = '';
    //     var key;
        
    //     for(key in this.props.topic){
    //         topic += key;
    //         topicShow += this.props.topic[key];
    //         var topicIndex = topic === this.props.curTopic?1:0;
            
    //         icon += util.topicIcon[topic][topicIndex];
            
    //     }
    //     this.setState({topic, topicShow, icon});
    // }

    static getDerivedStateFromProps(nextProps, prevState){

        var topic = '';
        var topicShow = '';
        var icon = '';
        var key;
        
        for(key in nextProps.topic){
            topic += key;
            topicShow += nextProps.topic[key];
            var topicIndex = topic === nextProps.curTopic?1:0;
            
            icon += util.topicIcon[topic][topicIndex];
            
        }

        return {topic, topicShow, icon};
        
    }


    handleChangeTopic(){
        this.setState({
            icon: util.topicIcon[this.state.topic][1]
        })
        this.props.onChangeTopic && this.props.onChangeTopic(this.state.topic)
    }

    render(){
        return (<li onClick={this.handleChangeTopic.bind(this)} className="topic">
            <svg className="icon" aria-hidden="true">
                <use xlinkHref={this.state.icon}></use>
            </svg>
        {this.state.topicShow}</li>)
    } 
}
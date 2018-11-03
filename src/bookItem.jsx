import React from 'react';
import {HashRouter, Route, Link,Switch } from 'react-router-dom';

export default class BookItem extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            content: {}
        }
    }


    static getDerivedStateFromProps(nextProps, prevState){
        return {content: nextProps.content}
    }



    render(){
        
        return (<div className="book item">
        <Link to={"detail/"+this.props.index} >
            <img className="item-image" src={this.state.content.image} />
            <p className="item-title">名称: {this.state.content.title}</p>
            <p className="item-tag"> {this.state.content.tags.map((tag, index)=>{
                if(tag.length > 4){
                    return null;
                }
                return <span key={index} index={index}>{tag}</span>
            })} </p>
            <p className="item-author">作者：{this.state.content.author}</p>
            <p className="item-rating">评分：{this.state.content.rating}</p>
            <p className="item-pubdate">时间：{this.state.content.pubdate}</p>
        </Link>

            
        </div>)
    }
}
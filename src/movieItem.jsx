import React from 'react';
import {Link } from 'react-router-dom';

export default class MovieList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            content: {}
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){

        return {content: nextProps.content};
        
    }


    render(){
        return (<div className="movie item">
        <Link to={"detail/"+this.props.index} replace>
        <img className="item-image" src={this.state.content.image} />
        <p className="item-title">名称: {this.state.content.title}-{this.state.content.pubdate}</p>
        <p className="item-tag"> {this.state.content.tags.map((tag, index)=>{
                return <span key={index}>{tag}</span>
            })} </p>
        <p className="item-author">{this.state.content.author.join(' ')}</p>
        <p className="item-rating">评分：{this.state.content.rating}</p>
        </Link>
    </div>)
    }
}
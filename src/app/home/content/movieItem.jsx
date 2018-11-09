import React from 'react';
import {Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class MovieItem extends React.Component{

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
        var content = this.state.content;

        return (<div className="movie item">
        <Link to={"detail/"+this.props.index} replace>
        <img className="item-image" src={content.image} />
        <p className="item-title">名称: {content.title}-{content.pubdate}</p>
        <p className="item-tag"> {content.tags.map((tag, index)=>{
                return <span key={index}>{tag}</span>
            })} </p>
        <p className="item-author">{content.author.join(' ')}</p>
        <p className="item-rating">评分：{content.rating}</p>
        </Link>
    </div>)
    }
}

MovieItem.propTypes = {
    content: PropTypes.object,
    index: PropTypes.number
}

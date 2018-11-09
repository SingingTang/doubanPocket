import React from 'react';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class BookItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: {}
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return { content: nextProps.content }
    }



    render() {

        var content = this.state.content;


        return (<div className="book item">
            <Link to={"detail/" + this.props.index} >
                <img className="item-image" src={content.image} />
                <p className="item-title" >名称: {content.title}</p>
                <p className="item-tag"> {content.tags.map((tag, index) => {
                    if (tag.length > 4) {
                        return null;
                    }
                    return <span key={index} index={index}>{tag}</span>
                })} </p>
                <p className="item-author">作者：{content.author}</p>
                <p className="item-rating">评分：{content.rating}</p>
                <p className="item-pubdate">时间：{content.pubdate}</p>
            </Link>
        </div>)
    }
}
BookItem.propTypes = {
    content: PropTypes.object,
    index: PropTypes.number
}



import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class MusicItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: {}
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        return { content: nextProps.content };

    }

    render() {

        var content = this.state.content;
        return (
            <div className="music item">
                <Link to={"detail/" + this.props.index} replace>
                    <img className="item-image" src={content.image} />
                    <p className="item-title">名称: {content.title}</p>
                    <p className="item-author">作者：{content.author}</p>
                    <p className="item-rating">评分：{content.rating}</p>
                </Link>
            </div>
        )
    }
}

MusicItem.propTypes = {
    content: PropTypes.object,
    index: PropTypes.number
}

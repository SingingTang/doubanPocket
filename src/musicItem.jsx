import React from 'react';
import {Link} from 'react-router-dom';

export default class MusicList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: {}
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        return {content: nextProps.content};

    }

    render() {

        return (
            <div className="music item">
                <Link to={"detail/" + this.props.index} replace>
                    <img className="item-image" src={this.state.content.image}/>
                    <p className="item-title">名称: {this.state.content.title}</p>
                    <p className="item-author">作者：{this
                            .state
                            .content
                            .author
                            .join(' ')}</p>
                    <p className="item-rating">评分：{this.state.content.rating}</p>
                </Link>
            </div>
        )
    }
}
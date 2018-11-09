import React from 'react';
import PropTypes from 'prop-types'

export default class DetailMovie extends React.Component{
    render(){

        var content = this.props.content;
        
        return (<div className="detail-item detail-movie">
            <div className="poster-container">
                <img src={content.image} />
            </div>
            <div className="movie item">
                <h2>简介</h2>
                <p className="item-title">名称：{content.title}
                <span className="item-tag"> {content.tags.map((tag, index)=>{
                    return <span key={index}>{tag}</span>
                })} </span>
                </p>
                <p className="item-pubdate">上映时间：{content.pubdate}</p>
                <p className="item-directors">导演: {content.directors.join('  ')}</p>
                <p className="item-original-title">{content.title}({content.originalTitle})</p>
                <h2>演员</h2>
                <div className="item-avatars">
                    {content.avatars.map((avatar,index)=>{return <img src={avatar} key={index} />})}
                </div>
            </div>
        </div>)
    }
}

DetailMovie.propTypes = {
    content: PropTypes.object
}
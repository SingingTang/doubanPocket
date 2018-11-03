import React from 'react';

export default class MusicBook extends React.Component{
    render(){

        var content = this.props.content;
        console.log(content);
        
        return  (<div className="detail-item detail-music">
        <div className="music item">
    
            <img className="item-image" src={content.image} />
            <p className="item-title">名称: {content.title}
                <span className="item-tag"> {content.tags.map((tag, index)=>{
                    return <span key={index} index={index}>{tag}</span>
                })} </span>   
            </p>
            
            <p className="item-author">作者：{content.author}</p>
            <p className="item-publisher">发布商：{content.publisher.join(' ')}</p>
            <p className="item-pubdate">发布时间：{content.pubdate}</p>
            <p className="item-rating">评分：{content.rating}</p>
        </div>
        <div>
            <h2>简介</h2>
            <h2>内容</h2>
            <p>{content.title}</p>
        </div>
    </div>)
    }
}
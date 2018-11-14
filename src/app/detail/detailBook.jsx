import React from 'react'
import PropTypes from 'prop-types'

export default class DetailBook extends React.Component {
    render() {
        var content = this.props.content


        return (
            <div className="detail-item detail-book">
                <div className="book item">

                    <img className="item-image" src={content.image} />
                    <p className="item-title">名称: {content.title}</p>

                    <p className="item-author">作者：{content.author}</p>
                    <p className="item-publisher">出版社：{content.publisher}</p>
                    <p className="item-pubdate">日期：{content.pubdate}</p>
                    <p className="item-rating">评分：{content.rating}</p>
                    <p className="item-price">价钱:{content.price}</p>
                    <p className="item-tag"> {content.tags.map((tag, index) => {
                        if (tag.length > 4) {
                            return null;
                        }
                        return <span key={index} index={index}>{tag}</span>
                    })} </p>
                </div>
                <div>
                    <h2>序言</h2>
                    <p>{content.catalog.slice(0, 250)}...</p>
                    <h2>简介</h2>
                    <p>{content.summary.slice(0, 250)}...</p>
                </div>
            </div>)
    }
}

DetailBook.propTypes = {
    content: PropTypes.object
}

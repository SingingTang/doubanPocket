import React from 'react';
import BookItem from './bookItem';
import MovieItem from './movieItem';
import MusicItem from './musicItem';
import PropTypes from 'prop-types';

export default class ContentList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Item: '',
            top: 0,
            bottom: 0
        }
        this.touchStart = '';
        this.touchMove = '';
        this.refresh = '';
        this.driection = '';
        this.isRefreshed = '';

    }


    // 当参数发生变化时，根据参数topic决定要展现的组件
    static getDerivedStateFromProps(nextProps, prevState) {
        let Item = '';
        switch (nextProps.topic) {
            case 'book':
                Item = BookItem;
                break;
            case 'movie':
                Item = MovieItem;
                break;
            case 'music':
                Item = MusicItem;
                break;
        }
        return { Item };
    }

    onTouchStart(event) {
        // 获取第一个位置
        var touch = event.targetTouches[0];
        // 只要页面处于第一屏的时候下拉即可刷新
        // 或者在滚动到底部的时候可以加载更多
        if (document.documentElement.scrollTop === 0){
            this.driection = 'down';
            console.log( '第一屏');
            this.touchStart = touch;
            this.touchMove = touch;
            this.refresh = true;
            this.isRefreshed = false;
        } else if (document.documentElement.scrollTop + window.innerHeight === document.body.scrollHeight){
            console.log('最后一屏')
            this.driection = 'up';
            this.touchStart = touch;
            this.touchMove = touch;
            this.refresh = true;
            this.isRefresh = false;
        } else {
            // 更新标志为false
            this.refresh = false;
        }
    }

    onTouchMove(event) {
        // 更新标志为true，继续
        if (!this.refresh) {
            return;
        }
        var touch = event.targetTouches[0];
        // 如果是在顶部触发
        if (this.driection === 'down') {
            // 必须是下拉，则下一个Y坐标要比上一个Y坐标大，否则不触发更新，返回
            // if (touch.pageY < this.touchMove.pageY) {
            //     this.refresh = false;
            //     return;
            // }
            this.refresh = true;
            var top = this.state.top + (touch.pageY - this.touchMove.pageY);
            // 当下拉高度超过130时，显示正在更新，并触发刷新
            if (top > 130 ) {
                if (!this.isRefresh){
                    // 获取当前搜索框中的关键词
                    var keyword = document.querySelector('.search-input').value;
                    var start = parseInt(localStorage.start);
                    // 刷新
                    this.props.onRefresh('', keyword, 0, true);
                    this.isRefresh = true;
                }
                var refresh = document.querySelector('.refresh');
                refresh.style.display = 'block'
                refresh.style.animation = 'refreshFontAnimation 1s alternate infinite';
               
            }
            this.setState({ top });
            this.touchMove = touch;

        }
        else if (this.driection === 'up') {
            // 若是在底部上拉，则下一上Y坐标要比上一个Y坐标小，否则不加载，返回
            // if (touch.pageY > this.touchMove.pageY) {
            //     // this.refresh = false;
            //     return;
            // }
            this.refresh = true;
            var bottom = this.state.bottom + (this.touchMove.pageY - touch.pageY);
            // 当上拉高度超过130时，显示加载更多
            if (bottom > 130 ) {
                if (!this.isRefresh) {
                    // 获取当前浏览器存储的关键词
                    var keyword = localStorage.keyword;
                    // 获取当前浏览器存储的搜索条目
                    var start = parseInt(localStorage.start);
                    // 加载更多
                    this.props.onRefresh('', keyword, start + 1, true);
                    this.isRefresh = true;
                }
                var loadmore = document.querySelector('.loadmore');
                loadmore.style.display = 'block';
                loadmore.style.animation = 'refreshFontAnimation 1s alternate infinite';

            }
            this.setState({ bottom });
            this.touchMove = touch;
        }

    }

    onTouchEnd(event) {


        if (!this.refresh) {
            return;
        }

        var timer = '';

        if (this.driection === 'down') {
            var top = this.state.top;

            if (top > 0) {
                timer = setInterval(() => {
                    top = top > 2 ? top - 2 : 0;
                    this.setState({ top });
                    top || clearInterval(timer);
                    if (top < 130) {
                        var refresh = document.querySelector('.refresh');
                        refresh.style.display = 'none'
                        refresh.style.animation = 'none';
                    }
                }, 1);
            }
        } else if (this.driection === 'up') {
            var bottom = this.state.bottom;
            if (bottom > 0) {
                var isHide = false;
                timer = setInterval(() => {
                    bottom = bottom > 10 ? bottom - 10 : 0;
                    this.setState({ bottom });
                    bottom || clearInterval(timer);
                    if (bottom < 130 && !isHide) {
                        var loadmore = document.querySelector('.loadmore');
                        loadmore.style.display = 'none';
                        loadmore.style.animation = 'none';
                        isHide = true;
                    }
                }, 1)
            }
        }


    }

    onClick(event) {
        console.log('click');
        // localStorage.setItem('curContent', this.props.content);
        localStorage.setItem('top', this.getScrollTop());
    }

    getScrollTop() {
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
            // localStorage.setItem('top', scrollTop);
            console.log('ele');
        }
        else if (document.body) {
            console.log('body ');
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    }

    render() {

        let contents = [...this.props.content].map((content, index) => {
            return (
                <this.state.Item
                    content={content}
                    index={index}
                    key={index}

                />)
        })

        return (
            <div
                className="content-container"
                style={{ top: this.state.top + 'px', marginBottom: this.state.bottom + 'px' }}
                onTouchStart={this.onTouchStart.bind(this)}
                onTouchMove={this.onTouchMove.bind(this)}
                onTouchEnd={this.onTouchEnd.bind(this)}
                ref={container => this.container = container}
                onClick={this.onClick.bind(this)}
            >

                {contents}
            </div>
        )

    }
}

ContentList.propTypes = {
    content: PropTypes.array,
    topic: PropTypes.string,
    onRefresh: PropTypes.func
}
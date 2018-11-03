import React from 'react';
import BookItem from './bookItem';
import MovieItem from './movieItem';
import MusicItem from './musicItem';

export default class BookList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Item: '',
            top: 0,
            bottom: 0
        }
        this.touchStart = '';
        this.refresh = '';
        this.driection = '';
        this.isRefresh = '';

    }


    static getDerivedStateFromProps(nextProps, prevState) {
        let Item = nextProps.topic === 'book' ? BookItem : nextProps.topic === 'movie' ? MovieItem : MusicItem;
        return { Item };
    }

    onTouchStart(event) {
        var touch = event.targetTouches[0];
        // 把元素放在手指所在的位置
        this.touchStart = touch;
        // 如果页面顶部下拉或者在页面底部上拉，可触发事件
        if (touch.pageY < 250 && touch.pageY > 100) {
            this.refresh = true;
            this.driection = 'down';
            this.isRefresh = false;
        } else if (touch.pageY < document.body.offsetHeight - 100 && touch.pageY > document.body.offsetHeight - 250) {
            this.refresh = true;
            this.driection = 'up';
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
            if (touch.pageY < this.touchStart.pageY) {
                this.refresh = false;
                return;
            }
            this.refresh = true;
            var top = this.state.top + (touch.pageY - this.touchStart.pageY);
            console.log(top);
            // 当下拉高度超过130时，显示正在更新，并触发刷新
            if (top > 130 && !this.isRefresh) {
                var refresh = document.querySelector('.refresh');
                refresh.style.display = 'block'
                refresh.style.animation = 'refreshFontAnimation 1s alternate infinite';
                console.log('onrefresh');
                // 获取当前搜索框中的关键词
                var keyword = document.querySelector('.search-input').value;
                var start = parseInt(localStorage.start);
                // 刷新
                this.props.onRefresh('', keyword, 0, true);

                this.isRefresh = true;
            }
            this.setState({ top });
            this.touchStart = touch;

        }
        else if (this.driection === 'up') {
            // 若是在底部上拉，则下一上Y坐标要比上一个Y坐标小，否则不加载，返回
            if (touch.pageY > this.touchStart.pageY) {
                console.log( touch.pageY + '   ' +  this.touchStart.pageY )
                this.refresh = false;
                return;
            }
            this.refresh = true;



            var bottom = this.state.bottom + (this.touchStart.pageY - touch.pageY);
            console.log(bottom);
            // 当上拉高度超过130时，显示加载更多
            if (bottom > 130 && !this.isRefresh) {
                var loadmore = document.querySelector('.loadmore');
                loadmore.style.display = 'block';
                loadmore.style.animation = 'refreshFontAnimation 1s alternate infinite';
                // 获取当前浏览器存储的关键词
                var keyword = localStorage.keyword;
                // 获取当前浏览器存储的搜索条目
                var start = parseInt(localStorage.start);
                // 加载更多
                this.props.onRefresh('', keyword, start + 1, true);
                console.log('加载更多')
                this.isRefresh = true;
            }
            this.setState({ bottom });
            this.touchStart = touch;
        }

    }

    onTouchEnd(event) {

        var loadmore = document.querySelector('.loadmore');
            loadmore.style.display = 'none';
            loadmore.style.animation = 'none';
            this.setState({ bottom: 0 });
        if (!this.refresh) {
            console.log(' no refresh');
            return;
        }
        console.log('end');

        var timer = '';

        if (this.driection === 'down') {
            var top = this.state.top;

            if (top > 0) {
                timer = setInterval(() => {
                    top = top > 5 ? top - 5 : 0;
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
            console.log( 'end up ');
            var bottom = this.state.bottom;
            
            
            // if (bottom > 0) {
            //     var isHide = false;
            //     timer = setInterval(() => {
            //         bottom = bottom > 10 ? bottom - 10 : 0;
            //         this.setState({ bottom });
            //         console.log(bottom);
            //         bottom || clearInterval(timer);
            //         if (bottom < 130 && !isHide) {
            //             var loadmore = document.querySelector('.loadmore');
            //             loadmore.style.display = 'none';
            //             loadmore.style.animation = 'none';
            //             isHide = true;
            //         }
            //     }, 1)
            // }
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
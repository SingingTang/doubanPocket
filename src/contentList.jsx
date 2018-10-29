import React from 'react';
import BookItem from './bookItem';
import MovieItem from './movieItem';
import MusicItem from './musicItem';

export default class BookList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            Item: ''
        }
    }

    componentWillMount(){
        let Item = this.props.topic==='book'?BookItem:this.props.topic==='movie'?MovieItem:MusicItem;
        this.setState({Item})
    }

    render(){

        console.log(this.props.content);

        return <div></div>

        return [...this.props.content].map((content, index)=>{
            return <this.state.Item content={content} key={index} />
        })
        
    }
}
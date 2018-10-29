import React from 'react';

export default class BookItem extends React.Component{
    render(){
        console.log(this.props.content);
        return <div className="book item"></div>
    }
}
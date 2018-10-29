import React from 'react';

export default class Search extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            keyword: ''
        }
    }

    handleSearch(){
        console.log(this.state.keyword);
        this.props.onGetData && this.props.onGetData(this.state.keyword);
    }

    handleInputKeyUp(event){
        let keyword = event.target.value;
        this.setState({keyword});
    }

    render(){
        return (<div className="search-container">
            <input type="text" className="search-input" placeholder="书名、作者、ISBN" value={this.state.keyword} onChange={this.handleInputKeyUp.bind(this)}/>
            <button className="search-button" onClick={this.handleSearch.bind(this)}>搜索</button>
        </div>)
    }
}
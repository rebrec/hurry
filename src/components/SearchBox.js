import React from 'react';


export default class SearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {searchedText: ""};
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({searchedText: e.target.value});
    }

    handleSubmit(event) {
        this.props.onSearchClick(this.state.searchedText);
        event.preventDefault();
    }
    render() {
        return (<form onSubmit={this.handleSubmit}>
            <label>Rechercher
            <input
                   value={this.state.searchedText}
                   placeholder="Enter Keyword (Computer, User, etc.)"
                   onChange={this.handleChange}/>
            </label>
            <input type="submit" value="Submit" />
        </form>);
    }

}


import React from "react";
import constants from "./constants";
import { Link } from "react-router-dom";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: ''
        }
        this.onChange = (address) => this.setState({ address });
    }
    
    render() {
        const inputProps = {
            value: this.state.address,
            onChange: this.onChange,
        }
        
        return(
            <form onSubmit={this.props.function}>
                <PlacesAutocomplete inputProps={inputProps} />
                <button className="btn">search</button>
            </form>
        );
    }
}
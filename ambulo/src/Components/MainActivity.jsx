import React from "react";
import constants from "./constants";
import { Link } from "react-router-dom";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import After from "../after.svg";
import Before from "../before.svg";
import Dialog from "./Dialog";
import Trail from "./Trail";

export default class MainActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            trailName: "dummy",
            address: '',
            lat: null,
            lng: null,
            faddress: undefined,
            loading: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSelect = this.handleSelect.bind(this)        
    }

    show(evt) {
        this.setState({
            show: true,
            trailName: evt.target.innerHTML
        });
     }

     handleChange(address) {
        this.setState({
          address: address
        })
    }

    handleSubmit(evt) {
        evt.preventDefault()
        geocodeByAddress(this.state.address)
        .then(results => getLatLng(results[0]))
        .then(latLng => console.log('Success', latLng))
        .catch(error => console.error('Error', error))

        this.setState({
            faddress: this.state.address,
            show: false
        });
    }

    handleSelect(address) {
        this.setState({
          address,
          show: false,
          loading:true
        })

        geocodeByAddress(address)
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          console.log('Success Yay', { lat, lng })
          this.setState({
            lat: lat,
            lng: lng,
            faddress: address,
            loading: false
          })
        })
        .catch((error) => {
          console.log('Oh no!', error)
          this.setState({
            loading: false
          })
        })
    }

    prev() {
        alert("prev");
    }

    next() {
        alert("next");
    }
    
    render() {
        let style = {
            border: "5px solid red",
            position: "absolute",
            margin: "auto",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0"
        }
        const AutocompleteItem = ({ formattedSuggestion }) => (
            <div className="Demo__suggestion-item">
              <i className='fa fa-map-marker Demo__suggestion-icon'/>
              <strong>{formattedSuggestion.mainText}</strong>{' '}
              <small className="text-muted">{formattedSuggestion.secondaryText}</small>
            </div>)

        const inputProps = {
            type: "text",
            value: this.state.address,
            onChange: this.handleChange,
            autoFocus: true,
            placeholder: "Search Places",
        }
        const myStyles = {
            input: { border: 'none' }
        }
        const cssClasses = {
            input: 'search-bar'
        }
        
        return(
            <div>
                {
                    this.state.faddress == undefined && !this.state.loading ?
                    <div className="content row d-flex justify-content-center" style={style}>
                        <div className="header col-md-6 col-10 align-self-center">
                            <h1 className="mb-4">AMBULO</h1>
                            <div className="search-box">
                                <form className="form-inline search-form" onSubmit={evt => this.handleSubmit(evt)}>
                                    <PlacesAutocomplete onEnterKeyDown={this.handleSelect} autocompleteItem={AutocompleteItem} onSelect={this.handleSelect} classNames={cssClasses} googleLogo={false} styles={myStyles} inputProps={inputProps} />
                                    <button className="btn search-btn"><i class="fa fa-search"></i></button>
                                </form>
                            </div>
                        </div>
                    </div> 
                    :
                    <div>
                        <div className="d-flex justify-content-end">
                            <button className="btn" onClick={() => {this.props.history.push("/login")}}>log in</button>
                            <button className="btn" onClick={() => {this.props.history.push("/signup")}}>sign up</button>
                        </div>
                        <div className="align-self-center">
                            <h1>AMBULO</h1>
                            <div className="search-box">
                                <form className="form-inline search-form" onSubmit={evt => this.handleSubmit(evt)}>
                                    <PlacesAutocomplete onEnterKeyDown={this.handleSelect} autocompleteItem={AutocompleteItem} onSelect={this.handleSelect} classNames={cssClasses} googleLogo={false} styles={myStyles} inputProps={inputProps} />
                                    <button className="btn search-btn"><i class="fa fa-search"></i></button>
                                </form>
                            </div>
                        </div>
                        <div>
                        <Dialog modal={this.state.show}
                                trailName={this.state.trailName}/>
                        <div className="d-flex flex-column">
                            {this.state.faddress == "" ?
                                <h3>default(?)</h3>
                                :
                                <div>
                                    <h2>{this.state.address}</h2>
                                        <Trail/>
                                </div>
                            }

                        </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}
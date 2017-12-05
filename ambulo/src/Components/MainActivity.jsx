import React from "react";
import constants from "./constants";
import { Link } from "react-router-dom";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import After from "../after.svg";
import Before from "../before.svg";
import Dialog from "./Dialog";
import Trail from "./Trail";

import unirest from "unirest";

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
            error: '',
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
        console.log(this.state.faddress)
        console.log(this.state.error)
        geocodeByAddress(this.state.faddress)
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          console.log('Success Yay', { lat, lng })
          this.setState({
            lat: lat,
            lng: lng,
            faddress: this.state.address,
            loading: false,
            error: ""
          })
        })
        .catch((error) => {
          console.log('Oh no!', error)
          this.setState({
            faddress: undefined,
            error: "Enter Valid Address"
          })
        })
    }

    handleEnter(address) {
        geocodeByAddress(address)
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
            console.log('Success Yay', { lat, lng })
            this.setState({
                lat: lat,
                lng: lng,
                faddress: address,
                loading: false,
                error: ""
            })
        })
        .catch((error) => {
            console.log('Oh no!', error)
        })
    }

    handleSelect(address) {
        geocodeByAddress(address)
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          console.log('Success Yay', { lat, lng })
          this.setState({
            lat: lat,
            lng: lng,
            address: address,
            faddress: address,
            loading: false,
            error: ""
          })
        })
        .catch((error) => {
          console.log('Oh no!', error)
          this.setState({
            faddress: undefined,
            error: "Enter Valid Address"
          })
        })

        // console.log(this.state.address);
        var flickr = "https://api.flickr.com/services/rest/?method=flickr.photos.search";
        var flickr_key = "dbbe88f35f1cd428fcb2302f4bf1927e";


        geocodeByAddress(this.state.faddress)
        .then(results => getLatLng(results[0]))
        .then(latLng => {
            // console.log(latLng.lat);
            // console.log(latLng.lng);
            unirest.get("https://trailapi-trailapi.p.mashape.com/?lat=" + latLng.lat + "&lon=" + latLng.lng)
            .headers({'X-Mashape-Key' : 'hsP83XHk7umshDDsGOjuYJhfAESEp1vqarjjsnh1m2hxpTGbhC'})
            .end(function (response) {
                var places = [];
                // places.push("hello");
                // console.log(places);
                // console.log(places.length);
                response.body.places.forEach(function(element) {
                    // console.log(element.name + " " + element.city + " " + element.state + " " + element.lat + " " + element.lon);
                    var object = {
                        name: element.name,
                        city: element.city,
                        state: element.state,
                        lat: element.lat,
                        lon: element.lon
                    };
                    var tags = element.name.replace(/ /g, "+");
                    fetch(flickr + "&api_key=" + flickr_key + "&tags=" + tags + "&lat=" + element.lat + "&lon=" + element.lon
                            + "&sort=relevance&format=json&nojsoncallback=1")
                    .then(response => {
                        return response.json()
                    })
                    .then(data => {
                        object.photos = data.photos.photo;
                        // console.log(object);
                        places.push(object);
                        console.log(places)
                    })
                    .catch(error => console.error('Error', error));
                });
                
                places.sort(function (a, b) {
                    return a.photos.length - b.photos.length
                })

                
                console.log(places[0]);
            });
        })
        .catch(error => console.error('Error', error));
    }
        

    prev() {
        alert("prev");
    }

    next() {
        alert("next");
    }
    
    render() {
        let style = {
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
            input: { border: 'none' },
            autocompleteContainer: { zIndex: '9999' }
        }
        const cssClasses = {
            input: 'search-bar'
        }

        const options = {
            types: ['(cities)'],
            componentRestrictions: {
                country: "us"
            }
        }
        
        return(
            <div>
                <div className="p-4 d-flex justify-content-end">
                    <button disabled className="mr-auto p-2 btn logo" onClick={() => {this.props.history.push("/")}}><i className="fa fa-leaf green fa-3x" aria-hidden="true"></i></button>
                    <button className="btn log" onClick={() => {this.props.history.push("/login")}}>log in</button>
                    <button className="btn log" onClick={() => {this.props.history.push("/signup")}}>sign up</button>
                </div>
                {
                    this.state.faddress === undefined || this.state.error == "Enter Valid Address"  ?
                    <div>
                        <div className="content row d-flex justify-content-center" style={style}>
                            <div className="header col-xl-7 col-11 align-self-center">
                                <h1 className="mt-0 text-left green mb-0">Ambulo</h1>
                                <p className="sub text-left mb-5">Discover trails and capture natural scenery.</p>
                                <div className="search-box">
                                    <form className="form-inline search-form" onSubmit={evt => this.handleSubmit(evt)}>
                                        <PlacesAutocomplete options={options} onEnterKeyDown={this.handleEnter} autocompleteItem={AutocompleteItem} onSelect={this.handleSelect} classNames={cssClasses} googleLogo={false} styles={myStyles} inputProps={inputProps} />
                                        <button className="btn search-btn"><i class="fa fa-search"></i></button>
                                    </form>
                                </div>
                            </div>
                        </div> 
                    </div>
                    :
                    <div>
                        <div className="align-self-center mb-5">
                            <h1 className="green mb-3">Ambulo</h1>
                            <div className="row">
                                <div className="m-auto col-sm-5 col-md-4 col-xl-2 col-11 search-box">
                                    <PlacesAutocomplete options={options} onEnterKeyDown={this.handleEnter} autocompleteItem={AutocompleteItem} onSelect={this.handleSelect} classNames={cssClasses} googleLogo={false} styles={myStyles} inputProps={inputProps} />
                                </div>
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
                                    <h2>{this.state.faddress}</h2>
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
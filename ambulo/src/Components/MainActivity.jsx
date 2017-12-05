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

        // console.log(this.state.address);
        var flickr = "https://api.flickr.com/services/rest/?method=flickr.photos.search";
        var flickr_key = "dbbe88f35f1cd428fcb2302f4bf1927e";


        geocodeByAddress(this.state.address)
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
<<<<<<< HEAD
                        object.photos = data.photos.photo;
                        // console.log(object);
                        places.push(object);

=======
                        console.log(data.photos.photo)
>>>>>>> d874d78a778d5624f7ac3c9ca7d898c05ead5bf3
                    })
                    .catch(error => console.error('Error', error));
                });
                
                places.sort(function (a, b) {
                    return a.photos.length - b.photos.length
                })
                
                console.log(places);
                
                // console.log(places[0]);
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
                {
                    this.state.faddress == undefined && !this.state.loading ?
                    <div className="content row d-flex justify-content-center" style={style}>
                        <div className="header col-md-8 col-xl-6 col-10 align-self-center">
                            <h1 className="mb-4 display-1">AMBULO</h1>
                            <div className="search-box">
                                <form className="form-inline search-form" onSubmit={evt => this.handleSubmit(evt)}>
                                    <PlacesAutocomplete options={options} onEnterKeyDown={this.handleSelect} autocompleteItem={AutocompleteItem} onSelect={this.handleSelect} classNames={cssClasses} googleLogo={false} styles={myStyles} inputProps={inputProps} />
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
                            <h1 className="display-1">AMBULO</h1>
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
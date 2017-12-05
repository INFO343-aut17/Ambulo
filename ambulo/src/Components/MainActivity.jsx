import React from "react";
import constants from "./constants";
import config from "./config";  // Holds our api keys
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
            photos2DArr: []
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

        geocodeByAddress(this.state.address)
        .then(results => getLatLng(results[0]))
        .then(latLng => {
            // Send a request to trailapi to get a list of trails at this specific location.
            // Return a promise and on success, resolve with the response body (places arr)
            return new Promise((resolve, reject) => {
                unirest.get("https://trailapi-trailapi.p.mashape.com/?lat=" + latLng.lat + "&lon=" + latLng.lng)
                   .header('X-Mashape-Key', config.api_keys.trailapi_key,)
                   .header("Accept", "text/json")
                   .end((response) => {
                        if (response) {
                            resolve(response.body.places);
                        } else {
                            reject(response);
                        }
                   })
                })
        })
        // Successfully got the array of places from the trails api request, set the state of the program to have
        // all the trails.
        .then((placesArr) => {
            let photos2DArrTemp = [];
            placesArr.forEach(function(place) {
                let placeObj = {
                    name: place.name,
                    city: place.city,
                    state: place.state,
                    lat: place.lat,
                    lon: place.lon
                };

                // Send a request to flickr for photos matching a trail.
                let flickr = "https://api.flickr.com/services/rest/?method=flickr.photos.search";
                let tags = placeObj.name.replace(/ /g, "+");
                fetch(flickr + "&api_key=" + config.api_keys.flickr_key + "&tags=" + tags + "&lat=" + placeObj.lat + "&lon=" + placeObj.lon
                    + "&sort=relevance&format=json&nojsoncallback=1")
                    .then(response => {
                        return response.json()
                    }).then((photosObj) =>{
                        // Iterate through photosArr and append the photosURL;
                        let photosURL = [];
                        let photosArr = photosObj.photos.photo;

                        photosArr.forEach((photo) => {
                            // Generate a url using the parsed information for json.
                            let photoID = photo.id;
                            let farmID = photo.farm;
                            let secretID = photo.secret;
                            let serverID = photo.server;
                            let url = `https://farm${farmID}.staticflickr.com/${serverID}/${photoID}_${secretID}.jpg`
                            photosURL.push(url);
                        });
                        // Push the array to our array of results.
                        photos2DArrTemp.push(photosURL);
                    })
                    .catch((err) => console.log(err));
            })

            // Now have an array of urls. Need to sort and remove empty arrays.
            console.log(photos2DArrTemp);

            // Change the state of 2D field.
            this.setState({
                photos2DArr: photos2DArrTemp
            })
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
                    this.state.faddress === undefined && !this.state.loading ?
                    <div>
                        <div className="content row d-flex justify-content-center" style={style}>
                            <div className="header col-xl-7 col-11 align-self-center">
                                <h1 className="mt-0 text-left green mb-0">Ambulo</h1>
                                <p className="sub text-left mb-5">Discover trails and capture natural scenery.</p>
                                <div className="search-box">
                                    <form className="form-inline search-form" onSubmit={evt => this.handleSubmit(evt)}>
                                        <PlacesAutocomplete options={options} onEnterKeyDown={this.handleSelect} autocompleteItem={AutocompleteItem} onSelect={this.handleSelect} classNames={cssClasses} googleLogo={false} styles={myStyles} inputProps={inputProps} />
                                        <button className="btn search-btn"><i className="fa fa-search"></i></button>
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
                                    <form className="form-inline search-form" onSubmit={evt => this.handleSubmit(evt)}>
                                    <PlacesAutocomplete options={options} onEnterKeyDown={this.handleSelect} autocompleteItem={AutocompleteItem} onSelect={this.handleSelect} classNames={cssClasses} googleLogo={false} styles={myStyles} inputProps={inputProps} />
                                        <button className="btn search-btn"><i className="fa fa-search"></i></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div>
                        <Dialog modal={this.state.show}
                                trailName={this.state.trailName}/>
                        <div className="d-flex flex-column">
                            {this.state.faddress === "" ?
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
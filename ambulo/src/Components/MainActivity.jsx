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

import firebase from "firebase/app";

export default class MainActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            address: '',
            faddress: undefined,
            error: '',
            loading: true,
            ref: [],
            logged: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
    }

    componentDidMount() {
        this.auth = firebase.auth().onAuthStateChanged(user => {
            this.setState({
                logged: user
            })
        })
    }

    componentWillUnmount() {
        this.auth();
    }

    handleSignOut() {
        firebase.auth().signOut()
        .catch(err => alert(err.message));
    }

    show(evt) {
        this.setState({
            show: true
        });
     }

     handleChange(address) {
        this.setState({
          address: address,
          show: false
        })
    }

    handleSelect(address) {
        console.log("selected")
        var flickr = "https://api.flickr.com/services/rest/?method=flickr.photos.search";


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

        var places = [];
        var promises = [];
        geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => {
            // Send a request to trailapi to get a list of trails at this specific location.
            // Return a promise and on success, resolve with the response body (places arr)
                unirest.get("https://trailapi-trailapi.p.mashape.com/?lat=" + latLng.lat + "&lon=" + latLng.lng)
                   .header('X-Mashape-Key', config.api_keys.trailapi_key,)
                   .header("Accept", "text/json")
                   .end(function (response) {
                    // console.log(response.body.places);
                    response.body.places.forEach(function(element) {
                        var object = {
                            name: element.name,
                            city: element.city,
                            state: element.state,
                            lat: element.lat,
                            lon: element.lon,
                            activities: element.activities
                        };
                        var tags = element.name.replace(/ /g, "+");
                        var promise = fetch(flickr + "&api_key=" + config.api_keys.flickr_key + "&tags=" + tags + "&lat=" + element.lat + "&lon=" + element.lon
                                + "&sort=interestingness-desc&format=json&nojsoncallback=1")
                        .then(response => {
                          return response.json()
                        })
                        .then(data => {
                            // console.log(data.photos.photo)
                            object.photos = data.photos.photo;
                            if(object.photos.length !== 0) {
                                places.push(object);
                                places.sort(function (a, b) {
                                    return b.photos.length - a.photos.length
                                })
                            }
                        })
                        .catch(error => console.error('Error', error));
                        promises.push(promise);
                    })
                });
                Promise.all(promises).then(
                    () => {
                        this.setState({
                            loading: true,
                            faddress: address,
                        })}, 2000
                    )
            })
            .then(
                setTimeout(
                    () => {
                        this.setState({
                            ref: []
                        })
                        places.forEach(function(element) {
                            this.state.ref.push(<Trail info={element}/>)
                        }, this)
                        this.setState({
                            loading: false
                        })
                    }, 2000
                )
            )
            .catch(error => console.error('Error', error));
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

        var overflow = {
            height: "500px",
            overflow: "scroll",
            paddingBottom: "50px"
        }

        return(
            <div>
                <div className="p-4 d-flex justify-content-end">
                    <button disabled className="mr-auto p-2 btn logo" onClick={() => {this.props.history.push("/")}}><i className="fa fa-leaf green fa-3x" aria-hidden="true"></i></button>

                    {this.state.logged ?
                        <div style={{zIndex: "9999"}}>
                            <div style={{display: "inline"}}>trail on, {firebase.auth().currentUser.displayName}</div>
                            <button className="btn log" onClick={() => {this.props.history.push("/about")}}>about</button>

                            <button className="btn log"  onClick={() => this.props.history.push("/favorites")}>favorites</button>
                            <button className="btn log" onClick={() => this.handleSignOut()}>log out</button>
                        </div>
                    :
                        <div style={{zIndex: "9999"}}>
                            <button className="btn log" onClick={() => {this.props.history.push("/about")}}>about</button>
                            <button className="btn log" onClick={() => {this.props.history.push("/login")}}>log in</button>
                            <button className="btn log" onClick={() => {this.props.history.push("/signup")}}>sign up</button>
                        </div>
                    }


                </div>
                {
                    this.state.faddress === undefined || this.state.error === "Enter Valid Address"  ?
                    <div>
                        <div className="content row d-flex justify-content-center" style={style}>
                            <div className="header col-xl-7 col-11 align-self-center">
                                <h1 className="mt-0 text-left green mb-0">Ambulo</h1>
                                <p className="sub text-left mb-5">Discover trails and capture natural scenery.</p>
                                <div className="search-box">
                                    <form className="form-inline search-form">
                                        <PlacesAutocomplete options={options} autocompleteItem={AutocompleteItem} onSelect={this.handleSelect} classNames={cssClasses} googleLogo={false} styles={myStyles} inputProps={inputProps} />
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
                                    <PlacesAutocomplete options={options} autocompleteItem={AutocompleteItem} onSelect={this.handleSelect} classNames={cssClasses} googleLogo={false} styles={myStyles} inputProps={inputProps} />
                                </div>
                            </div>
                        </div>
                        <div>
                        <div className="d-flex flex-column">
                            {this.state.faddress === "" ?
                                <h3>default(?)</h3>
                                :
                                <div style={overflow}>
                                    <h2>{this.state.faddress}</h2>
                                        {!this.state.loading ?
                                            <div>
                                                {this.state.ref.length == 0 ?
                                                    <div>no trails found</div>
                                                    :
                                                    this.state.ref
                                                }
                                            </div>

                                            :

                                            <div>loading</div>}
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

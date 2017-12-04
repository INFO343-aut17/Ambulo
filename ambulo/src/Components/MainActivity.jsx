import React from "react";
import constants from "./constants";
import { Link } from "react-router-dom";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import After from "../after.svg";
import Before from "../before.svg";
import Dialog from "./Dialog";
import Trail from "./Trail";

const TRAILS_API = "https://api.themoviedb.org/3/discover/movie?api_key=a1dd8a5a88583f8f8611af31ff17abba";

export default class MainActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            trailName: "dummy",
            address: '',
            faddress: undefined
        }
        this.onChange = (address) => this.setState({ address })
    }

    show(evt) {
        this.setState({
            show: true,
            trailName: evt.target.innerHTML
        });
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

        const inputProps = {
            value: this.state.address,
            onChange: this.onChange,
        }
        
        return(
            <div>
                {
                    this.state.faddress == undefined ?
                    <div className="d-flex justify-content-center" style={style}>
                        <div className="align-self-center">
                            <h1>AMBULO</h1>
                            <form onSubmit={evt => this.handleSubmit(evt)}>
                                <PlacesAutocomplete inputProps={inputProps} />
                                <button className="btn">search</button>
                            </form>
                        </div>
                    </div> 
                    :
                    <div>
                        <div className="d-flex justify-content-end">
                            <button className="btn" onClick={() => {this.props.history.push("/login")}}>log in</button>
                            <button className="btn" onClick={() => {this.props.history.push("/signup")}}>sign up</button>
                        </div>
                        <h1>AMBULO</h1>
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
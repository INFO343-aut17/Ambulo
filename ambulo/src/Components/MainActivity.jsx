import React from "react";
import constants from "./constants";
import { Link } from "react-router-dom";
import Search from "./search.jsx"

import Dialog from "./Dialog";


import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

export default class MainActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: undefined,
            show: false,
            trailName: "dummy",
            address: "x"
        }
    }

    show(evt) {
        this.setState({
            show: true,
            trailName: evt.target.innerHTML
        });
    }

    handleSubmit() {
        this.setState({
            query: this.refs.location.value,
            show: false
        });
    }

    handleSubmit2(evt) {
        evt.preventDefault()

        geocodeByAddress(this.state.address)
        .then(results => getLatLng(results[0]))
        .then(latLng => console.log('Success', latLng))
        .catch(error => console.error('Error', error))
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
        
        return(
            <div>
                {
                    this.state.query == undefined ?
                    <div className="d-flex justify-content-center" style={style}>
                        <div className="align-self-center">
                            <h1>AMBULO</h1>
                            <Search function={evt => {this.handleSubmit2(evt)}}/>
                            <p onClick={() => {this.setState({query: ""})}}>skip</p>
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
                            {this.state.query == "" ?
                                <h3>default(?)</h3>
                                :
                                <div>
                                    <h2>{this.state.query}</h2>
                                    <h3 className="btn" onClick={evt => this.show(evt)}>Trail Name</h3>
                                    <div className="row">
                                        <div className="col">1</div>
                                        <div className="col">2</div>
                                        <div className="col">3</div>
                                        <div className="col">4</div>
                                    </div>

                                    <h3 className="btn" onClick={evt => this.show(evt)}>Trail Name2</h3>
                                    <div className="row">
                                        <div className="col">1</div>
                                        <div className="col">2</div>
                                        <div className="col">3</div>
                                        <div className="col">4</div>
                                    </div>
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
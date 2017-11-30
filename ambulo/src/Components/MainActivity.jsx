import React from "react";
import constants from "./constants";
import { Link } from "react-router-dom";

import Dialog from "./Dialog";

export default class MainActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: undefined,
            show: false,
            trailName: "dummy"
        }
    }

    componentDidMount() {
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
                            <div>
                            <form onSubmit={() => this.handleSubmit()}>
                                <input type="text" placeholder="enter location" ref="location"/>
                                    <button className="btn">search</button>
                            </form>
                            </div>
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
                        <form onSubmit={() => this.handleSubmit()}>
                            <input type="text" placeholder="enter location" defaultValue={this.state.query} ref="location"/>
                                <button className="btn">search</button>
                        </form>
                        </div>
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
                }
            </div>

        );
    }
}
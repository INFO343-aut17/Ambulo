import React from "react";
import { Link, Redirect } from 'react-router-dom';
import constants from "./constants";
import firebase from "firebase/app";

export default class SignUpActivity extends React.Component {
    constructor(props) {
        super(props);

        // Default State
        this.state = {
            email: "",
            password: "",
            passwordVerify: "",
            displayName: "",
            authenticated: false
        }
    }

    // Handle the event when the user presses sign up. Try to create a user with given inputs.
    handleSubmit(evt) {
        evt.preventDefault();

        // Handle empty inputs or invalid inputs.
        if (this.state.email === "" || this.state.displayName === "" || this.state.password === ""
         || this.state.passwordVerify !== this.state.password) {
            alert ("Please enter all fields correctly");

        // Create this user with given state!
        } else {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                // On success, update the profile and set authenticated to true.
                .then((user) => {
                    // Update the user profile with this information
                    user.updateProfile({
                        displayName: this.state.displayName,
                    }).then(() => {
                        this.setState({authenticated: true});
                        this.props.history.push(constants.routes.home);
                    }).then(() => {
                      // add user to database for future Favorites
                      firebase.database().ref("users").push(user.uid);
                    })
                    .catch((err) => {
                        alert(err.message);
                    });
                })
                // Failure.
                .catch(err => {
                    alert(err.message);
                });
        }
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

        // Redirect if authenticated
        if (this.state.authenticated) {
            return <Redirect to={constants.routes.home}/>
        }

        return (
            <div>
                <div className="p-4 d-flex justify-content-end">
                    <button className="mr-auto p-2 btn logo" onClick={() => {this.props.history.push("/")}}><i className="fa fa-leaf green fa-3x" aria-hidden="true"></i></button>
                    <button className="btn log" onClick={() => {this.props.history.push("/login")}}>log in</button>
                    <button className="btn log" onClick={() => {this.props.history.push("/signup")}}>sign up</button>
                </div>
             <div className="d-flex justify-content-center" style={style}>
                    <div className="card align-self-center">
                        <div className="card-block p-5">
                            <h2>Sign Up</h2>
                            <form onSubmit={evt => this.handleSubmit(evt)}>
                                {/* Display Name */}
                                <div className="form-group">
                                    <input id="displayName" type="text" className="form-control" placeholder="enter a display name"
                                    value={this.state.displayName}
                                    onInput={evt => this.setState({displayName: evt.target.value})}
                                    />
                                </div>
                                    <input id="email" type="email" className="form-control" placeholder="enter your email"
                                    value={this.state.email}
                                    onInput={evt => this.setState({email: evt.target.value})}
                                    />
                                </div>

                                {/* Enter intial password */}
                                <div className="form-group">
                                    <input id="password" type="password" className="form-control" placeholder="enter a password"
                                    value={this.state.password}
                                    onInput={evt => this.setState({password: evt.target.value})}
                                    />
                                </div>

                                {/* Enter Password twice for match */}
                                <div className="form-group">
                                    <input id="passwordVerify" type="password" className="form-control" placeholder="enter password again"
                                    value={this.state.passwordVerify}
                                    onInput={evt => this.setState({passwordVerify: evt.target.value})}
                                    />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="w-100 btn btn-success">
                                        Sign Up!
                                    </button>
                                </div>
                            </form>

                            {/* Give the option to Sign into existing account. */}
                            <p>Already have an account? <Link to={constants.routes.logIn}>Sign in!</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

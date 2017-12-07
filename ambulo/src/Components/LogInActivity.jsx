import React from "react";
import { Link, Redirect} from "react-router-dom";
import constants from "./constants";
import firebase from "firebase/app";

export default class LogInActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            authenticated: firebase.auth().currentUser != null
        }
    }

    handleSubmit(evt) {
        evt.preventDefault();
        /**
         * TODO:
         * Add firebase to index.js,
         * then uncomment code here
         */

        if (!this.state.authenticated) {
             firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                 .then((user) => {
                     this.setState({
                         authenticated: true,
                     });
                     this.props.history.push(constants.routes.main);

                 })
                 .catch((err) => {
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

        // Redirect to home if user is not logged in.
        if (this.state.authenticated) {
            return <Redirect to={constants.routes.home}/>
        }

        return (
            <div>
                <div className="p-4 d-flex justify-content-end">
                <button className="mr-auto p-2 btn logo" onClick={() => {this.props.history.push("/")}}><i className="fa fa-leaf green fa-3x" aria-hidden="true"></i></button>
                    <button className="btn log" onClick={() => {this.props.history.push("/signup")}}>sign up</button>
                </div>
                <div className="cont d-flex justify-content-center" style={style}>
                    <div className="card align-self-center">
                        <div className="card-block p-5">
                            <h2 className="mt-0">Log In</h2>
                            <form onSubmit={evt => this.handleSubmit(evt)}>
                                {/* Email Input Field */}
                                <div className="form-group">
                                    <input id="email" type="email" className="form-control" placeholder="enter your email"
                                    value={this.state.email}
                                    onInput={evt => this.setState({email: evt.target.value})}
                                    />
                                </div>

                                {/* Password Input Field */}
                                <div className="form-group">
                                    <input id="password" type="password" className="form-control" placeholder="enter a password"
                                    value={this.state.password}
                                    onInput={evt => this.setState({password: evt.target.value})}
                                    />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="w-100 btn btn-primary">
                                        Sign In
                                    </button>
                                </div>
                            </form>

                            {/* Give the option to Sign up. */}
                            <p>Don't yet have an account? <Link to={constants.routes.signUp}>Sign up!</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

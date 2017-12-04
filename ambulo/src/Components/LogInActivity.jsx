import React from "react";
import { Link, Redirect} from "react-router-dom";
import constants from "./constants";
// import firebase from "firebase/app";

export default class LogInActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            // authenticated: firebase.auth().currentUser != null
        }
    }

    handleSubmit(evt) {
        evt.preventDefault();
        alert("Signing in"); // Remove this later
        /**
         * TODO: 
         * Add firebase to index.js,
         * then uncomment code here
         */

        // if (!this.state.authenticated) {
        //     firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        //         .then((user) => {
        //             this.setState({
        //                 authenticated: true,
        //             });
        //             this.props.history.push(constants.routes.main);
    
        //         })
        //         .catch((err) => {
        //             alert(err.message);
        //         });
        // }
    }

    render() {
        // Redirect to home if user is not logged in.
        if (this.state.authenticated) {
            return <Redirect to={constants.routes.home}/>
        }

        return (
            <div className="container">
                <h1>Sign In</h1>    
                <form onSubmit={evt => this.handleSubmit(evt)}>
                    {/* Email Input Field */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" className="form-control" placeholder="enter your email" 
                        value={this.state.email}
                        onInput={evt => this.setState({email: evt.target.value})}
                        />
                    </div>

                    {/* Password Input Field */}
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" className="form-control" placeholder="enter a password" 
                        value={this.state.password}
                        onInput={evt => this.setState({password: evt.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Sign In!
                        </button>
                    </div>
                </form>

                {/* Give the option to Sign up. */}
                <p>Don't yet have an account? <Link to={constants.routes.signUp}>Sign up!</Link></p>
            </div>
        );
    }
}
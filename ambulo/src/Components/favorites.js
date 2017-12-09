import React from "react";
import { Link } from "react-router-dom";
import firebase from 'firebase/app';
import FavDisplay from "./favDisplay";
import 'firebase/auth';
import 'firebase/database';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

export default class Favorites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          userRef: "",
          uid: "",
          auth: undefined,
          favSnapshot: undefined
        }
    }

// TODO: need to define userRef in prev, using current authed user. add user node in
// database during sign up, needs to have city, trailState, and trailName

    componentDidMount() {

      this.auth = firebase.auth().onAuthStateChanged(user => {
          this.setState({
              uid: firebase.auth().currentUser.uid,
              userRef: firebase.auth().currentUser.uid
          })
          console.log(firebase.auth().currentUser.uid);

      })
    }

    componentWillUnmount() {
      this.auth();

    }
    handleSignOut() {
        firebase.auth().signOut()
        .catch(err => alert(err.message));
    }

/*
  from firesebase.database().ref(<user>), find snapshots and display them, see the
  msgList component from chat,
*/

    render() {
      let userRef = firebase.database().ref("users/" + this.state.uid);

        return(
          <div>
          <div className="p-4 d-flex justify-content-end">
              <button disabled className="mr-auto p-2 btn logo" onClick={() => {this.props.history.push("/")}}><i className="fa fa-leaf green fa-3x" aria-hidden="true"></i></button>

              {this.state.logged ?
                  <div style={{zIndex: "9999"}}>
                      <div style={{display: "inline"}}>trail on, {firebase.auth().currentUser.displayName}</div>
                      <button className="btn log" onClick={() => {this.props.history.push("/about")}}>about</button>

                      <button className="btn log" onClick={() => this.props.history.push("/favorites")}>favorites</button>
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
            <FavDisplay userRef={userRef}/>
          </div>
        );
    }
}

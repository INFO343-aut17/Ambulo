import React from "react";
import firebase from 'firebase/app';
import Favorites from "./favorites";
import { Link, Redirect } from 'react-router-dom';
import config from "./config";
import 'firebase/auth';
import 'firebase/database';

export default class FavDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          uid: this.props.uid,
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
          })
          console.log("HERE" + firebase.auth().currentUser.uid);

      })
      this.unlisten = firebase.database().ref("users/" + this.state.uid + "/favs").on("value",
        snapshot => this.setState({favSnapshot: snapshot}));
    }

    componentWillUnmount() {
      this.auth();
      firebase.database().ref("users/" + this.state.uid + "/favs").off("value", this.unlisten);
    }

    removeFav(refKey) {
      // remove from favorites list
      var curr = firebase.database().ref(this.props.userRef/refKey);
      curr.remove()
        .then(function() {
        console.log("Remove succeeded.")
      })
    }

    render() {
      if (this.state.favSnapshot === undefined) {
           return <h3>{"Oops, you don't have any favorites saved!"}</h3>;
      } else {
        let favs = [];
        var i = 0;
        this.state.favSnapshot.forEach(snap => {
             favs.push(<li>snap.val().name + " " + snap.val().lat + ", " + snap.val().long</li>);
             i++;
        })
       return(
         <div>
           <h3>Here are all your favorites, {firebase.auth().currentUser.displayName}!</h3>
           <ul>{favs}</ul>
           {i}
         </div>
       );
      }

    }
}

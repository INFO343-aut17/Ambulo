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

    componentDidMount() {
      this.auth = firebase.auth().onAuthStateChanged(user => {
        if (user) {
            this.setState({
              uid: firebase.auth().currentUser.uid,
          })
        }

      })
        this.props.userRef.on("value", snapshot => this.setState({favSnapshot: snapshot.child(this.props.uid).child("favs")}))
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
        this.state.favSnapshot.forEach(snap => {
             favs.push(<p>{snap.val().name}</p>);
        })
       return(
         <div>
           <h3>Here are all your favorites, {firebase.auth().currentUser.displayName}!</h3>
           {favs}
         </div>
       );
      }

    }
}

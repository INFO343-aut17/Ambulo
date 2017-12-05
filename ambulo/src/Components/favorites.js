import React from "react";
import { Link } from "react-router-dom";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

export default class Favorites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          username: "",
        }
    }

// TODO: need to define userRef in prev, using current authed user. add user node in
// database during sign up, needs to have lat, long, and trailName

    componentDidMount() {
        this.unlisten = this.props.userRef.on("value",
          snapshot => this.setState({favSnapshot: snapshot}));
      }

    componentWillUnmount() {
      this.props.userRef.off("value", this.unlisten);
    }

    removeFav(refKey) {
      // remove from favorites list
      var curr = firebase.database().ref(this.props.userRef/refKey);
      curr.remove()
        .then(function() {
        console.log("Remove succeeded.")
      })
    }
/*
  from firesebase.database().ref(<user>), find snapshots and display them, see the
  msgList component from chat,
*/

    render() {
      if (this.state.msgSnapshot === undefined) {
           return <div>loading...</div>;
         }
         let favs = [];
         this.state.msgSnapshot.forEach(snap => {
             favs.push(<li style={{color: 'blue'}}key={snap.key}>{snap.val().trailName + ": " + snap.val().lat + snap.val().long}<br></br><button onClick={() => this.removeFav(snap.key)} className="btn btn-warning btn-sm">Delete</button></li>)
         })
        return(
          <div>
            <h3>Here are all your favorite, {this.state.username}!</h3>
            <ul></ul>
          </div>
        );
    }
}

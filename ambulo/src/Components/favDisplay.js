import React from "react";
import firebase from 'firebase/app';
import Favorites from "./favorites";
import 'firebase/auth';
import 'firebase/database';

export default class FavDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
              userRef: this.state.uid
          })
          console.log(firebase.auth().currentUser.uid);

      })
      this.unlisten = this.props.userRef.on("value",
        snapshot => this.setState({favSnapshot: snapshot}));
    }

    componentWillUnmount() {
      this.props.userRef.off("value", this.unlisten);
      this.auth();

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
           return <h3>{"Oops, you don't have any favorites saved!"}</h3>;
         }
         let favs = [];
         this.state.msgSnapshot.forEach(snap => {
             favs.push(<li style={{color: 'blue'}}key={snap.key}>{snap.val().trailName + ": " + snap.val().city + ", " +  snap.val().trailState}<br></br><button onClick={() => this.removeFav(snap.key)} className="btn btn-warning btn-sm">Delete</button></li>)
         })
        return(
          <div>
            <h3>Here are all your favorite, {this.state.username}!</h3>
            <ul></ul>
          </div>
        );
    }
}

import React from "react";
import { Link } from "react-router-dom";
import constants from "./constants";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.auth = firebase.auth().onAuthStateChanged(user => {
            this.setState({
                logged: user
            })
        })
    }

    componentWillUnmount() {
        this.auth();
    }
    handleSignOut() {
        firebase.auth().signOut()
        .catch(err => alert(err.message));
    }

    render() {
      let style = {
          width: "40%",
          maxWidth: "150px"
      }
      let s={
        width: "50%",
        align: "center",
        float: "center",
        margin: "auto"
      }
      let m = "Ambulo is a web app designed to allow users to explore hikes" +
              " around an area by finding photos taken by others and uplodaed " +
              "onto Flickr. Our team uses the Google Places API to determine a " +
              "location, and then queries the Trails API to find hiking trails " +
              "in the area. Then we call on the Flickr API to get photos uploaded " +
              "with metadata location within a certain radius of that area."
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
            <h2>We are ambulo</h2>
            <p>{"We created ambulo as a class project"}</p>
            <p style={s}>{m}</p>
            <div className="images">
              <h4>Anton Zheng</h4>
              <img style={style} alt="anton" src="http://images.parenting.mdpcdn.com/sites/parenting.com/files/styles/facebook_og_image/public/separation_anxiety.jpg?itok=wIr8FGl-"/>
              <h4>Thoa Nguyen</h4>
              <img style={style} alt="thoa" src="https://www.tresillian.org.au/media/1177/todler.jpg?anchor=center&mode=crop&height=400&rnd=130779219950000000"/>
              <h4>Jingyu Yang</h4>
              <img style={style} alt="jenny" src="http://images.parents.mdpcdn.com/sites/parents.com/files/styles/width_360/public/images/p_iStock_000006840535.jpg"/>
              <h4>Karen Lee</h4>
              <img style={style} alt="karen" src="http://images.parents.mdpcdn.com/sites/parents.com/files/styles/width_360/public/images/p_iStock_000008551025.jpg"/>

            </div>
          </div>
        );
    }
}

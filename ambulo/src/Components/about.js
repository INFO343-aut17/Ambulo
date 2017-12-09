import React from "react";
import { Link } from "react-router-dom";
import constants from "./constants";

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
      let style = {
          width: "40%",
          maxWidth: "150px"
      }
      let m = "Ambulo is a web app designed to allow users to explore hikes" +
              " around an area by finding photos taken by others and uplodaed " +
              "onto Flickr. Our team uses the Google Places API to determine a " +
              "location, and then queries the Trails API to find hiking trails " +
              "in the area. Then we call on the Flickr API to get photos uploaded " +
              "with metadata location within a certain radius of that area."
        return(
          <div>
            <h2>We are ambulo</h2>
            <p>{"We created ambulo as a class project"}</p>
            <p>{m}</p>
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

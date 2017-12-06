import React from "react";
import { Link } from "react-router-dom";
import constants from "./constants";
import firebase from "firebase/app";

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
          <div>
            <h2>We are ambulo</h2>
            <p>{"We created ambulo as a class project"}</p>
            <div className="images">
              <h4>Anton Zheng</h4>
              <img src="http://images.parenting.mdpcdn.com/sites/parenting.com/files/styles/facebook_og_image/public/separation_anxiety.jpg?itok=wIr8FGl-"/>
              <h4>Anton Zheng</h4>
              <img src="https://www.tresillian.org.au/media/1177/todler.jpg?anchor=center&mode=crop&height=400&rnd=130779219950000000"/>
              <h4>Anton Zheng</h4>
              <img src="http://images.parents.mdpcdn.com/sites/parents.com/files/styles/width_360/public/images/p_iStock_000006840535.jpg"/>
              <h4>Anton Zheng</h4>
              <img src="http://images.parents.mdpcdn.com/sites/parents.com/files/styles/width_360/public/images/p_iStock_000008551025.jpg"/>

            </div>
          </div>
        );
    }
}

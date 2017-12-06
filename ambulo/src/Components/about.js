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
              <h4>Anton Zheng</h4>
              <h4>Anton Zheng</h4>
              <h4>Anton Zheng</h4>

            </div>
          </div>
        );
    }
}

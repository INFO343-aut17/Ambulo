import React from "react";

import After from "../after.svg";
import Before from "../before.svg";
import Dialog from "./Dialog";

export default class Trail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trailName: "Trail Name",
            show: false
        }
    }

    show(evt) {
        this.setState({
            show: true,
            trailName: evt.target.innerHTML
        });
    }

    render() {
        
        return(
            <div>
                <Dialog modal={this.state.show}
                    trailName={this.state.trailName}/>
                <h3 className="btn" onClick={evt => this.show(evt)}>Trail Name</h3>
                <div className="row">
                    <img className="col" src={Before} onClick={() => this.prev()}/>
                    <div className="col">1</div>
                    <div className="col">2</div>
                    <div className="col">3</div>
                    <div className="col">4</div>
                    <img className="col" src={After} onClick={() => this.next()}/>
                </div>
            </div>
        );
    }
}
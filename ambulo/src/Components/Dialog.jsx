import React from "react";
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from 'react-bootstrap';
import config from "./config";

export default class Dialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: this.props.modal,
            trailName: this.props.data.name
        }
    }

    componentWillReceiveProps(nextProps){
        if (this.state.show !== nextProps.modal){
            this.setState({
                show: nextProps.modal
            });
        }
    }

    render() {

        let transparent = {
            backgroundColor: "transparent"
        }

        let adjust = {
            width: "40%"
        }

        let end = {
            justifyContent: "flex-end"
        }

        let display = {
            display: "initial"
        }

        let title = {
            position: "absolute"
        }

        let text = {
            textAlign: "right"
        }

        let activities = [];
        this.props.data.activities.forEach(element => {
            activities.push(
                <div>
                    <h4>{element.activity_type.name}</h4>
                    <p>{element.description}</p>
                </div>
            )
        });
        return(
            <div className="modal-container">
                 <Modal
                    show={this.state.show}
                    onHide={this.props.close}>
                    <ModalBody>
                        <div className="row">
                            <ModalTitle style={title} className="col">{this.state.trailName}</ModalTitle>
                            <p className="col-12 cbutton" onClick={this.props.close} style={text}><i class="fa fa-times" aria-hidden="true"></i></p>
                        </div>
                        <div>
                            <div>
                                <iframe
                                    width="100%"
                                    frameBorder="0" 
                                    style={{border: "0"}}
                                    src={"https://www.google.com/maps/embed/v1/place?key=" + config.api_keys.map_key
                                        + "&q=" + this.props.data.lat + "," + this.props.data.lon} >
                                    </iframe>
                                <br />
                            </div>
                            <hr />
                            <div className="row">
                                    <div className="col">1</div>
                                    <div className="col">2</div>
                                    <div className="col">3</div>
                                    <div className="col">4</div>
                                    <div className="col">5</div>
                                    <div className="col">6</div>
                                    <div className="col">7</div>
                            </div>
                            <hr />
                            <div>
                                {activities.length != 0 ?
                                    <div>
                                        <h3>Activities</h3>
                                        <div>{activities}</div>
                                        
                                    </div>
                                    :
                                    <div></div>
                                }
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

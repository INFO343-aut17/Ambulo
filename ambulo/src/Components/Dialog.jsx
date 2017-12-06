import React from "react";
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from 'react-bootstrap';
import more from "../more.svg";

export default class Dialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: this.props.modal,
            trailName: this.props.trailName,
            moreInfo: false
        }
    }

    componentWillReceiveProps(nextProps){
        if (this.state.show !== nextProps.modal){
            this.setState({
                show: nextProps.modal,
                trailName: nextProps.trailName
            });
        }
    }

    showMore() {
        this.setState({
            moreInfo: !this.state.moreInfo
        });
    }

    render() {
        // let close = () => this.setState({
        //     show: false,
        //     moreInfo: false
        // });

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

        return(
            <div className="modal-container">
                 <Modal 
                    show={this.state.show}
                    onHide={this.props.close}>
                    <ModalBody>
                        <div className="row">
                            <ModalTitle style={title} className="col">{this.state.trailName}</ModalTitle>
                            <p className="col-12" onClick={this.props.close} style={text}>close</p>
                        </div>
                    {this.state.moreInfo ?

                        <div>
                            <div className="row">
                                    <div className="col">1</div>
                                    <div className="col">2</div>
                                    <div className="col">3</div>
                                    <div className="col">4</div>
                                    <div className="col">5</div>
                                    <div className="col">6</div>
                                    <div className="col">7</div>
                            </div>
                            <div className="row">
                                    <div className="col">
                                        <div>Address</div>
                                        <div>Website</div>
                                        <div>(?) Comments (?) Likes</div>
                                    </div>
                                    <div className="col">
                                        <div>Map</div>
                                    </div>
                            </div>
                        </div>
                        :
                        <div className="row">
                            <div className="col-2 d-flex align-self-center">
                                <button className="btn">prev</button>
                            </div>
                            <div className="col">
                                <div className="row">
                                    <div className="col">1</div>
                                    <div className="col">2</div>
                                    <div className="col">3</div>
                                    <div className="col">4</div>
                                </div>
                                <div className="row">
                                    <div className="col">5</div>
                                    <div className="col">6</div>
                                    <div className="col">7</div>
                                    <div className="col">8</div>
                                </div>
                            </div>
                            <div className="col-2 d-flex align-self-center">
                                <button className="btn">next</button>
                            </div>
                        </div>
                    }
                    <button className="btn m-auto" style={transparent} 
                                onClick={() => this.showMore()}><img src={more} style={adjust}/></button>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
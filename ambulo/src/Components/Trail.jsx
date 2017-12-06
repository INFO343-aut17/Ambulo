import React from "react";

import After from "../after.svg";
import Before from "../before.svg";
import Dialog from "./Dialog";

export default class Trail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trailName: this.props.info.name,
            show: false,
            photos: [],
            ready: false,
            page: 1
        }
    }

    componentDidMount() {
        this.props.info.photos.forEach(element => {
            this.state.photos.push("http://farm" + element.farm + ".static.flickr.com/" +
                        element.server + "/" + element.id + "_" + element.secret + ".jpg");
        });

        this.setState({
            ready: true
        })
    }

    show(evt) {
        this.setState({
            show: true,
            trailName: evt.target.innerHTML
        });
    }

    prev() {
        if (this.state.page > 1) {
            this.setState({
                page: this.state.page - 1
            })
        }
    }

    next() {
        if (this.state.page < Math.ceil(this.props.info.photos.length / 4)) {
            this.setState({
                page: this.state.page + 1
            })
        }
    }


    render() {
        let close = () => this.setState({
            show: false,
            moreInfo: false
        });

        let style = {
            width: "70%",
            maxWidth: "100px"
        }

        let center = {
            justifyContent: "center"
        }

        let images = []
        if (this.state.photos.length !== 0) {
            for (var i = (this.state.page - 1) * 4; i < this.state.page * 4; i++) {
                if (this.state.photos[i] !== undefined) {
                    images.push(<div className="col-2"><img alt="trail" className="trailimg" src={this.state.photos[i]}/></div>)
                }
            }
        }

        return(
            <div>
                <Dialog modal={this.state.show}
                    data={this.props.info} close={close}/>
                <h3 className="btn" onClick={evt => this.show(evt)}>{this.state.trailName}</h3>
                    {this.state.photos.length === 0 ? <div>Couldn't find any</div> :
                        // <div>
                        // {this.state.page < (Math.ceil(this.props.photos.length / 4)) ?
                            <div className="row justify-content-center">
                            <img alt="second hike" className="col-2" style={style} src={Before} onClick={() => this.prev()}/>
                            {images}
                            <img alt="next hike" className="col-2" style={style} src={After} onClick={() => this.next()}/>
                            </div>
                        // :
                        //     <div>
                        //      {images}
                        //      </div>
                        // }
                        // </div>
                    }
            </div>
        );
    }
}

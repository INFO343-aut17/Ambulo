import React from "react";

export class Container extends React.Component {
  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    }
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    return (
      <div style={style}>
        <Map google={this.props.google}/>
      </div>
    )
  }
}
//
// export default GoogleApiComponent({
//   apiKey: __GAPI_KEY__
// })(Container)

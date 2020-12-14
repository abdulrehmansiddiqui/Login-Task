import React, { Component } from 'react';
import { connect } from 'react-redux'
import { destory } from "../Redux/actions/auth";
import API from "../Constants/API";
import Global from "../Constants/Global";

class Logout extends Component {
    state = {
    }

    componentDidMount() {
        this.props.updateAuth("")
        Global.removeData(API.key);
        
        let path = '/';
        this.props.history.push(path)
        window.location.reload()
        
    }

    render() {
        return (
            <div className="row">
                You Successfull Logout
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateAuth: (data) => { dispatch(destory(data)) }
    }
}


export default connect(null, mapDispatchToProps)(Logout)

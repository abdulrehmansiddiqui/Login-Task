import React, { Component } from "react";
import { connect } from "react-redux";
import { auth } from "../Redux/actions/auth";
// import { get_user } from "../Redux/actions/user";

class Home extends Component {
    constructor() {
        super();
        this.state = {
        };
    }


    render() {

        return (

            <div className="container">
                <div className="text-center">
                    <h1>You Made It</h1>
                    <button
                        className="btn btn-dark btn-block"
                        onClick={() => this.props.updateAuth()}
                    >
                        Logout
    </button>
                </div>
            </div>

        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateAuth: (data) => { dispatch(auth(data)) },
    }
}
export default connect(null, mapDispatchToProps)(Home)
